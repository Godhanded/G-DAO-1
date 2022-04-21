import { useState } from 'react';
import Voting from './Voting';

const VotingPage = ({posts, candidatesByPost}) => {
    const [votes, setVotes] = useState([]);

    const setVoters = (name, checker) => {
        checker ? setVotes([...votes, name]) : setVotes(votes.filter(t => t !== name));
    }

    const handleSubmitVotes = () => {
        console.log(votes);
    }

    console.log(posts)

    return (
        <>

        <div className= "voting-page">
            <h1>
                Elections are Live
            </h1>
            <p> Select your choice candidate from the different categories. Note that you can only vote one candidate per category.</p>

            {posts.map((post, index) => {
                let candidates = candidatesByPost.filter(t => t.post === post)
                return (
                    < Voting post = {post} candidates = {candidates} handleVote = {setVoters} />
                )
            })}


            <button onClick= {handleSubmitVotes} className= "button-auth">Send Votes</button>
        </div>
        </>
        
    )
}

export default VotingPage