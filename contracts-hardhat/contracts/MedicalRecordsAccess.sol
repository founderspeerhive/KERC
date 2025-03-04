// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MedicalRecordsAccess {
    address public owner;
    uint256 public constant MAX_BATCH_SIZE = 100;  // Maximum records per transaction
    
    struct MedicalRecord {
        string ipfsCid;           // IPFS Content ID from Pinata
        bool exists;              // Whether this record exists
        mapping(address => bool) authorizedViewers; // Addresses authorized to view this record
        bool pendingAuthorization; // Whether there's a pending request to view this record
    }
    
    // Mapping from MRN number to medical record data
    mapping(string => MedicalRecord) private medicalRecords;
    
    // Mapping from patient wallet to their MRN
    mapping(address => string) private patientToMrn;
    
    // List of pending access requests (MRN => requesting wallet)
    struct AccessRequest {
        address requester;
        string mrn;
        uint256 timestamp;
    }
    
    AccessRequest[] public pendingRequests;
    
    // Events
    event RecordRegistered(string indexed mrn, string ipfsCid);
    event BulkRecordsRegistered(uint256 count);
    event AccessRequested(address indexed requester, string mrn);
    event AccessGranted(address indexed viewer, string mrn);
    event AccessRevoked(address indexed viewer, string mrn);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Register a new medical record
    function registerRecord(string calldata mrn, string calldata ipfsCid) public onlyOwner {
        require(!medicalRecords[mrn].exists, "Record with this MRN already exists");
        
        MedicalRecord storage newRecord = medicalRecords[mrn];
        newRecord.ipfsCid = ipfsCid;
        newRecord.exists = true;
        newRecord.pendingAuthorization = false;
        
        emit RecordRegistered(mrn, ipfsCid);
    }

    // Register multiple records in a single transaction
    function registerBulkRecords(string[] calldata mrns, string[] calldata ipfsCids) external onlyOwner {
        require(mrns.length == ipfsCids.length, "Arrays must be same length");
        require(mrns.length <= MAX_BATCH_SIZE, "Batch size exceeds limit");
        
        for(uint i = 0; i < mrns.length; i++) {
            registerRecord(mrns[i], ipfsCids[i]);
        }
        
        emit BulkRecordsRegistered(mrns.length);
    }
    
    // Associate a patient wallet with their MRN
    function associatePatient(address patient, string calldata mrn) external onlyOwner {
        require(medicalRecords[mrn].exists, "Record does not exist");
        patientToMrn[patient] = mrn;
        
        // Automatically authorize the patient to view their own record
        medicalRecords[mrn].authorizedViewers[patient] = true;
        emit AccessGranted(patient, mrn);
    }
    
    // Patient requests access to their record
    function requestAccess(string calldata mrn) external {
        require(medicalRecords[mrn].exists, "Record does not exist");
        require(keccak256(bytes(patientToMrn[msg.sender])) == keccak256(bytes(mrn)) || 
                bytes(patientToMrn[msg.sender]).length == 0, 
                "You can only request access to your own record");
                
        if (!medicalRecords[mrn].authorizedViewers[msg.sender]) {
            pendingRequests.push(AccessRequest({
                requester: msg.sender,
                mrn: mrn,
                timestamp: block.timestamp
            }));
            
            medicalRecords[mrn].pendingAuthorization = true;
            emit AccessRequested(msg.sender, mrn);
        }
    }
    
    // Admin approves access request
    function approveAccess(uint256 requestIndex) external onlyOwner {
        require(requestIndex < pendingRequests.length, "Invalid request index");
        
        AccessRequest memory request = pendingRequests[requestIndex];
        string memory mrn = request.mrn;
        address requester = request.requester;
        
        require(medicalRecords[mrn].exists, "Record does not exist");
        
        // Grant access
        medicalRecords[mrn].authorizedViewers[requester] = true;
        
        // Remove request by swapping with the last element and popping
        pendingRequests[requestIndex] = pendingRequests[pendingRequests.length - 1];
        pendingRequests.pop();
        
        emit AccessGranted(requester, mrn);
    }
    
    // Get the IPFS CID for a record (only if authorized)
    function getRecordCid(string calldata mrn) external view returns (string memory) {
        require(medicalRecords[mrn].exists, "Record does not exist");
        require(medicalRecords[mrn].authorizedViewers[msg.sender] || msg.sender == owner, 
                "You are not authorized to view this record");
                
        return medicalRecords[mrn].ipfsCid;
    }
    
    // Get all pending access requests (admin only)
    function getPendingRequests() external view onlyOwner returns (AccessRequest[] memory) {
        return pendingRequests;
    }
}
