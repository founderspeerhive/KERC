// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title MedicalRecordsAccess
 * @dev Contract for controlling access to medical records stored on IPFS
 */
contract MedicalRecordsAccess {
    address public owner;
    uint256 public constant MAX_BATCH_SIZE = 100;  // Maximum records per transaction
    
    struct MedicalRecord {
        string ipfsCid;            // IPFS Content ID from Pinata
        bool exists;               // Whether this record exists
        bool active;               // Whether this record is active or deactivated
        bool pendingAuthorization; // Whether there's a pending request to view this record
    }
    
    // Mapping from MRN number to medical record data
    mapping(string => MedicalRecord) private medicalRecords;
    
    // Mapping of MRN => address => authorization status
    mapping(string => mapping(address => bool)) private authorizedViewers;
    
    // Mapping from patient wallet to their MRN
    mapping(address => string) private patientToMrn;
    
    // Mapping from MRN to array of pending requester addresses
    mapping(string => address[]) private mrnToPendingRequesters;
    
    // Mapping to track request timestamps
    mapping(string => mapping(address => uint256)) private requestTimestamps;
    
    // Events
    event RecordRegistered(string indexed mrn, string ipfsCid);
    event RecordUpdated(string indexed mrn, string newIpfsCid);
    event RecordDeactivated(string indexed mrn);
    event RecordActivated(string indexed mrn);
    event BulkRecordsRegistered(uint256 count);
    event AccessRequested(address indexed requester, string mrn, uint256 timestamp);
    event AccessGranted(address indexed viewer, string mrn);
    event AccessRevoked(address indexed viewer, string mrn);
    
    // Custom errors to save gas
    error Unauthorized();
    error RecordExists();
    error RecordDoesNotExist();
    error RecordInactive();
    error InvalidRequest();
    error ArrayLengthMismatch();
    error BatchSizeExceeded();
    error AlreadyAuthorized();
    error NotAuthorized();
    error OnlyOwnRecordAccess();

    /**
     * @dev Sets the contract deployer as the owner
     */
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Throws if called by any account other than the owner
     */
    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }
    
    /**
     * @dev Throws if the record does not exist
     */
    modifier recordExists(string calldata mrn) {
        if (!medicalRecords[mrn].exists) revert RecordDoesNotExist();
        _;
    }
    
    /**
     * @dev Throws if the record is not active
     */
    modifier recordActive(string calldata mrn) {
        if (!medicalRecords[mrn].active) revert RecordInactive();
        _;
    }
    
    /**
     * @dev Throws if the caller is not authorized to view the record
     */
    modifier onlyAuthorized(string calldata mrn) {
        if (!authorizedViewers[mrn][msg.sender] && msg.sender != owner) 
            revert NotAuthorized();
        _;
    }
    
    /**
     * @dev Register a new medical record
     * @param mrn The Medical Record Number
     * @param ipfsCid The IPFS Content ID
     */
    function registerRecord(string calldata mrn, string calldata ipfsCid) 
        public 
        onlyOwner 
    {
        if (medicalRecords[mrn].exists) revert RecordExists();
        
        medicalRecords[mrn] = MedicalRecord({
            ipfsCid: ipfsCid,
            exists: true,
            active: true,
            pendingAuthorization: false
        });
        
        emit RecordRegistered(mrn, ipfsCid);
    }

    /**
     * @dev Register multiple records in a single transaction
     * @param mrns Array of Medical Record Numbers
     * @param ipfsCids Array of IPFS Content IDs
     */
    function registerBulkRecords(string[] calldata mrns, string[] calldata ipfsCids) 
        external 
        onlyOwner 
    {
        if (mrns.length != ipfsCids.length) revert ArrayLengthMismatch();
        if (mrns.length > MAX_BATCH_SIZE) revert BatchSizeExceeded();
        
        for(uint i = 0; i < mrns.length; i++) {
            registerRecord(mrns[i], ipfsCids[i]);
        }
        
        emit BulkRecordsRegistered(mrns.length);
    }
    
    /**
     * @dev Update an existing medical record
     * @param mrn The Medical Record Number
     * @param newIpfsCid The new IPFS Content ID
     */
    function updateRecord(string calldata mrn, string calldata newIpfsCid) 
        external 
        onlyOwner 
        recordExists(mrn) 
    {
        medicalRecords[mrn].ipfsCid = newIpfsCid;
        emit RecordUpdated(mrn, newIpfsCid);
    }
    
    /**
     * @dev Deactivate a medical record
     * @param mrn The Medical Record Number
     */
    function deactivateRecord(string calldata mrn) 
        external 
        onlyOwner 
        recordExists(mrn) 
    {
        medicalRecords[mrn].active = false;
        emit RecordDeactivated(mrn);
    }
    
    /**
     * @dev Reactivate a medical record
     * @param mrn The Medical Record Number
     */
    function activateRecord(string calldata mrn) 
        external 
        onlyOwner 
        recordExists(mrn) 
    {
        medicalRecords[mrn].active = true;
        emit RecordActivated(mrn);
    }
    
    /**
     * @dev Associate a patient wallet with their MRN
     * @param patient The patient's wallet address
     * @param mrn The Medical Record Number
     */
    function associatePatient(address patient, string calldata mrn) 
        external 
        onlyOwner 
        recordExists(mrn) 
    {
        patientToMrn[patient] = mrn;
        
        // Automatically authorize the patient to view their own record
        authorizedViewers[mrn][patient] = true;
        emit AccessGranted(patient, mrn);
    }
    
    /**
     * @dev Request access to a medical record
     * @param mrn The Medical Record Number
     */
    function requestAccess(string calldata mrn) 
        external 
        recordExists(mrn) 
        recordActive(mrn) 
    {
        // Only allow requests for own record or if not associated with any record
        bytes32 patientMrnHash = keccak256(bytes(patientToMrn[msg.sender]));
        bytes32 requestedMrnHash = keccak256(bytes(mrn));
        
        if (patientMrnHash != requestedMrnHash && patientMrnHash != keccak256(bytes(""))) 
            revert OnlyOwnRecordAccess();
                
        if (authorizedViewers[mrn][msg.sender]) revert AlreadyAuthorized();
        
        // Add to pending requests
        mrnToPendingRequesters[mrn].push(msg.sender);
        requestTimestamps[mrn][msg.sender] = block.timestamp;
        
        medicalRecords[mrn].pendingAuthorization = true;
        emit AccessRequested(msg.sender, mrn, block.timestamp);
    }
    
    /**
     * @dev Approve access to a medical record
     * @param mrn The Medical Record Number
     * @param requester The address requesting access
     */
    function approveAccess(string calldata mrn, address requester) 
        external 
        onlyOwner 
        recordExists(mrn) 
        recordActive(mrn) 
    {
        // Verify this is a pending request
        bool found = false;
        address[] storage requesters = mrnToPendingRequesters[mrn];
        uint indexToRemove;
        
        for (uint i = 0; i < requesters.length; i++) {
            if (requesters[i] == requester) {
                found = true;
                indexToRemove = i;
                break;
            }
        }
        
        if (!found) revert InvalidRequest();
        
        // Grant access
        authorizedViewers[mrn][requester] = true;
        
        // Remove request - swap and pop
        if (requesters.length > 1) {
            requesters[indexToRemove] = requesters[requesters.length - 1];
        }
        requesters.pop();
        
        // Clear timestamp
        delete requestTimestamps[mrn][requester];
        
        // Update pending flag if no more requests
        if (requesters.length == 0) {
            medicalRecords[mrn].pendingAuthorization = false;
        }
        
        emit AccessGranted(requester, mrn);
    }
    
    /**
     * @dev Revoke access to a medical record
     * @param mrn The Medical Record Number
     * @param viewer The address to revoke access from
     */
    function revokeAccess(string calldata mrn, address viewer) 
        external 
        onlyOwner 
        recordExists(mrn)
    {
        // Cannot revoke access from patients for their own records
        if (keccak256(bytes(patientToMrn[viewer])) == keccak256(bytes(mrn))) 
            revert Unauthorized();
            
        if (!authorizedViewers[mrn][viewer]) revert NotAuthorized();
        
        authorizedViewers[mrn][viewer] = false;
        emit AccessRevoked(viewer, mrn);
    }
    
    /**
     * @dev Get the IPFS CID for a record
     * @param mrn The Medical Record Number
     * @return The IPFS Content ID for the requested record
     */
    function getRecordCid(string calldata mrn) 
        external 
        view 
        recordExists(mrn) 
        recordActive(mrn)
        onlyAuthorized(mrn)
        returns (string memory) 
    {
        return medicalRecords[mrn].ipfsCid;
    }
    
    /**
     * @dev Check if a user is authorized to view a record
     * @param mrn The Medical Record Number
     * @param viewer The address to check authorization for
     * @return Whether the address is authorized
     */
    function isAuthorized(string calldata mrn, address viewer) 
        external 
        view 
        returns (bool) 
    {
        return authorizedViewers[mrn][viewer] || viewer == owner;
    }
    
    /**
     * @dev Get pending requesters for a specific MRN
     * @param mrn The Medical Record Number to get pending requests for
     * @return Array of pending requester addresses
     */
    function getPendingRequesters(string calldata mrn) 
        external 
        view 
        onlyOwner 
        returns (address[] memory) 
    {
        return mrnToPendingRequesters[mrn];
    }
    
    /**
     * @dev Get request timestamp for a specific requester
     * @param mrn The Medical Record Number
     * @param requester The address that requested access
     * @return The timestamp of the request
     */
    function getRequestTimestamp(string calldata mrn, address requester) 
        external 
        view 
        onlyOwner 
        returns (uint256) 
    {
        return requestTimestamps[mrn][requester];
    }
    
    /**
     * @dev Get the MRN associated with a patient
     * @param patient The patient's wallet address
     * @return The associated Medical Record Number
     */
    function getPatientMrn(address patient) 
        external 
        view 
        onlyOwner 
        returns (string memory) 
    {
        return patientToMrn[patient];
    }
}