import logo from './logo.svg';
import './App.css';
import Candidate from './components/Candidate';
import Landing from './components/Landing';
import VotingPage from './components/VotingPage';
import DeclareInterest from './components/DeclareInterest';
import { useState } from 'react';

function App() {
  const [electionPhase, setElectionPhase] = useState(0);

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



  return (
    <div className="App">
      
      <header className="App-header">
      
      <Landing handleSignIn= {handleSignIn} />
      <Candidate student = {student} handleVote = {handleVote} />
      <VotingPage posts = {posts} candidatesByPost = {candidatesByPost} />
      <DeclareInterest posts = {posts} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
