import { useState } from 'react';

const Candidate = ({student, handleVote, number, votedforCategory}) => {
    const [isVoted, setIsVoted] = useState(false);

    const setVote = () => {
        isVoted ? handleVote(student.name, false) : handleVote(student.name, true);
        if (votedforCategory) return;
        setIsVoted(!isVoted);
    }

    return (
        <div className= "candidate-pane">
            <h2>Candidate {number}</h2>
            <div className= "candidate-img">
                <img src= {`https://ipfs.infura.io/ipfs/${student.CID}`} alt= {student.name}>
                </img>
            </div>
            

            <h3>{student.name}</h3>
            <p>{student.watchword}</p>
            <button onClick= {setVote}> {isVoted ? 'Unvote' : 'Vote'} </button>
        </div>
    )
}

export default Candidate;