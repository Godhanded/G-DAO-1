import { useState } from 'react';

const AdminPage = ({startVote, endVote, accountType, address}) => {
    const [newAdmin, setNewAdmin] = useState('')
    const [candidateName, setCandidateName] = useState('')
    const [position, setPosition] = useState('')
    const [picture, setPicture] = useState(null)

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
        if (picture === null) {
			alert('Please upload an image');
        return;
		}
		try {
			const res = await client.add(picture, {
				progress: (prog) => console.log(`received: ${prog}`),
			});
            await contract.methods.addCandidate(
				candidateName,
				position,
				res.path,
			).send({from : address})
            alert('Candidate Added');	
            console.log('Added Candidate')
            setCandidateName('')
            setPosition('')
            setPicture('')
        } 
        catch (error) {
			alert(error);
		}           
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

                        <label htmlFor="position"> Position </label>
                        <input type= "text" placeholder= "Enter position here" value= {position} onChange= {(e)=> setPosition(e.target.value)} />

                        <label htmlFor="picture"> Photograph </label>
                        <input type= "file"   onChange= {(e)=> setPicture(e.target.files[0])} />

                        <input type="submit" placeholder= "Declare"/>
                    </form>
            
        </div>
    )
}

export default AdminPage