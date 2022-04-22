

const ResultSummary = ({amountOfVotes, numOfPosts, candidPerPost}) => {

    return (
        <div className= "results-summary">
                <div className= "results-summary-box">
                    <h3>Number of Votes</h3>
                    <h1>{amountOfVotes}</h1>
                </div>

                <div className= "results-summary-box">
                    <h3>Number of Positions</h3>
                    <h1>{numOfPosts}</h1>
                </div>

                <div className= "results-summary-box">
                    <h3>Candidate per Post</h3>
                    <h1>{candidPerPost}</h1>
                </div>

        </div>
    )
}

export default ResultSummary;