// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @author Team-G
/// @title A voting platform
contract Elect is Ownable {

  constructor() {
    Access[msg.sender] = true;
    dead = block.timestamp;
  }
  
  /// @notice A list of candidates for the election
  string[] public candidateList;
    
  /// @notice A record for validity of candidate
  mapping(uint256 => bool) Candidate;

  /// @notice The number of votes received per candidate
  mapping (uint256 => uint256) private votesReceived;

  /// @notice A record of accounts that have voted
  mapping(address => bool) voted;

  /// @notice The addresses with access to voting
  mapping(address => bool) private Access;

  /// @notice A record of addresses assigned as teachers
  mapping (address => bool) private teacher;

  /// @notice A record of addresses assigned as directors
  mapping (address => bool) private director;

  /// @notice  An official record of contestant information
  mapping (uint256 => candid) contestant;
  
  ///@notice mapping for other stake holders
  mapping (address => bool) private otherStakes;

  ///@notice mapping of students
  mapping (address => bool) Students;

  /// @notice Time to stop a function
  uint256 dead;

  /// @notice Address of the chairman of the organisation.
  address chairman;

  /// @notice State for a function
  bool start;

  /// @notice The number of candidates. Initialised as 0
  uint256 count = 0;

  /// @notice The phase of election, initialised as 0
  uint256 private electionPhase = 0;

  /// @notice states the details of a candidate
  struct candid
  {
      uint256 ID;
      string name;
      string position;
      string ipfs;
  }

  /**
   * @notice An event thats emitted to show the result of the election
   * @dev the Candid parameter will be a struct representing a contestant
   * @param Candid candidate contesting
   * @param votes total number of votes
   */
  event result(candid Candid, uint256 votes);

  /// @notice An event thats emitted to show the details of the candidates 
  event candidates(uint256 ID, string name, string position, string ipfs);

  /// @notice An event thats emitted to declare the winner
  event Winner(candid winner, uint256 votes);

  /// @notice This checks that the address is a stakeholder
  modifier stakeholder {
    require(Access[msg.sender] == true, "You are not a stakeholder");
    _;
  }

  /// @notice Modifier to start the voting process
  modifier startvoting
  {
    require(start==true,"Its not yet time to vote");
    _;
  }

  //@notice mpdifier to check if other stakeholder
  modifier otherStake
  {
    require(otherStakes[msg.sender]==true,"you dont have access");
    _;
  }
  
  /// @notice Moderator to control access to the smart contract
  modifier controlAccess{
    require(block.timestamp >= dead,"contract is disabled");
    _;
  }

  /**
   * @notice function allows chairman to enable contract
   */
  function enable() public {
      require (msg.sender == chairman,"You are not the chairman");
      dead = block.timestamp;
  }

  /**
   * @notice function allows chairman to disable contract
   */
  function disable() public {
    require(msg.sender == chairman,"You are not the chairman");
    dead = block.timestamp + 366 days;
  }

   /// @notice this functions clears the contents of the previously performed election so it can be reused
  function clearData()public 
  {
    require(msg.sender == chairman,"no access");
    require(start==false,"voting must end first");
    for(uint256 i = 1; i <= count; i++)
    {
      delete Candidate[i];
      delete contestant[i];
      delete votesReceived[i];
      delete contestant[i];
      delete candidateList[i];
    }
    count=0;

    for (uint256 i=0; i<candidateList.length; i++)
    {
      delete candidateList[i];
    }
    
  }

  /**
   * @notice function allows chairman start voting proccess
   */
  function beginVote()public controlAccess
  {
    require(msg.sender== chairman,"you're not the chairman");
    start = true;
    electionPhase = 1;
  }

  /**
   * @notice function allows chairman end voting proccess
   */
  function endVote()public controlAccess
  {
    require(msg.sender==chairman,"you're not the chairman ");
    start = false;
    electionPhase = 2;
  }

  /**
   * @notice Set chairman for the electoral process by the owner only
   * @param _chairman The address of the chairman
   */
  function setChairman(address _chairman) public onlyOwner {
    chairman = _chairman;
    Access[_chairman]=true;
    otherStakes[_chairman]=true;
  }
  
  /**
   * @notice Adds an array of student to have access as a stakeholder
   * @notice Adds an array of teacher to have access as a stakeholder
   * @notice Adds an array of director to have access as a stakeholder
   * @param addresses The address to be given roles
   * @param accountTypes array of the account type
   */
   function addStakeholders(address[] memory addresses, string[] memory accountTypes) public onlyOwner controlAccess {
      require(addresses.length == accountTypes.length, "the roles and addresses provided differ");     
      for (uint i = 0; i < addresses.length; i++) {
          if (keccak256(abi.encodePacked(accountTypes[i])) == keccak256(abi.encodePacked('student'))) {
              Students[addresses[i]] = true;
              Access[addresses[i]] = true;
          } else if (keccak256(abi.encodePacked(accountTypes[i])) == keccak256(abi.encodePacked('Teacher'))) {
               teacher[addresses[i]]=true;
               otherStakes[addresses[i]]=true;
               Access[addresses[i]] = true;
          } else if (keccak256(abi.encodePacked(accountTypes[i])) == keccak256(abi.encodePacked('Director'))) {
                 teacher[addresses[i]]=true;
                 otherStakes[addresses[i]]=true;
                 Access[addresses[i]] = true;
          } else {
              continue;
          }
      }
  }

  /**
   * @notice this function adds a candidate to the contract
   * @notice it checks if the user is the chairman
   * @param candidate The name of the candidate
   * @param position The position the candidate is vying for
   * @param link The ipfs link containing the image of the candidate
   */
  function addCandidate(string memory candidate,string memory position, string memory link)public controlAccess
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
   * @notice this function collects the candidates name, checks if it exists then counts a vote for said candidate
   * @param candidate The name of the candidate
  */
  function voteCandidate(uint256[] calldata candidate) external controlAccess stakeholder startvoting returns(bytes32){

    require(voted[msg.sender]==false,"You cant vote twice");

    /// @dev Make sure the candidate exists
    for(uint256 i = 0; i<candidate.length;i++)
    {
    require(Candidate[candidate[i]] == true, "Someone is not a candidate");   
     votesReceived[candidate[i]] += 1;
    }
    voted[msg.sender]= true;
    return "voted";
  }


  /**
   * @notice this function returns the number of votes of a candidate
   * @notice it checks if the user is the chairman or a teacher
   * @dev the uint value of votesReceived is converted to string and returned with bstr
   * @param candidate The name of the candidate
  */
  function candidateVotes(uint256 candidate) public controlAccess view returns (string memory) {
   if (msg.sender==chairman || teacher[msg.sender]==true)
   {

     /// @dev Make sure the candidate exists
    require(Candidate[candidate] == true, "This is not a candidate");

    bytes memory bstr = new bytes(votesReceived[candidate]);
    return string(bstr);
   }else 
   {
    return "You dont have access to this function";
   }
  }

  /**
   * @notice this function checks if the candidate exists
    * @dev hashed the name in candidate list and compared it with the hash of candidate using keccak256
       this is because solidity does'nt compare two string types with ==
   * @param candidate The name of the candidate 
   * @return Whether or not the candidate exists
   */
  function checkCandidate(string memory candidate) public view controlAccess returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate))) {
        return true;
      }
    }
    return false;
  }
   


   
  /**
   * @notice function allows otherstakeholders to make the results of the election visible to all students
   */
  function publicResults()public controlAccess otherStake
  {
    require(start == false,"voting has to end first");
    for(uint256 i=1; i<=count; i++)
    {
      emit result (contestant[i], votesReceived[i]);
    }
    electionPhase = 3;

  }

  function getElectionPhase() public view returns(uint256) {
    return electionPhase;
  }


/// @notice from here on contains functions for the login at the front end

   ///@notice chairman login
  function login(address user)public view returns(string memory)
  {
    if(user==chairman)
    {
      return "Chairman";
    }
     ///@notice other teachers login
    else if(teacher[user]==true)
    {
      return "Teacher";
    }
    ///@notice other directors login
    else if(director[user]==true)
    {
      return "Director";
    }
   ///@notice students login
    else if(Students[user]==true)
    {
      return "Student";
    }
    return "Not Authorised";
  }

  function contractstate()public view returns(bool)
  {
    return block.timestamp > dead;
  }
}
