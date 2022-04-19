import logo from './logo.svg';
import './App.css';
import Candidate from './components/Candidate';
import Landing from './components/Landing';

function App() {
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



  return (
    <div className="App">
      
      <header className="App-header">
      <Landing handleSignIn= {handleSignIn} />
      <Candidate student = {student} handleVote = {handleVote} />
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
