import './App.css';
import Landing from './components/Landing';
import VotingPage from './components/VotingPage';
import NavBar from './components/NavBar';
import AdminPage from './components/AdminPage';
import { useState, useEffect } from 'react';
import Web3 from 'web3/dist/web3.min.js';
import { CONTRACT_ABI } from './constants';
import { contactAddress } from './contractAddress';


function App() {
  const [electionPhase, setElectionPhase] = useState(1);
  const [currentPage, setCurrentPage] = useState('login');
  const [accountType, setAccountType] = useState('Chairman');
  const [contractAvailability, setContractAvailability] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [contract, setContract] = useState({});
  const [loginNotice, setLoginNotice] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('')
  const [candidates, setCandidates] = useState([])
  const [posts, setPosts] = useState([])

  const student = {
    name: "Ebube Ebube",
    CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
    watchword: "I believe I will make G-DAO great."
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

  const getElectionPhase = async (contract) => {
    let p = await contract.methods.getElectionPhase().call()
    return p;
  }

  const handleContractAvailability = async (contract) => {
    let p = await contract.methods.contractstate().call()
    return p;
  }

  const getAccountType = async (contract_, address) => {
    console.log(contract_)
    let p = await contract_.methods.login().call({from : address})
    return p;
  }

  const handleGetCandidates = async (contract) => {

    let k = await contract.getPastEvents('candidates', {fromBlock: 0})
    let result_ = []
    let res = []
    k.map((ele, id) => {
      let p = {}
      p.ID = ele.returnValues.ID
      p.name = ele.returnValues.name
      p.ipfs = ele.returnValues.ipfs
      p.position = ele.returnValues.position

      if (!res.includes(ele.returnValues.position)) {
        res.push(ele.returnValues.position)
      }

      result_.push(p)
      
    })

    setPosts(res);

    setCandidates(result_)
    console.log(result_)

  }

  const handleGetResults = async (contract) => {
    // let p = await contract.methods.getCandidates().call()
    // return p;

    let k = await contract.getPastEvents('result', {fromBlock: 0})
    let result_ = []
    k.map((ele, id) => {
      let p = {}
      p.ID = ele.returnValues.Candid.ID
      p.name = ele.returnValues.Candid.name
      p.ipfs = ele.returnValues.Candid.ipfs
      p.position = ele.returnValues.Candid.position
      p.votesCount = ele.reurnValues.votes

      result_.push(p)
      
    })

    setCandidates(result_)
    console.log(result_)

  }

  const handleSignIn = async (contract_) => {
    let provider = window.ethereum;
    console.log(contract_);
    setLoaded(true)
  
    if (typeof provider !== 'undefined') {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          setSelectedAccount(accounts[0]);
          console.log(`Selected account is ${selectedAccount}`);
          setCurrentPage('home')

          getAccountType(contract_, accounts[0]).then(p => {
            if (!['student', 'Chairman', 'teacher'].includes(p)) {
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
          if (!['student', 'Chairman', 'teacher'].includes(p)) {
            alert('You tried signing in with an unauthorized account. Contact the Chairman or any of the teachers')
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

    const web3 = new Web3(provider);
    let contract_ = new web3.eth.Contract(
    	CONTRACT_ABI,
    	contactAddress
    );
    console.log(contract_)
    setContract(contract_);

    handleSignIn(contract_).then((tx) => console.log(tx))

    handleContractAvailability(contract_).then(p => {
      console.log(p)
      setContractAvailability(p)});
    

    getElectionPhase(contract_).then(p => {
      setElectionPhase(p)
    })

    handleGetCandidates(contract_)
    


  }, [])

  useEffect(() => {

    if (electionPhase === 3) {
      handleGetResults(contract)
    }

  }, [electionPhase, contract])

  // const posts = ['President', 'Vice President'];

  // const candidatesByPost = [{name: 'John Mike', watchword: 'I came to save', CID: 'QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS',
  //   post: 'President' },
  //   {
  //     name: "Ebube Ebube",
  //     CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
  //     watchword: "I believe I will make G-DAO great.",
  //     post: 'President'
  //   },
  //   {
  //     name: "Ebube Junior",
  //     CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
  //     watchword: "I believe I will make G-DAO great.",
  //     post: 'Vice President'
  //   }, {
  //     name: "Ebube Jack",
  //     CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
  //     watchword: "I believe I will make G-DAO great.",
  //     post: 'Vice President'
  //   }];

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
      {!loaded ? (currentPage === 'login' ? <Landing handleSignIn= {() => handleSignIn(contract)} notice = {loginNotice} /> :
      <>
      <NavBar address = {selectedAccount} accountType = {accountType} toggleHome = {(homeOrAdmin) => setCurrentPage(homeOrAdmin)} disconnectAccount= {()=> setCurrentPage('login')} />
      <div className= "layout">
        { contractAvailability ? <>
          <h3>Welcome, {accountType}</h3>
        <hr/>
        {currentPage === 'home' && (electionPhase === 1 ? <VotingPage posts = {posts} candidatesByPost = {candidates} contract = {contract} address= {selectedAccount} /> :
        (electionPhase ===3 ? <VotingPage posts = {posts} candidatesByPost = {candidates} contract = {contract} isResultView = {true} resultsCompiled = {true}/> : 
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {electionPhase === 2 ? <p> Voting session has been concluded</p> : <p> Voting has not commenced yet</p>}
          <p> {'   '}</p>
          {electionPhase === 2 ? <p> Come back later to view results after the have been published</p> : <p> You would be notified when it commences</p>}
          </div>))}
          </> : fallback}

        {currentPage === 'admin' && <AdminPage startVote = {startVote} endVote = {endVote} accountType = {accountType} address = {selectedAccount}
        contract= {contract} enableContract= {enableContract} disableContract= {disableContract} contractLive = {contractAvailability} votingOccuring= {electionPhase < 2}
        candidates= {candidates} posts = {posts}/>}
      </div>
      </>) : loadPage}
      
    </div>
  );
}

export default App;
