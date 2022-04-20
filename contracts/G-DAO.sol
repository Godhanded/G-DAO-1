// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Elect is Ownable {

    constructor() {
      Access[msg.sender] = true;
      dead = block.timestamp;
    }
  

  string[] public candidateList;
  
    mapping(string=>bool) Candidate;
    mapping (string => uint8) public votesReceived;
    mapping(address=>bool)voted;
    mapping(address => bool) private Access;
    mapping (address=> bool) private teacher;
    uint256 dead;
    address chairman;


    modifier stakeholder {
      require(Access[msg.sender] == true, "You are not a stakeholder");
      _;
    }

    modifier controlAccess{
      require(block.timestamp >= dead,"contract is disabled");
      _;
    }

    function setChairman(address _chairman) public onlyOwner {
        chairman = _chairman;
    }

    function enable() public {
        require (msg.sender == chairman,"You are not the chairman");
        dead = block.timestamp;
    }

    function disable() public {
      require(msg.sender == chairman,"You are not the chairman");
      dead = block.timestamp + 366 days;
    }
  /**
  @notice this function collects the candidates name, checks if it exists then counts a vote for said candidate
  @param candidate collects candidates' name
  */
  function voteCandidate(string memory candidate) public controlAccess stakeholder returns(bytes32){
    require(voted[msg.sender]==false,"You cant vote twice");
    require(Candidate[candidate] == true, "This is not a candidate,ensure input is Uppercase");
    voted[msg.sender]= true;
    votesReceived[candidate] += 1;
    return "voted";
  }


  /**
  @notice this function returns the number of votes of a candidate
  @notice it checks if the user is the chairman or a teacher
  @dev the uint value of votesRecieved is converted to string and returned with bstr
  @param candidate collects candidates name
  */
  function candidateVotes(string memory candidate) public controlAccess view returns (string memory) {
   if (msg.sender==chairman || teacher[msg.sender]==true)
   {
    require(Candidate[candidate] == true, "This is not a candidate");
    bytes memory bstr = new bytes(votesReceived[candidate]);
    return string(bstr);
   }else 
   {
    return "You dont have access to this function";
   }
  }

  /**function checkCandidate(string memory candidate) public view returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
  */  


   /**
  @notice this function adds a candidate to the contract
  @notice it checks if the user is the chairman
  @dev hashed the name in candidate list and compared it with the hash of candidate using keccak256
       this is because solidity doesnt compare two string types with ==
  @param candidate collects candidates name
  */
  function addcandidate(string memory candidate)public returns(bytes32)
  {
    require(msg.sender==chairman, "must be chairman");
    for(uint256 i=0; i<=candidateList.length; i++)
    {
      if(keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate)))
      {
        return "candidate already present";
      }
    }
    candidateList.push(candidate);
    Candidate[candidate]=true;
    votesReceived[candidate]=0;
  }

}
