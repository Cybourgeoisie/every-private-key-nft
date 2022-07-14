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
  let owner, acct1, acct2, acct3, acct4, accts = [];
  const acct4PrivateKey = '32512594315523171181992869011023752689221391970497757937580586711945735082602';

  before(async () => {
    [owner, acct1, acct2, acct3, acct4, ...accts] = await ethers.getSigners();

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

  it('Check tokenURI for private keys', async () => {
    expect(await contract.tokenURI("1")).to.equal("data:application/json;utf8,{\"name\":\"PK = 0x01\",\"description\":\"The private key 0x01 produces the Ethereum public address: 0x7e5f4552091a69125d5dfcb7b8c2659029395bdf.\",\"image_data\":\"<?xml version=\\\"1.0\\\" encoding=\\\"UTF-8\\\"?><svg width=\\\"330px\\\" height=\\\"330px\\\" viewBox=\\\"0 0 330 330\\\" version=\\\"1.1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\"><title>test</title><g id=\\\"Page-1\\\" stroke=\\\"none\\\" stroke-width=\\\"1\\\" fill=\\\"none\\\" fill-rule=\\\"evenodd\\\"><g id=\\\"test\\\" transform=\\\"translate(0.600000, 0.400000)\\\"><path d=\\\"M164.5,10 C79.3,10 10,79.3 10,164.4 C10,249.6 79.3,318.9 164.5,318.9 C249.6,318.9 318.9,249.6 318.9,164.4 C318.9,79.3 249.6,10 164.5,10 Z\\\" id=\\\"Path-Copy-6\\\" stroke=\\\"#979797\\\" fill=\\\"#DADADA\\\" fill-rule=\\\"nonzero\\\"></path><path d=\\\"M164.5,10 C79.3,10 10,79.3 10,164.4 C10,249.6 79.3,318.9 164.5,318.9 C249.6,318.9 318.9,249.6 318.9,164.4 C318.9,79.3 249.6,10 164.5,10 Z M164.5,328.9 C73.8,328.9 0,255.1 0,164.4 C0,73.8 73.8,0 164.5,0 C255.2,0 328.9,73.8 328.9,164.4 C328.9,255.1 255.2,328.9 164.5,328.9 L164.5,328.9 Z\\\" id=\\\"Fill-136\\\" fill=\\\"#6E6E6E\\\" fill-rule=\\\"nonzero\\\"></path><path d=\\\"M164.5,23.5 C86.8,23.5 23.5,86.7 23.5,164.4 C23.5,242.2 86.8,305.4 164.5,305.4 C242.2,305.4 305.4,242.2 305.4,164.4 C305.4,86.7 242.2,23.5 164.5,23.5 Z M164.5,312.4 C82.9,312.4 16.5,246 16.5,164.4 C16.5,82.9 82.9,16.5 164.5,16.5 C246.1,16.5 312.4,82.9 312.4,164.4 C312.4,246 246.1,312.4 164.5,312.4 L164.5,312.4 Z\\\" id=\\\"Fill-137\\\" fill=\\\"#6E6E6E\\\" fill-rule=\\\"nonzero\\\"></path><text id=\\\"Private-Key:-0xac097\\\" font-family=\\\"CourierNewPSMT, Courier New\\\" font-size=\\\"12\\\" font-weight=\\\"normal\\\" fill=\\\"#000000\\\"><tspan x=\\\"121.192969\\\" y=\\\"143.6\\\">Private Key:</tspan><tspan x=\\\"25.7774414\\\" y=\\\"157.6\\\" font-size=\\\"7\\\">0x01</tspan><tspan x=\\\"164.4\\\" y=\\\"165.6\\\"></tspan><tspan x=\\\"110.391211\\\" y=\\\"179.6\\\">Public Address:</tspan><tspan x=\\\"38.3794922\\\" y=\\\"193.6\\\" font-size=\\\"10\\\">0x7e5f4552091a69125d5dfcb7b8c2659029395bdf</tspan></text></g></g></svg>\",\"attributes\":[{\"trait_type\": \"Public Address\", \"value\": \"0x7e5f4552091a69125d5dfcb7b8c2659029395bdf\"},{\"trait_type\": \"ETH Balance\", \"value\": 0.000}]}");
    expect(await contract.tokenURI("101019540454131656361613319765421537231052316237101465282646049373578026247534")).to.equal("data:application/json;utf8,{\"name\":\"PK = 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e\",\"description\":\"The private key 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e produces the Ethereum public address: 0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199.\",\"image_data\":\"<?xml version=\\\"1.0\\\" encoding=\\\"UTF-8\\\"?><svg width=\\\"330px\\\" height=\\\"330px\\\" viewBox=\\\"0 0 330 330\\\" version=\\\"1.1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\"><title>test</title><g id=\\\"Page-1\\\" stroke=\\\"none\\\" stroke-width=\\\"1\\\" fill=\\\"none\\\" fill-rule=\\\"evenodd\\\"><g id=\\\"test\\\" transform=\\\"translate(0.600000, 0.400000)\\\"><path d=\\\"M164.5,10 C79.3,10 10,79.3 10,164.4 C10,249.6 79.3,318.9 164.5,318.9 C249.6,318.9 318.9,249.6 318.9,164.4 C318.9,79.3 249.6,10 164.5,10 Z\\\" id=\\\"Path-Copy-6\\\" stroke=\\\"#979797\\\" fill=\\\"#DADADA\\\" fill-rule=\\\"nonzero\\\"></path><path d=\\\"M164.5,10 C79.3,10 10,79.3 10,164.4 C10,249.6 79.3,318.9 164.5,318.9 C249.6,318.9 318.9,249.6 318.9,164.4 C318.9,79.3 249.6,10 164.5,10 Z M164.5,328.9 C73.8,328.9 0,255.1 0,164.4 C0,73.8 73.8,0 164.5,0 C255.2,0 328.9,73.8 328.9,164.4 C328.9,255.1 255.2,328.9 164.5,328.9 L164.5,328.9 Z\\\" id=\\\"Fill-136\\\" fill=\\\"#6E6E6E\\\" fill-rule=\\\"nonzero\\\"></path><path d=\\\"M164.5,23.5 C86.8,23.5 23.5,86.7 23.5,164.4 C23.5,242.2 86.8,305.4 164.5,305.4 C242.2,305.4 305.4,242.2 305.4,164.4 C305.4,86.7 242.2,23.5 164.5,23.5 Z M164.5,312.4 C82.9,312.4 16.5,246 16.5,164.4 C16.5,82.9 82.9,16.5 164.5,16.5 C246.1,16.5 312.4,82.9 312.4,164.4 C312.4,246 246.1,312.4 164.5,312.4 L164.5,312.4 Z\\\" id=\\\"Fill-137\\\" fill=\\\"#6E6E6E\\\" fill-rule=\\\"nonzero\\\"></path><text id=\\\"Private-Key:-0xac097\\\" font-family=\\\"CourierNewPSMT, Courier New\\\" font-size=\\\"12\\\" font-weight=\\\"normal\\\" fill=\\\"#000000\\\"><tspan x=\\\"121.192969\\\" y=\\\"143.6\\\">Private Key:</tspan><tspan x=\\\"25.7774414\\\" y=\\\"157.6\\\" font-size=\\\"7\\\">0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e</tspan><tspan x=\\\"164.4\\\" y=\\\"165.6\\\"></tspan><tspan x=\\\"110.391211\\\" y=\\\"179.6\\\">Public Address:</tspan><tspan x=\\\"38.3794922\\\" y=\\\"193.6\\\" font-size=\\\"10\\\">0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199</tspan></text></g></g></svg>\",\"attributes\":[{\"trait_type\": \"Public Address\", \"value\": \"0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199\"},{\"trait_type\": \"ETH Balance\", \"value\": 10000.000}]}");
  });

  it('Check all created tokens', async () => {
    expect(await contract.balanceOf(owner.address)).to.equal("115792089237316195423570985008687907853269984665640564039457584007913129639935");
    expect(await contract.ownerOf(108980321432)).to.equal(owner.address);
    expect(await contract.ownerOf(83845943)).to.equal(owner.address);
    expect(await contract.ownerOf(1)).to.equal(owner.address);
  });

  it('Allow transferring a token', async () => {
    expect(await contract.ownerOf(1)).to.equal(owner.address);
    expect(await contract.balanceOf(acct1.address)).to.equal(0);

    await contract.connect(owner).transferFrom(owner.address, acct1.address, 1);

    expect(await contract.ownerOf(1)).to.equal(acct1.address);
    expect(await contract.balanceOf(owner.address)).to.equal("115792089237316195423570985008687907853269984665640564039457584007913129639934");
    expect(await contract.balanceOf(acct1.address)).to.equal(1);

    await contract.connect(owner).transferFrom(owner.address, acct1.address, 2);

    expect(await contract.ownerOf(2)).to.equal(acct1.address);
    expect(await contract.balanceOf(owner.address)).to.equal("115792089237316195423570985008687907853269984665640564039457584007913129639933");
    expect(await contract.balanceOf(acct1.address)).to.equal(2);

    await contract.connect(acct1).transferFrom(acct1.address, acct2.address, 2);

    expect(await contract.ownerOf(2)).to.equal(acct2.address);
    expect(await contract.balanceOf(owner.address)).to.equal("115792089237316195423570985008687907853269984665640564039457584007913129639933");
    expect(await contract.balanceOf(acct1.address)).to.equal(1);
    expect(await contract.balanceOf(acct2.address)).to.equal(1);
  });

  it('Allow someone who owns the private key of a token to freely transfer it', async () => {
    expect(await contract.ownerOf(acct4PrivateKey)).to.equal(owner.address);
    expect(await contract.balanceOf(acct3.address)).to.equal(0);
    expect(await contract.balanceOf(acct4.address)).to.equal(0);

    // Let acct4, which does not own the token but owns the private key, freely trade its own token to another address
    await contract.connect(acct4).transferFrom(owner.address, acct3.address, acct4PrivateKey);

    expect(await contract.ownerOf(acct4PrivateKey)).to.equal(acct3.address);
    expect(await contract.balanceOf(owner.address)).to.equal("115792089237316195423570985008687907853269984665640564039457584007913129639932");
    expect(await contract.balanceOf(acct3.address)).to.equal(1);
    expect(await contract.balanceOf(acct4.address)).to.equal(0);
  });

});
