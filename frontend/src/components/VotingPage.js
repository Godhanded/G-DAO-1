import { useState, useEffect } from 'react';
import Voting from './Voting';
import ResultSummary from './ResultSummary';
import AdminPage from './AdminPage';

const VotingPage = ({posts, candidatesByPost, isResultView, isAdminView, resultsCompiled, contract, address}) => {
    const [votes, setVotes] = useState([]);
    const [noOfVotes, setNoOfVotes] = useState(0);

    const setVoters = (name, checker) => {
        checker ? setVotes([...votes, name]) : setVotes(votes.filter(t => t !== name));
    }

    const handleSubmitVotes = async () => {
        console.log(votes);

        try {
            await contract.methods.voteCandidates(votes).send({from : address})
            alert('Votes Sent');
        } 
        catch (error) {
			alert(error);
		}
    }

    useEffect(() => {
        if (isResultView) {
            let sum_ = candidatesByPost.reduce((acc, curr) => acc + curr.votesCount, 0);
            setNoOfVotes(sum_);
            
        }
    }, [candidatesByPost, isResultView])

    return (
        <>

        <div className= "voting-page">
            <h1>
                {isResultView ? 'Election Results' : (isAdminView ? 'All Candidates' : 'Elections are Live')}
            </h1>
            {!isAdminView && <p> {isResultView ? 'View the results of the just concluded elections below' :
            'Select your choice candidate from the different categories. Note that you can only vote one candidate per category.'}</p>}

            {isResultView && <ResultSummary numOfPosts= {posts.length} amountOfVotes = {noOfVotes} candidPerPost = {Math.round(noOfVotes/posts.length)} />}

            {posts.map((post, index) => {
                let candidates = candidatesByPost.filter(t => t.post === post).sort((a, b) => {
                    if(isResultView) return b.votesCount - a.votesCount;
                    return 0;
                })
                return (
                    < Voting post = {post} candidates = {candidates} handleVote = {setVoters} isResultView = {isResultView} isAdminView = {isAdminView} resultsCompiled= {resultsCompiled} />
                )
            })}


            {!isAdminView && !isResultView && <button onClick= {handleSubmitVotes} className= "button-auth">Send Votes</button>}
        </div>
        </>
        
    )
}

AdminPage.defaultProps = {
    isResultView: false,
    isAdminView: false,
    resultsCompiled: false
}

export default VotingPage