// We import Chai to use its asserting functions here.
const { expect } = require("chai");
//setting ethers as a global variable in hardhat
const { ethers } = require("hardhat");


describe ("G-DAO contract", function() {

    let Gcontract;
    let GDAO;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
     beforeEach (async function(){
       // get contract factory and signers
       Elect = await ethers.getContractFactory("Elect");
       [owner,addr1, addr2, addr3] = await ethers.getSigners();
       
       GDAO= await Elect.deploy();
       await GDAO.setChairman(owner.address);
      // const chair = await GDAO.Chairman;
       });

       it("should set the right owner", async function(){
          expect(await GDAO.owner()).to.equal(owner.address);
       });


      // it("should set the right chairman",async function(){
      //    expect ( chair).to.equal(owner.address);
      // });



       it("should fail if not a stake holder",async function(){
           await GDAO.beginVote();
           await expect(GDAO.connect(addr1).voteCandidate(1)).to.be.revertedWith("You are not a stakeholder");
       });


       it("should fail if its not time to vote",async function(){
           await GDAO.addStakeholder(owner.address);

           await expect (GDAO.voteCandidate(1)).to.be.revertedWith("Its not yet time to vote");

       });


       it("should not set chairman if not owner",async function(){
           await expect(GDAO.connect(addr1).setChairman(addr2.address)).to.be.revertedWith("Ownable: caller is not the owner");
       });


       it("only chairman can enable contract",async function(){
           await expect(GDAO.connect(addr1).enable()).to.be.revertedWith("You are not the chairman");
       });

       it ("only chairman can disable contract",async function(){
           await expect (GDAO.connect(addr1).disable()).to.be.revertedWith("You are not the chairman");
       });


       it("should not vote if not a candidate",async function(){
           await GDAO.connect(owner).beginVote();
           await GDAO.addStakeholder(owner.address);
          await expect(GDAO.connect(owner).voteCandidate(1)).to.be.revertedWith("This is not a candidate");
       });


       it ("should add candidate",async function(){
           await GDAO.addcandidate("ed","head","ipfs.io/ipfs/21323244hfjb34j");
           expect(await GDAO.count).to.equal(1);
       });


       it("should vote if candidate exists and is time",async function(){
           await GDAO.addcandidate("ed","head","ipfs.io/ipfs/21323244hfjb34j");
            await GDAO.addStakeholder(owner.address);
            await GDAO.beginVote();
            expect(await GDAO.voteCandidate(1)).to.returns("voted");
       });
});

