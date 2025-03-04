import { ethers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";
import { MetaMaskInpageProvider } from "@metamask/providers";

const contractAddress = "0xC6aAE5C2935898B264a50af75B1f9C9E4D4a115C";
const contractABI = [
  "function registerRecord(string calldata mrn, string calldata ipfsCid) external",
  "function registerBulkRecords(string[] calldata mrns, string[] calldata ipfsCids) external",
  "function associatePatient(address patient, string calldata mrn) external",
  "function requestAccess(string calldata mrn) external",
  "function approveAccess(uint256 requestIndex) external",
  "function getRecordCid(string calldata mrn) external view returns (string memory)",
  "function getPendingRequests() external view returns (tuple(address requester, string mrn, uint256 timestamp)[] memory)",
  "event RecordRegistered(string indexed mrn, string ipfsCid)",
  "event AccessRequested(address indexed requester, string mrn)",
  "event AccessGranted(address indexed viewer, string mrn)",
];

interface Contracts {
  registerRecord: (mrn: string, ipfsCid: string) => Promise<any>;
  registerBulkRecords: (mrns: string[], ipfsCids: string[]) => Promise<any>;
  associatePatient: (patient: string, mrn: string) => Promise<any>;
  requestAccess: (mrn: string) => Promise<any>;
  approveAccess: (requestIndex: number) => Promise<any>;
  getRecordCid: (mrn: string) => Promise<string>;
  getPendingRequests: () => Promise<any[]>;
}

export async function getContract(): Promise<Contracts> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Please install MetaMask");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ExternalProvider);
  const signer = provider.getSigner();
  
  return new ethers.Contract(contractAddress, contractABI, signer) as unknown as Contracts;
}

export async function registerMedicalRecord(mrn: string, ipfsCid: string) {
  const contract = await getContract();
  const tx = await contract.registerRecord(mrn, ipfsCid);
  await tx.wait();
  return tx;
}

export async function registerBulkRecords(mrns: string[], ipfsCids: string[]) {
  const contract = await getContract();
  const tx = await contract.registerBulkRecords(mrns, ipfsCids);
  await tx.wait();
  return tx;
}

export async function getPendingRequests() {
  const contract = await getContract();
  return await contract.getPendingRequests();
}

export async function approveAccess(requestIndex: number) {
  const contract = await getContract();
  const tx = await contract.approveAccess(requestIndex);
  await tx.wait();
  return tx;
}
