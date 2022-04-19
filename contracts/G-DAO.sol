// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Elect is Ownable {

    constructor(bytes32[] memory candidateNames) {
      Access[msg.sender] = true;
      dead = block.timestamp;
    }

    // ERRORS IN THIS CONTRACT. NEEDS TO BE SOLVED. THIS IS A BASE CONTRACT FOR US TO WORK ON
  
  mapping (bytes32 => uint8) public votesReceived;

  bytes32[] public candidateList;
  
    mapping(address => bool) private Access;
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
        require (msg.sender = chairman,"You are not the chairman");
        dead = block.timestamp;
    }

    function disable() public {
      require(msg.sender = chairman,"You are not the chairman");
      dead = block.timestamp + 366 days;
    }
  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteCandidate(bytes32 candidate) public controlAccess {
    require(validCandidate(candidate) == true, "This is not a candidate");
    votesReceived[candidate] += 1;
  }


  // This function returns the total votes a candidate has received so far
  function candidateVotes(bytes32 candidate) public stakeholder view returns (uint256) {
   // require(msg.sender != student, "Student can not call this function");
    require(validCandidate(candidate) == true, "This is not a candidate");
    return votesReceived[candidate];
  }

  function checkCandidate(bytes32 candidate) public view returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
    

}
