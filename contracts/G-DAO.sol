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
    bool start;

    /**
    @notice this event logs the ressult of the election and the position being contested for
    @dev the role parameter will be passed in by a stake holder
    @param role position contested for
    @param candidate candidate contesting
    @param votes total number of votes
    */
    event result(string role, string candidate, uint256 votes);


    modifier stakeholder {
      require(Access[msg.sender] == true, "You are not a stakeholder");
      _;
    }


    modifier startvoting
    {
      require(start==true,"Its not yet time to vote");
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
  function voteCandidate(string memory candidate) public controlAccess stakeholder startvoting returns(bytes32){
    require(voted[msg.sender]==false,"You cant vote twice");
    require(Candidate[candidate] == true, "This is not a candidate,ensure input is Uppercase");
    voted[msg.sender]= true;
    votesReceived[candidate] += 1;
    return "voted";
  }


  /**
  @notice this function returns the number of votes of a candidate
  @notice it checks if the user is the chairman or a teacher
  @dev the uint value of votesReceived is converted to string and returned with bstr
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

  function checkCandidate(string memory candidate) public view controlAccess returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate))) {
        return true;
      }
    }
    return false;
  }
   


   /**
  @notice this function adds a candidate to the contract
  @notice it checks if the user is the chairman
  @dev hashed the name in candidate list and compared it with the hash of candidate using keccak256
       this is because solidity doesnt compare two string types with ==
  @param candidate collects candidates name
  */
  function addcandidate(string memory candidate)public controlAccess returns(bytes32)
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

  
   /**
   @notice function allows chairman add stake holders
   */
  function addStakeholder(address holder)public controlAccess
  {
    require(msg.sender==chairman,"only chairman");
    Access[holder]=true;
  }

  
  /**
   @notice function allows chairman and stakeholders add a teacher
   */
  function addTeacher(address teach)public controlAccess returns(bool)
  {
    if(msg.sender==chairman || Access[msg.sender]==true)
    {
    teacher[teach]=true;
    }else
    {
      return false;
    }
  }

   /**
   @notice function allows chairman start voting proccess
   */
  function beginVote()public controlAccess
  {
    require(msg.sender== chairman,"you're not the chair man");
    start = true;
  }

   /**
   @notice function allows chairman end voting proccess
   */
  function endVote()public controlAccess
  {
    require(msg.sender==chairman,"you're not the chairman ");
    start = false;
  }

   
    /**
   @notice function allows stakeholders to make the results of the election visible to all students
   @param role stake holder inputs the post that was being contested for
   */
  function publicResults(string memory role)public controlAccess stakeholder
  {
    require(start == false,"voting has to end first");
    for(uint256 i=0; i<=candidateList.length;i++)
    {
      emit result (role, candidateList[i], votesReceived[candidateList[i]]);
    }
  }

}
