import { ethers, upgrades } from "hardhat";

/*
npx hardhat node
npx hardhat run --network localhost scripts/deploy.ts
*/

async function main() {
  const ContractFactory = await ethers.getContractFactory("KantaroToken");

  const instance = await upgrades.deployProxy(ContractFactory);
  await instance.deployed();

  console.log(`Proxy deployed to ${instance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
