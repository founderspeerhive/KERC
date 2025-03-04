import { expect } from "chai";
import { ethers } from "hardhat";
import { MedicalRecordsAccess } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("MedicalRecordsAccess", function () {
  let medicalRecords: MedicalRecordsAccess;
  let owner: SignerWithAddress;
  let patient: SignerWithAddress;
  let otherAccount: SignerWithAddress;

  const testMrn = "251801187";
  const testIpfsCid = "QmTest123";

  beforeEach(async function () {
    [owner, patient, otherAccount] = await ethers.getSigners();
    const MedicalRecordsAccess = await ethers.getContractFactory("MedicalRecordsAccess");
    medicalRecords = await MedicalRecordsAccess.deploy();
    await medicalRecords.deployed();
  });

  describe("Record Registration", function () {
    it("Should register a new medical record", async function () {
      await expect(medicalRecords.registerRecord(testMrn, testIpfsCid))
        .to.emit(medicalRecords, "RecordRegistered")
        .withArgs(testMrn, testIpfsCid);
    });

    it("Should not allow non-owner to register records", async function () {
      await expect(
        medicalRecords.connect(patient).registerRecord(testMrn, testIpfsCid)
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Access Control", function () {
    beforeEach(async function () {
      await medicalRecords.registerRecord(testMrn, testIpfsCid);
    });

    it("Should associate patient with MRN", async function () {
      await medicalRecords.associatePatient(patient.address, testMrn);
      expect(await medicalRecords.hasAccess(patient.address, testMrn)).to.be.true;
    });

    it("Should allow patient to request access", async function () {
      await expect(medicalRecords.connect(patient).requestAccess(testMrn))
        .to.emit(medicalRecords, "AccessRequested")
        .withArgs(patient.address, testMrn);
    });
  });
});
