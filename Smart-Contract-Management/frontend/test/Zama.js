const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("ZamaAvaxToken", function () {
  let Zama;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const ZamaContract = await ethers.getContractFactory("ZamaAvaxToken");
    Zama = await ZamaContract.deploy();

    // Mint some tokens to the contract creator
    await Zama.mint(owner.address, 6);
  });

  it("Should return the correct name, symbol, and total supply", async function () {
    expect(await Zama.name()).to.equal("Zama Avax Token");
    expect(await Zama.symbol()).to.equal("Zama");
    expect(await Zama.totalSupply()).to.equal(12);
  });

  it("Should update balances after minting and burning tokens", async function () {
    // Mint some tokens to address 1
    await Zama.connect(owner).mint(addr1.address, 2);

    expect(await Zama.balances(addr1.address)).to.equal(2);
    expect(await Zama.totalSupply()).to.equal(14);

    // Burn some tokens from the contract creator
    await Zama.connect(owner).burn(3);

    expect(await Zama.balances(owner.address)).to.equal(9);
    expect(await Zama.totalSupply()).to.equal(11);
  });

  it("Should revert if an invalid address is provided to mint", async function () {
    await expect(Zama.connect(owner).mint("0x0000000000000000000000000000000000000000", 1)).to.be.revertedWith("Invalid address");
  });

  it("Should revert if the contract creator doesn't have sufficient balance to burn", async function () {
    await expect(Zama.connect(owner).burn(16)).to.be.revertedWith("Insufficient balance");
  });
});
