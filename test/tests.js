const { expect } = require('chai');
const hre = require('hardhat');

const {
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expectEvent, // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

describe('"Every Private Key" Tests', function () {
  let contract;
  let owner, acct1, acct2, acct3, accts = [];

  before(async () => {
    [owner, acct1, acct2, acct3, ...accts] = await ethers.getSigners();

    const EveryPrivateKey = await ethers.getContractFactory('EveryPrivateKey');
    contract = await EveryPrivateKey.deploy();
  });

  it('Derive public key components from private key', async () => {
    let publicKey = await contract.derivePubKey(1);
    expect(publicKey[0]).to.equal("55066263022277343669578718895168534326250603453777594175500187360389116729240");
    expect(publicKey[1]).to.equal("32670510020758816978083085130507043184471273380659243275938904335757337482424");

    publicKey = await contract.derivePubKey(2);
    expect(publicKey[0]).to.equal("89565891926547004231252920425935692360644145829622209833684329913297188986597");
    expect(publicKey[1]).to.equal("12158399299693830322967808612713398636155367887041628176798871954788371653930");
  });

  it('Compose public key from private key', async () => {
    let publicKey = await contract.toPublicKey(1);
    expect(publicKey).to.equal("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8");

    publicKey = await contract.toPublicKey(2);
    expect(publicKey).to.equal("0xc6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee51ae168fea63dc339a3c58419466ceaeef7f632653266d0e1236431a950cfe52a");
  });

  it('Generate private keys and compare to expected values', async () => {
    expect(await contract.toPublicAddress(1)).to.equal("0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf");
    expect(await contract.toPublicAddress(2)).to.equal("0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF");
    expect(await contract.toPublicAddress(3)).to.equal("0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69");
    expect(await contract.toPublicAddress(4)).to.equal("0x1efF47bc3a10a45D4B230B5d10E37751FE6AA718");
  });

});
