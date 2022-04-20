import { FaSpinner, FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { useState } from 'react';


const DeclareInterest = ({posts}) => {
    const [currentSelection, setCurrentSelection] = useState('')
    const [candidateName, setCandidateName] = useState('')
    const [regNumber, setRegNumber] = useState('')
    const [watchword, setWatchword] = useState('')
    const [picture, setPicture] = useState('')
    const [level, setLevel] = useState('')


    const handleDeclareInterest = () => {
        console.log('Declared')
        setCurrentSelection('')
    }

    return (
        <div className= "voting-page">
            <h1>
                Declaration of Interests
            </h1>
            <p> Select post to declare interest from the list below and </p>

            {currentSelection === '' ? posts.map((post, index) => {
                
                return (
                    <div key= {index} className = "voting-bar">
                        <div className= "voting-bar-header">
                            <h2>{post}</h2>
                            < FaAngleDoubleDown onClick= {() => setCurrentSelection(post)} />
                        </div>
                    </div>
                )
            }) : <div className = "voting-bar">
                    <div className= "voting-bar-header">
                        <h2>{currentSelection}</h2>
                        <FaAngleDoubleUp onClick= {() => setCurrentSelection('')} />
                    </div>

                    <form onSubmit= {handleDeclareInterest} className= "interest-form">
                        <label htmlFor="candidateName">  Full Name </label>
                        <input type= "text" placeholder= "Enter your full name here" value= {candidateName} onChange= {(e)=> setCandidateName(e.target.value)} />

                        <label htmlFor="regNumber"> Registration Number </label>
                        <input type= "text" placeholder= "Enter your School reg number" value= {regNumber} onChange= {(e)=> setRegNumber(e.target.value)} />

                        <label htmlFor="watchword"> Catchphrase </label>
                        <input type= "text" placeholder= "Enter your catchphrase here" value= {watchword} onChange= {(e)=> setWatchword(e.target.value)} />

                        <label htmlFor="level"> Level of Study </label>
                        <input type= "text" placeholder= "Enter your level here" value= {level} onChange= {(e)=> setLevel(e.target.value)} />

                        <label htmlFor="watchword"> Photograph </label>
                        <input type= "file" placeholder= "Enter your catchphrase here" value= {picture} onChange= {(e)=> setPicture(e.target.value)} />

                        <input type="submit" placeholder= "Declare"/>
                    </form>
                </div>}
        </div>
    )
}


export default DeclareInterest