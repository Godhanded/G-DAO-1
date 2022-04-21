import logo from './logo.svg';
import './App.css';
import Candidate from './components/Candidate';
import Landing from './components/Landing';
import VotingPage from './components/VotingPage';
import DeclareInterest from './components/DeclareInterest';
import NavBar from './components/NavBar';
import AdminPage from './components/AdminPage';
import { useState, useEffect } from 'react';
import Web3 from 'web3/dist/web3.min.js';
import StakerContract from './StakerApp.json'
import { contactAddress } from './contractAddress';

function App() {
  const [electionPhase, setElectionPhase] = useState(0);
  const [currentPage, setCurrentPage] = useState('login');
  const [accountType, setAccountType] = useState('Chairman');
  // const [votingStarted, setVotingStarted] = useState(false)
  // const [votingEnded, setVotingEnded] = useState(false)
  const [loaded, setLoaded] = useState(0);
  const [contract, setContract] = useState({});
  const [loginNotice, setLoginNotice] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('')

  const student = {
    name: "Ebube Ebube",
    CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
    watchword: "I believe I will make G-DAO great."
  }

  const handleVote = () => {
    console.log("Voted for Ebube");
  }

  // const handleSignIn = () => {
  //   console.log("Signing in...");
  //   setCurrentPage('home')
  // }

  const handleSignIn = async () => {
    let provider = window.ethereum;
    console.log(provider);
    setLoaded(1)
  
    if (typeof provider !== 'undefined') {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          setSelectedAccount(accounts[0]);
          console.log(`Selected account is ${selectedAccount}`);
          setLoaded(2)
          setCurrentPage('home')

        })
        .catch((err) => {
          console.log(err);
          return;
        });
  
      window.ethereum.on('accountsChanged', function (accounts) {
        setLoaded(1)
        setSelectedAccount(accounts[0]);
        console.log(`Selected account changed to ${selectedAccount}`)
        setTimeout(() => setLoaded(2), 1000)
      });
    }
  };

  useEffect(() => {
    let provider = window.ethereum;

    if (typeof provider === 'undefined') {
      setLoginNotice(true);
      return;
    }

    console.log(provider)

    const web3 = new Web3(provider);
    setContract(new web3.eth.Contract(
    	StakerContract.abi,
    	contactAddress
    ));

  }, [])

  const posts = ['President', 'Vice President'];

  const candidatesByPost = [{name: 'John Mike', watchword: 'I came to save', CID: 'QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS',
    post: 'President' },
    {
      name: "Ebube Ebube",
      CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
      watchword: "I believe I will make G-DAO great.",
      post: 'President'
    },
    {
      name: "Ebube Junior",
      CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
      watchword: "I believe I will make G-DAO great.",
      post: 'Vice President'
    }, {
      name: "Ebube Jack",
      CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
      watchword: "I believe I will make G-DAO great.",
      post: 'Vice President'
    }];

    console.log(currentPage)

  return (
    <div className="App">
      {currentPage === 'login' ? <Landing handleSignIn= {handleSignIn} notice = {loginNotice} /> :
      <>
      <NavBar address = {selectedAccount} accountType = {accountType} toggleHome = {(homeOrAdmin) => setCurrentPage(homeOrAdmin)} disconnectAccount= {()=> setCurrentPage('login')} />
      <div className= "layout">
        <h3>Welcome, {accountType}</h3>
        <hr/>
        {currentPage === 'home' && (electionPhase === 1 ? <VotingPage posts = {posts} candidatesByPost = {candidatesByPost} contract = {contract}/> :
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {electionPhase === 2 ? <p> Voting session has been concluded</p> : <p> Voting has not commenced yet</p>}
          <p> {'   '}</p>
          {electionPhase === 2 ? <p> Come back later to view results after the have been published</p> : <p> You would be notified when it commences</p>}
          </div>)}

        {currentPage === 'admin' && <AdminPage startVote = {() => setElectionPhase(1)} endVote = {() => setElectionPhase(2)} accountType = {accountType}/>}
      </div>
      </>}
      {/* <header className="App-header">
      
      
      <Candidate student = {student} handleVote = {handleVote} />
      <VotingPage posts = {posts} candidatesByPost = {candidatesByPost} />
      <DeclareInterest posts = {posts} />
      
        
      </header> */}
    </div>
  );
}

export default App;
