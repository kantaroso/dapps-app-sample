import { ethers } from "hardhat";

/*
npx hardhat node
npx hardhat run --network localhost scripts/test.ts
*/

async function main() {
  const signers = await ethers.getSigners();
  console.log(signers);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
