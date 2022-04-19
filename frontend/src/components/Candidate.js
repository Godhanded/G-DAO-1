

const Candidate = ({student, handleVote}) => {


    return (
        <div className= "candidate-pane">
            <div className= "candidate-img">
                <img src= {`https://ipfs.infura.io/ipfs/${student.CID}`} alt= {student.name}>
                </img>
            </div>
            

            <h3>{student.name}</h3>
            <p>{student.watchword}</p>
            <button onClick= {handleVote}> Vote </button>
        </div>
    )
}

export default Candidate;