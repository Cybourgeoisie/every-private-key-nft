/***

npx hardhat run --network localhost ./scripts/mint.js
npx hardhat run --network rinkeby ./scripts/mint.js

***/

const hre = require('hardhat');
const { ethers } = require('hardhat');
const fs = require('fs');

let _contract, deployer;
async function main() {
  // Check the address of the sender
  [deployer] = await ethers.getSigners();

  // Get the storage contract
  const TOKEN_CONTRACT_ADDRESS = '0x789A8073C1FA8ab23e38b644bea84EAf282d85Ce';

  console.log(
    "Deploying with the account:",
    deployer.address
  );

  console.log(
    "Account balance:",
    (await deployer.getBalance()).toString()
  );

  const EveryPrivateKey = await ethers.getContractFactory('EveryPrivateKey');
  _contract = await EveryPrivateKey.attach(TOKEN_CONTRACT_ADDRESS);

  // Now start the upload
  await _contract.mint();
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

