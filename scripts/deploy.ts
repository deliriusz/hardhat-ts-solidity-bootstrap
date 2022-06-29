import { TestContract } from '../src/types/TestContract'
import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const TestContract = await ethers.getContractFactory("TestContract");
  const testContract = await TestContract.deploy();

  console.log("deployed TestContract address:", testContract.address);

  //if you need to perform some action after deployment
  const deployedTestContract = (await ethers.getContractAt("TestContract", testContract.address, deployer)) as TestContract;
  // await deployedTestContract.transferOwnership(deployer.address)
  //   .then(transaction => {
  //     return transaction.wait(1)
  //   }
  //   )
  //   .then(receipt => {
  //     if (receipt.status !== 1) {
  //       console.error("Transfering ownership failed")
  //       console.error(JSON.stringify(receipt))
  //     }
  //   })

  console.log("DONE")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });