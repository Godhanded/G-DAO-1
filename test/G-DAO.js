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
           await expect(GDAO.connect(addr1).voteCandidate(["1"])).to.be.revertedWith("You are not a stakeholder");
       });


       it("should fail if its not time to vote",async function(){
           await GDAO.addStakeholders([addr3.address], ["Teacher"]);

           await expect (GDAO.voteCandidate([1])).to.be.revertedWith("Its not yet time to vote");

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
           await GDAO.addStakeholders([owner.address],["Teacher"]);
          await expect(GDAO.connect(owner).voteCandidate([1])).to.be.revertedWith("Someone is not a candidate");
       });


       it ("should add candidate",async function(){
           await GDAO.addCandidate("ed","head","ipfs.io/ipfs/21323244hfjb34j");
           expect(await GDAO.count).to.equal();
       });


       it("should vote if candidate exists and is time",async function(){
           await GDAO.addCandidate("ed","head","ipfs.io/ipfs/21323244hfjb34j");
           await GDAO.addStakeholders([owner.address],["Teacher"]);
            await GDAO.beginVote();
            const candidVote = await GDAO.voteCandidate([1]);
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
        await GDAO.addStakeholders([addr1.address],["Teacher"]);
        addCandidate = await GDAO.connect(owner).addCandidate (
            "ed",
            "head",
            "ipfs.io/ipfs/21323244hfjb34j"
        );
        voteCandidate = await GDAO.connect(addr1).voteCandidate (
            [1]
        );
        const txResult = await voteCandidate.wait();
        expect(txResult.status).to.equal(1);

    });
});

describe ("candidate Votes", function() {
    it("should not show candidate votes if not candidate", async function(){
        await expect(GDAO.candidateVotes(0)).to.be.revertedWith("This is not a candidate");
    });
});

describe ("publicResults", function() {
    it("should not show result if voting not ended", async function(){
        await GDAO.beginVote();
        await expect(GDAO.publicResults()).to.be.revertedWith("voting has to end first");
    });
});

describe ("contractstate", function() {
    it("should return true",async function(){
         const check = await GDAO.contractstate()
         expect(check).to.equal(true);
    });
});


describe("addStakeholders",function(){
    it("should revert if not owner",async function(){
        await expect (GDAO.connect(addr1).addStakeholders([addr2.address],["Teacher"])).to.be.revertedWith("Ownable: caller is not the owner");
        
    });

    it("should not add candidate if lenths are not equal",async function(){
        await expect(GDAO.connect(owner).addStakeholders([addr2.address],["Teacher","Student"])).to.be.revertedWith("the roles and addresses provided differ");
    });
});

describe("endVote", function(){
    it("should not end vote if not chairman", async function(){
        await expect(GDAO.connect(addr1).endVote()).to.be.revertedWith("you're not the chairman ");
    });
});

describe("beginVote",function(){
    it("should not beginVote if not chairman", async function(){
        await expect(GDAO.connect(addr1).beginVote()).to.be.revertedWith("you're not the chairman");
    });
});

describe("clearData", function(){
    it("should not clear if not chair man", async function(){
        await expect(GDAO.connect(addr1).clearData()).to.be.revertedWith("no access");
    });


    it("should not clear data if voting has not ended",async function(){
        await GDAO.connect(owner).beginVote();
        await expect(GDAO.connect(owner).clearData()).to.be.revertedWith("voting must end first");
    });
});

describe("enable",function(){
    it("should not enable if not chairman",async function(){
        await expect(GDAO.connect(addr1).enable()).to.be.revertedWith("You are not the chairman");
    });
});

describe("disable", function(){
    it("should not disable if not chairman",async function(){
        await expect(GDAO.connect(addr1).disable()).to.be.revertedWith("You are not the chairman");
    });
});
