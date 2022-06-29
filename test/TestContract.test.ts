import { ethers, waffle } from 'hardhat'
import { BigNumber, Signer } from 'ethers'
import chai, { expect } from 'chai'
import { TestContract } from '../src/types/TestContract'
import TestContarctArtifact from '../src/artifacts/src/contracts/Contract.sol/TestContract.json'
import chaiAsPromised from 'chai-as-promised'
import { MockProvider, solidity } from 'ethereum-waffle'

chai.use(solidity) // solidiity matchers, e.g. expect().to.be.revertedWith("message")
chai.use(chaiAsPromised) //eventually

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const negateBigNumber = (num: BigNumber): BigNumber => {
      return BigNumber.from(`-${num.toString()}`)
}

describe('TestContract contract', () => {
   let owner: Signer;
   let signer1: Signer;
   let signer2: Signer;
   let signer3: Signer;
   let ownerAddress: string;
   let signer1Address: string;
   let signer2Address: string;
   let signer3Address: string;
   let testContract: TestContract
   let provider: MockProvider

   beforeEach(async () => {
      provider = new MockProvider({ ganacheOptions: { gasLimit: 100000000 } })
      owner = provider.getSigner(0)
      signer1 = provider.getSigner(1)
      signer2 = provider.getSigner(2)
      signer3 = provider.getSigner(3)
      ownerAddress = await owner.getAddress()
      signer1Address = await signer1.getAddress()
      signer2Address = await signer2.getAddress()
      signer3Address = await signer3.getAddress()

      testContract = (await waffle.deployContract(owner, TestContarctArtifact, [])) as TestContract

      //any additional setup logic goes here 
   })

   it('gets correct result for addition of two numbers', async () => {
      expect (await testContract.add(1, 2)).to.be.equal(3)
      /*
         You can find documentation for Waffle here: https://ethereum-waffle.readthedocs.io/en/latest/
         Below adre some examples useful during testing:
      */

      // ======= USEFUL COMMANDS ======
      // * switching account which executes a transaction
      // await testContract.connect(signer1).add(1, 2)

      // * increasing blockchain time to test time dependent logic. Here, increase by 60 seconds
      // await provider.send('evm_increaseTime', [60]);
      // await provider.send('evm_mine', []);

      // ======= TESTING EXAMPLES ======
      
      // * testing reverting
      // await expect(testContract.reverting({value: 1000}))
      //    .to.be.revertedWith('Message from Solidity')

      // * test for changing ether balances
      // expect(await testContract.add(1, 2, {value: 1000}))
      //    .to.changeEtherBalances([owner, testContract], [negateBigNumber(BigNumber.from(1000)), 1000])

      // * test for changing token balances
      // await expect(() => someToken.transfer(100, signer1address))
      //    .to.changeTokenBalances(someToken, [owner, signer1], [-100, 100])

      // * test for emitting events
      // await expect(testContract.add(1, 2))
      //    .to.emit(testContract, 'Added')
      //    .withArgs(1, 2);

      // * test if returned array has spoecific value
      // expect(await testContract.someAddressArrReturingFunction())
      //    .to.have.members([signer2Address])

      // * test if returned array has spoecific value - deep comparison, e.g. for BigNumber equality
      // expect(await testContract.someBNArrReturingFunction())
      //    .to.have.deep.members([BigNumber.from(0), BigNumber.from(2)])
   })
})
