import { useState } from 'react';

const AdminPage = ({startVote, endVote, accountType, enableContract, disableContract, contractLive}) => {
    const [newAdmin, setNewAdmin] = useState('')
    const [candidateName, setCandidateName] = useState('')
    const [position, setPosition] = useState('')
    const [picture, setPicture] = useState('')

    const handleStartVote = () => {
        console.log('Started Voting season');
        startVote();
    }

    const handleEndVote = () => {
        console.log('Ended Voting season');
        endVote();
    }

    const handleAddAdmin = () => {
        console.log(newAdmin);
        setNewAdmin('');
    }

    const handleAddCandidate = () => {
        console.log('Added Candidate')
        setCandidateName('')
        setPosition('')
        setPicture('')
    }


    return (
        <div className= "admin-page">
            <h3>Voting Adjustment</h3>
            <div className= "start-and-end-vote">
                <button className= "start-vote" onClick= {handleStartVote}>
                    Start Vote
                </button>
                <button className= "end-vote" onClick= {handleEndVote}>
                    End Vote
                </button>
            </div>

            <h3>
                Add New Admin
            </h3>
            <div className= "start-and-end-vote">
                <input type= 'text' placeholder= 'Enter Address' value = {newAdmin} onChange= {(e) => setNewAdmin(e.target.value)} />
                <button onClick = {handleAddAdmin}> Add Admin</button>
            </div>

            <h3>Add Candidate</h3>
            <form onSubmit= {handleAddCandidate} className= "interest-form">
                        <label htmlFor="candidateName">  Full Name </label>
                        <input type= "text" placeholder= "Enter full name here" value= {candidateName} onChange= {(e)=> setCandidateName(e.target.value)} />

                        <label htmlFor="level"> Position </label>
                        <input type= "text" placeholder= "Enter position here" value= {position} onChange= {(e)=> setPosition(e.target.value)} />

                        <label htmlFor="picture"> Photograph </label>
                        <input type= "file" placeholder= "Enter your catchphrase here" value= {picture} onChange= {(e)=> setPicture(e.target.value)} />

                        <input type="submit" placeholder= "Declare"/>
                    </form>

            <h3>Contract Availability</h3>
            <div className= "start-and-end-vote">
                <button className= "start-vote" onClick= {enableContract}>
                    Enable Contract
                </button>
                <button className= "end-vote" onClick= {disableContract}>
                    Disable Contract
                </button>
            </div>
            
        </div>
    )
}

export default AdminPage