import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const MedicalRecordsAccess = await ethers.getContractFactory("MedicalRecordsAccess");
  const medicalRecords = await MedicalRecordsAccess.deploy();

  await medicalRecords.waitForDeployment();
  const address = await medicalRecords.getAddress();

  console.log(`MedicalRecordsAccess deployed to ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
