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
  const [currentPage, setCurrentPage] = useState('home');
  const [accountType, setAccountType] = useState('Chairman');
  const [contractAvailability, setContractAvailability] = useState(true);
  // const [votingStarted, setVotingStarted] = useState(false)
  // const [votingEnded, setVotingEnded] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const [contract, setContract] = useState({});
  const [loginNotice, setLoginNotice] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('')
  const [resultTime, setResultTime] = useState(false)

  const student = {
    name: "Ebube Ebube",
    CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
    watchword: "I believe I will make G-DAO great."
  }

  const handleVote = () => {
    console.log("Voted for Ebube");
  }

  const startVote = () => {
     contract.methods.beginVote().send({
       from:selectedAccount
     }).then(() => { alert('Started voting session')
     setElectionPhase(1) 
    }).catch((err) => {console.log(err) })
  }

  const endVote = () => {
    contract.methods.endVote().send({
      from:selectedAccount
    }).then(() => { alert('Ended voting session')
    setElectionPhase(2) 
   }).catch((err) => {console.log(err) })
 }

  const disableContract = () => {
    contract.methods.disable().send({
      from:selectedAccount
    }).then(() => { alert('Contract Disabled')
    setContractAvailability(false) 
   }).catch((err) => {console.log(err) })
  }

  const enableContract = () => {
    contract.methods.enable().send({
      from:selectedAccount
    }).then(() => { alert('Contract Enabled')
    setContractAvailability(true) 
   }).catch((err) => {console.log(err) })
  }

  const votingOngoing = async () => {
    let p = await contract.methods.resultsPublished().call()
    return p;
  }

  const isResultTime = async () => {
    let p = await contract.methods.resultsPublished().call()
    return p;
  }

  const handleContractAvailability = async () => {
    let p = await contract.methods.getAvailability().call()
    return p;
  }

  const getAccountType = async (contract, address) => {
    let p = await contract.methods.getAccountType(address).call()
    return p;
  }

  const handleSignIn = async (contract) => {
    let provider = window.ethereum;
    console.log(provider);
    setLoaded(true)
  
    if (typeof provider !== 'undefined') {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          setSelectedAccount(accounts[0]);
          console.log(`Selected account is ${selectedAccount}`);

          getAccountType(contract, accounts[0]).then(p => {
            if (!['student', 'Chairman', 'teacher', 'Director'].includes(p)) {
              alert('You have signed in with an unauthorized account. Contact the Chairman or any of the teachers')
              setCurrentPage('login')
              setLoaded(false)
              return
            }
            setAccountType(p)
            setCurrentPage('home')
            setLoaded(false)
          })

        })
        .catch((err) => {
          console.log(err);
          setCurrentPage('login')
          setLoaded(false)
          return;
        });
  
      window.ethereum.on('accountsChanged', function (accounts) {
        setLoaded(true)
        setSelectedAccount(accounts[0]);
        getAccountType(accounts[0]).then(p => {
          if (!['student', 'Chairman', 'teacher', 'Director'].includes(p)) {
            alert('You have signed in with an unauthorized account. Contact the Chairman or any of the teachers')
            setCurrentPage('login')
            return
          }
          setAccountType(p)
          setCurrentPage('home')
        })
        console.log(`Selected account changed to ${selectedAccount}`)
        setTimeout(() => setLoaded(false), 1000)
      });
    }
  };

  useEffect(() => {
    let provider = window.ethereum;

    if (typeof provider === 'undefined') {
      setCurrentPage('login')
      setLoginNotice(true);
      return;
    }

    console.log(provider)

    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(
    	StakerContract.abi,
    	contactAddress
    );
    

    handleSignIn(contract)
    setContract(contract);

    // if (!selectedAccount) setCurrentPage('login')

  }, [])

  useEffect(() => {
    handleContractAvailability().then(p => setContractAvailability(p));
    isResultTime().then(p => {
      setResultTime(p)
    })

    votingOngoing().then(p => {
      p ? setElectionPhase(1) : setElectionPhase(0)
    })



  }, [contract])

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

  const loadPage = (<div>
    <p>Loading .....</p>
  </div>)

  const fallback = (<div>
    <h1>404</h1>
    <p>The resource you seek is currently not available. Check back another time.</p>
  </div>)

  console.log(currentPage)

  return (
    <div className="App">
      {!loaded ? (currentPage === 'login' ? <Landing handleSignIn= {handleSignIn} notice = {loginNotice} /> :
      <>
      <NavBar address = {selectedAccount} accountType = {accountType} toggleHome = {(homeOrAdmin) => setCurrentPage(homeOrAdmin)} disconnectAccount= {()=> setCurrentPage('login')} />
      <div className= "layout">
        { contractAvailability ? <>
          <h3>Welcome, {accountType}</h3>
        <hr/>
        {currentPage === 'home' && (electionPhase === 1 ? <VotingPage posts = {posts} candidatesByPost = {candidatesByPost} contract = {contract}/> :
        (resultTime ? <VotingPage posts = {posts} candidatesByPost = {candidatesByPost} contract = {contract} isResultView = {true} resultsCompiled = {true}/> : 
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {electionPhase === 2 ? <p> Voting session has been concluded</p> : <p> Voting has not commenced yet</p>}
          <p> {'   '}</p>
          {electionPhase === 2 ? <p> Come back later to view results after the have been published</p> : <p> You would be notified when it commences</p>}
          </div>))}
          </> : fallback}

        {currentPage === 'admin' && <AdminPage startVote = {startVote} endVote = {endVote} accountType = {accountType} address = {selectedAccount}
        contract= {contract} enableContract= {enableContract} disableContract= {disableContract} contractLive = {contractAvailability} votingOccuring= {electionPhase < 2}
        candidates= {candidatesByPost} posts = {posts}/>}
      </div>
      </>) : loadPage}
      {/* <header className="App-header">
      
      
      <Candidate student = {student} handleVote = {handleVote} />
      <VotingPage posts = {posts} candidatesByPost = {candidatesByPost} />
      <DeclareInterest posts = {posts} />
      
        
      </header> */}
    </div>
  );
}

export default App;
