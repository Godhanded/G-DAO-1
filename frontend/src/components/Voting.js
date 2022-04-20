import { AiOutlineClose } from 'react-icons/ai';
import { FaSpinner, FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { useState } from 'react';
import Candidate from './Candidate';


const Voting = ({post, candidates, handleVote}) => {
    const [showContestants, setShowContestants] = useState(true);
    const [hasVoted, setHasVoted] = useState(false);

    // check that category has been voted for
    const checkVoted = (name, checker) => {
        if (checker && hasVoted) {
            alert("You cant vote two candidates in the same category. Unvote your previous selection")
            return;
        }
        handleVote(name, checker)
        setHasVoted(checker);
        
    }

    console.log(candidates)
    return (
        <div className = "voting-bar">
            <div className= "voting-bar-header">
                <h2>{post}</h2>
                {showContestants ? < FaAngleDoubleUp onClick= {() => setShowContestants(false)} />
                : < FaAngleDoubleDown onClick= {() => setShowContestants(true)} />}
            </div>
            {showContestants && <div className= "candidate-view">
                {candidates.map((candidate, index) => {
                    return (<div key = {index}>
                        < Candidate student = {candidate} handleVote = {checkVoted} number = {index + 1} votedforCategory= {hasVoted} />
                    </div>)
                    
                })}
            </div>}
            

        </div>
        
    )
}

export default Voting;