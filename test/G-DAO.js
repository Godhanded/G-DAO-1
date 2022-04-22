var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style


let contract, votePlatform;

let Gcontract;
let GDAO;
let owner;
let addr1;
let addr2;
let addr3;


describe("Elect", function(){
    it("should deploy the Elect contract to the testnet", async function(){
        //Get Contract from Contract Factory
        const ElectContract = await ethers.getContractFactory("Elect");

        // here we deploy the contract
        const deployedElectContract = await ElectContract.deploy();
    
        // Wait for it to finish deploying
        contract = await deployedElectContract.deployed();
    
//         print the address of the deployed contract
        console.log(
            "\n 🏵 ELECT Contract Address:",
            deployedElectContract.address
        );

      });
});  

describe ("G-DAO contract", function() {

    // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
     beforeEach (async function(){
       // get contract factory and signers
       Elect = await ethers.getContractFactory("Elect");
       [owner,addr1, addr2, addr3] = await ethers.getSigners();
       
       GDAO= await Elect.deploy();
       await GDAO.setChairman(owner.address);
       });

       it("should set the right owner", async function(){
           expect(await GDAO.owner()).to.equal(owner.address);
       });


      // it("should set the right chairman", async function(){
      //     expect(await GDAO.Chairman()).to.equal(chair);
       //});


       it("should fail if not a stake holder",async function(){
           await GDAO.beginVote();
           await expect(GDAO.connect(addr1).voteCandidate(1)).to.be.revertedWith("You are not a stakeholder");
       });


       it("should fail if its not time to vote",async function(){
           await GDAO.addTeacher(owner.address);
           await GDAO.addDirector(owner.address);
           await GDAO.addStudent(owner.address);

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
           await GDAO.addTeacher(owner.address);
           await GDAO.addDirector(owner.address);
           await GDAO.addStudent(owner.address);
          await expect(GDAO.connect(owner).voteCandidate(1)).to.be.revertedWith("This is not a candidate");
       });


       it ("should add candidate",async function(){
           await GDAO.addCandidate("ed","head","ipfs.io/ipfs/21323244hfjb34j");
           expect(await GDAO.count).to.equal();
       });


       it("should vote if candidate exists and is time",async function(){
           await GDAO.addCandidate("ed","head","ipfs.io/ipfs/21323244hfjb34j");
           await GDAO.addStudent(owner.address);
            await GDAO.beginVote();
            const candidVote = await GDAO.voteCandidate(1);
            console.log (candidVote)
            // expect(await GDAO.voteCandidate(1)).to.return("voted");
       });
});

describe ("Add Candidate", function() {
    it("should be able to add a candidate to the contract", async function(){        
        addCandidate = await GDAO.connect(owner).addCandidate (
            "ed",
            "head",
            "ipfs.io/ipfs/21323244hfjb34j"
        );
        const txResult = await addCandidate.wait();
        expect(txResult.status).to.equal(1);

    });
});  

describe ("Vote Candidate", function() {
    it("should be able to vote a candidate", async function(){   
        await GDAO.connect(owner).beginVote();     
        await GDAO.addStudent(addr1.address);
        addCandidate = await GDAO.connect(owner).addCandidate (
            "ed",
            "head",
            "ipfs.io/ipfs/21323244hfjb34j"
        );
        voteCandidate = await GDAO.connect(addr1).voteCandidate (
            1
        );
        const txResult = await voteCandidate.wait();
        expect(txResult.status).to.equal(1);

    });
})  
