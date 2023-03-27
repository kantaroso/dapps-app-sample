import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("KantaroToken", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("KantaroToken");

    const instance = await upgrades.deployProxy(ContractFactory);
    await instance.deployed();

    expect(await instance.name()).to.equal("KantaroToken");
  });
});
