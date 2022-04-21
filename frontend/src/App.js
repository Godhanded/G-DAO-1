import logo from './logo.svg';
import './App.css';
import Candidate from './components/Candidate';
import Landing from './components/Landing';
import VotingPage from './components/VotingPage';
import DeclareInterest from './components/DeclareInterest';
import NavBar from './components/NavBar';
import AdminPage from './components/AdminPage';
import { useState } from 'react';

function App() {
  const [electionPhase, setElectionPhase] = useState(0);
  const [currentPage, setCurrentPage] = useState('login');
  const [accountType, setAccountType] = useState('Chairman');
  const [votingStarted, setVotingStarted] = useState(false)

  const student = {
    name: "Ebube Ebube",
    CID: "QmaXjpTENetYrqHicuyNweCgVdLHuEqLQ3PrwQ4MAMc1SS",
    watchword: "I believe I will make G-DAO great."
  }

  const handleVote = () => {
    console.log("Voted for Ebube");
  }

  const handleSignIn = () => {
    console.log("Signing in...");
    setCurrentPage('home')
  }

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
      {currentPage === 'login' ? <Landing handleSignIn= {handleSignIn} /> :
      <>
      <NavBar address = {'0x940Fbxc678njkmhbjj'} accountType = {accountType} toggleHome = {(homeOrAdmin) => setCurrentPage(homeOrAdmin)} />
      <div className= "layout">
        <h3>Welcome, {accountType}</h3>
        <hr/>
        {currentPage === 'home' && (votingStarted ? <VotingPage posts = {posts} candidatesByPost = {candidatesByPost} /> :
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <p> Voting has not commenced yet</p>
          <p> {'   '}</p>
          <p> You would be notified when it commences</p>
          </div>)}

        {currentPage === 'admin' && <AdminPage />}
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
