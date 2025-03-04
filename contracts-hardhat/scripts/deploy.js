const hre = require("hardhat");

async function main() {
  const MedicalRecordsAccess = await hre.ethers.getContractFactory("MedicalRecordsAccess");
  console.log("Deploying MedicalRecordsAccess...");
  
  const medicalRecords = await MedicalRecordsAccess.deploy();
  console.log("Contract deployed to:", medicalRecords.target);
  
  // Wait for deployment to be confirmed
  await medicalRecords.waitForDeployment();
  
  // Save the contract address for future reference
  const contractAddress = await medicalRecords.getAddress();
  console.log("Contract address:", contractAddress);
  console.log("Owner address:", await medicalRecords.owner());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
