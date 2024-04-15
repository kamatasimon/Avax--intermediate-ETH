// Import necessary modules
const hre = require("hardhat");
const fs = require('fs');
const path = require('path');


 //Deploys the ZamaTokenMint contract.
 
async function deployContract() {
  const ZamaTokenMint = await hre.ethers.getContractFactory("ZamaTokenMint");
  const zamatokenmint = await ZamaTokenMint.deploy(); 
  await zamatokenmint.deployed();
  console.log("ZamaTokenMint deployed to:", zamatokenmint.address);
 
  return zamatokenmint.address; 
 } 


 // Writes deployed contract address to a file.
 
function exportAddress(address) {
  const content = `export const ZamaTokenMintAddress = '${address}';\n`;
  const filePath = path.join(__dirname, 'address.js'); 
  fs.writeFileSync(filePath, content);
 }
 
// Main function
async function main() {
  try {
    const address = await deployContract();
    exportAddress(address);
    process.exit(0);
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main();
