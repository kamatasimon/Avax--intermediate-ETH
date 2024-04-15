// imports
const hre = require("hardhat");
const fs = require('fs');

// funtion to deploy the contracts
async function main() {

  //deploy the token
  const ZMT = await hre.ethers.getContractFactory("ZamaAvaxToken");
  const zama = await ZMT.deploy();
  await zama.deployed();
  console.log("zmt deployed to:", zama.address);


  // export the addresses
  fs.writeFileSync('src/abi/address.js', `
    export const zamaAddress = "${zama.address}"

  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
