import { useState } from 'react';
import * as ipfsClient from 'ipfs-http-client';
import VotingPage from './VotingPage';


const AdminPage = ({contract, startVote, endVote, accountType, address, enableContract, disableContract, contractLive, votingOccuring, candidates, posts}) => {

    const [newAdmin, setNewAdmin] = useState('')
    const [candidateName, setCandidateName] = useState('')
    const [position, setPosition] = useState('')
    const [picture, setPicture] = useState(null)

    const [viewCandidates, setViewCandidates] = useState(false)
    const [viewResults, setViewResults] = useState(false)
    const [file, setFile] = useState()
    const [accountType_, setAccountType_] = useState('')
    const create = ipfsClient.create;
	const client = create(`https://ipfs.infura.io:5001/api/v0`);
    const fileReader = new FileReader();


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

    const getType = async () => {
        if(!newAdmin) {alert('Enter a valid address'); return;}
        try {
            const res = await contract.methods.getAccountType(newAdmin).call()
            setAccountType_(res);
            setNewAdmin('');
        } 
        catch (error) {
            alert(error);
        } 
    }


    const handleAddStakeholders = async (e) => {
        e.preventDefault();

        let res = [];
        let roles = [];
        if (file) {
            console.log(file)
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                let lines = csvOutput.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    let p = lines[i].split(',');
                    res.push(p[0]);
                    roles.push(p[1]);
        
                }
        
                console.log({res, roles})

            };


            fileReader.readAsText(file);
        }

        if (res.length === roles.length && res.length !== 0) {
            try {
                await contract.methods.addStakeholders().send({from : address})
                alert('Results set to Published');	
                console.log('Added Candidate')
            } 
            catch (error) {
                alert(error);
            } 
        } else alert("The number of addresses you sent do not match the number of roles. Check your file and try again.")
        
    }

    const handlePublishResults = async () => {
        try {
            await contract.methods.publishResults().send({from : address})
            alert('Results set to Published');	
            console.log('Added Candidate')
        } 
        catch (error) {
			alert(error);
		} 
    }


    const handleAddCandidate = async () => {
        if (picture === null) {
			alert('Please upload an image');
        return;
		}
		try {
			const res = await client.add(picture, {
				progress: (prog) => console.log(`received: ${prog}`)
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
            setPicture(null)

        } 
        catch (error) {
			alert(error);
		}           
    }


    return (
        <>
        {votingOccuring && candidates.length !== 0 && <button onClick= {() => setViewCandidates(!viewCandidates)} 
        className = "side-button"> {viewCandidates ? 'Back to Admin' : 'View Candidates'}</button>}
        {!votingOccuring && <button onClick= {() => setViewResults(!viewResults)} className = "side-button"> {viewResults ? 'Back to Admin' : 'View Results'}</button>}
        <div className= "admin-page">
            {!viewResults && !viewCandidates && <>
            {contractLive && <>
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
                Check Account Type
            </h3>
            <div className= "start-and-end-vote">
                <input type= 'text' placeholder= 'Enter Address' value = {newAdmin} onChange= {(e) => setNewAdmin(e.target.value)} />
                <button onClick = {getType}> Check</button>
            </div>
            <div className= "account-type" >{accountType_}</div>

            {accountType === 'Chairman' && <>
            <h3>Add Candidate</h3>
            <div className= "interest-form">
                        <label htmlFor="candidateName">  Full Name </label>
                        <input type= "text" placeholder= "Enter full name here" value= {candidateName} onChange= {(e)=> setCandidateName(e.target.value)} />

                        <label htmlFor="position"> Position </label>
                        <input type= "text" placeholder= "Enter position here" value= {position} onChange= {(e)=> setPosition(e.target.value)} />

                        <label htmlFor="picture"> Photograph </label>
                        <input type= "file" onChange= {(e)=> setPicture(e.target.files[0])} />

                        {/* <input type="submit" placeholder= "Declare"/> */}
                        <button onClick= {handleAddCandidate}>Submit</button>
                    </div>


            <h3> WhiteList Addresses </h3>
            <input type = "file" onChange = {(e) => setFile(e.target.files[0])} />
            <button onClick = {(e) => handleAddStakeholders(e)}>Add Stakeholders</button>
            </>}
            </>}

            {!contractLive && <p>Contract is not enabled at the moment. Please enable contract first or contact Chairman</p>}


            {accountType === 'Chairman' && <>
            <h3>Contract Availability</h3>
            <div className= "start-and-end-vote">
                <button className= "start-vote" onClick= {enableContract}>
                    Enable Contract
                </button>
                <button className= "end-vote" onClick= {disableContract}>
                    Disable Contract
                </button>
            </div>
            </>}
            </>}

            {viewCandidates && <VotingPage posts= {posts} candidatesByPost= {candidates} isAdminView= {true}/>}
            {viewResults && <VotingPage posts= {posts} candidatesByPost= {candidates} isResultView= {true} />}

            <button onClick= {handlePublishResults}> Publish Results</button>
            
        </div>
        </>
    )
}

export default AdminPage