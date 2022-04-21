// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Elect is Ownable {

    constructor() {
      Access[msg.sender] = true;
      dead = block.timestamp;
    }
  

  string[] public candidateList;
  
    mapping(uint256=>bool) Candidate;
    mapping (uint256 => uint256) public votesReceived;
    mapping(address=>bool)voted;
    mapping(address => bool) private Access;
    mapping (address=> bool) private teacher;
    mapping (uint256=>candid)contestant;
    uint256 dead;
    address chairman;
    bool start;
    uint256[]  winnerid;
    uint256 public count=0;

    struct candid
    {
        uint256 ID;
        string name;
        string position;
        string ipfs;
    }

    /**
    @notice this event logs the ressult of the election and the position being contested for
    @dev the Candid parameter will be a struct representing a contestant
    @param Candid candidate contesting
    @param votes total number of votes
    */
    event result(candid Candid, uint256 votes);
    event candidates(uint256 ID, string name, string position, string ipfs);
    event Winner(candid winner, uint256 votes);


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
  function voteCandidate(uint256 candidate) public controlAccess stakeholder startvoting returns(bytes32){
    require(voted[msg.sender]==false,"You cant vote twice");
    require(Candidate[candidate] == true, "This is not a candidate");
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
  function candidateVotes(uint256 candidate) public controlAccess view returns (string memory) {
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
  function addcandidate(string memory candidate,string memory position, string memory link)public controlAccess
  {
    require(msg.sender==chairman, "must be chairman");
    uint256 Count=count + 1;
    count++;
    candidateList.push(candidate);
    Candidate[Count]=true;
    votesReceived[Count]=0;
    contestant[Count]=candid(count, candidate, position, link );
    emit candidates(count, candidate, position, link);
  }

  
   /**
   @notice function allows chairman add stake holders
   */
  function addStakeholder(address holder)public controlAccess returns(bool)
  {
    require(msg.sender==chairman,"only chairman");
    Access[holder]=true;
    return true;
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
   */
  function publicResults()public controlAccess stakeholder
  {
    require(start == false,"voting has to end first");
    for(uint256 i=1; i<=count; i++)
    {
      emit result (contestant[i], votesReceived[i]);
    }

   }
   
    
    /**
   @notice function shows th winner or winners of the election
   */
   function showwinner()public stakeholder
   {
    require(start == false,"voting has to end first");
    uint256 winvote=0;
    for(uint256 i=1; i<=count; i++)
    {
        if(votesReceived[i]>winvote)
        {
            winvote=votesReceived[i];
            delete winnerid;
            winnerid.push(i);

        }else if(votesReceived[i]==winvote)
        {
            winnerid.push(i);
        }
        
    }
    for(uint256 i=0; i<winnerid.length; i++)
    {
    emit Winner(contestant[winnerid[i]], votesReceived[winnerid[i]]);
    }
  }

}
