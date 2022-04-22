import { useState } from 'react';

const Candidate = ({student, handleVote, number, votedforCategory, isResultView, isWinner, isAdminView}) => {
    const [isVoted, setIsVoted] = useState(false);

    const setVote = () => {
        isVoted ? handleVote(student.id, false) : handleVote(student.id, true);
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
            {/* <p>{student.watchword}</p> */}
            {!isResultView && !isAdminView && <button onClick= {setVote}> {isVoted ? 'Unvote' : 'Vote'} </button>}
            {isResultView && 
            <>
            <p>Votes Count: {student.votesCount}</p>
            {isWinner && <h3 style={{color: 'red'}}>Winner!!!</h3>}
            </>}

        </div>
    )
}

Candidate.defaultProps = {
    isResultView: false,
    isAdminView: false,
    isWinner: false,
    votesCount: 0
}

export default Candidate;