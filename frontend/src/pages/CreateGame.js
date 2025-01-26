// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import './CreateGame.css';


import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing
// import axios from 'axios';

function CreateGame(){
    // Define state for form fields
    const [gameInfo, setGameInfo] = useState({
        gameName: '',
        public: true,
        creatorName: '',
        category: 'none',
        gameLink: '',
        groups: 4,
        wordsPerGroup: 4,
    });

    const [groups, setGroups] = useState(4)
    const [wordsPerGroup, setWordsPerGroup] = useState(4)

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [gameData, setGameData] = useState([])

    // Change page title
    useEffect(() => {document.title = "Create Game";
        generateGameDataObject()
    }, [groups, wordsPerGroup]); 
    
    // Handle gameData object generation
    const generateGameDataObject = () => {
        const newGameDataObject = [];
        // word groups
        const filledArray = [];
        for (let i = 0; i < wordsPerGroup; i++) {
            filledArray.push("");
        }
        //alert(filledArray)
        for (let i = 0; i < groups; i++) {
            const group = {
                groupName: '',
                words: [...filledArray],
            }
            newGameDataObject.push(group);
        }
        //alert(groupCount + " " +wordCount)
        setGameData([...newGameDataObject]);
    }

    // Handle input changes
    // Game Name
    const gameNameChange = (e) => {
        const {value} = e.target;
        setGameInfo({
            ...gameInfo,
            gameName: value
        });
        //alert(JSON.stringify(gameInfo))
        //alert(JSON.stringify(gameData))
    }
    // Creator Name
    const creatorNameChange = (e) => {
        const {value} = e.target;
        setGameInfo({
            ...gameInfo,
            creatorName: value
        });
    }

    // Visibility (Public/Private)
    const visibilityChange = (e) => {
        const { value } = e.target;
        setGameInfo({
        ...gameInfo,
        public: value === 'true', // Convert value to boolean
        });
    }

    // Catrogory choices
    const categoryChange = (e) => {
        const selectedCategory = e.target.value;
        setGameInfo({
            ...gameInfo,
            category: selectedCategory, 
        });
    }

    // groups
    const groupsChange = (e) => {
        const groupCount = e.target.value;
        setGroups(groupCount)

        generateGameDataObject()
    }

    // wordsPerGroup
    const wordsPerGroupChange = (e) => {
        const wordCount = e.target.value;
        setWordsPerGroup(wordCount)
        //alert(wordCount)
        
        generateGameDataObject()
    }

    // Group update - needs one parameter
    const updateGameDataGroup = (val, indexGroup)=>{
        
        const updatedGameData = [...gameData]; // Create a shallow copy of gameData
        updatedGameData[indexGroup] = {
            ...updatedGameData[indexGroup], // Copy the existing group object
            groupName: val, // Update the groupName
            };
        setGameData(updatedGameData);
        //alert(JSON.stringify(gameData[indexGroup]))
    }
    
    // word update - needs one parameter
    const updateGameDataWords = (val, indexGroup, indexWord)=>{
        //gameData[indexGroup].words[indexWord] = val
        //alert(JSON.stringify(gameData[indexGroup]))

        const updatedGameData = [...gameData]; // Create a shallow copy of gameData
        const updatedGroup = { ...updatedGameData[indexGroup] }; // Copy the specific group
        updatedGroup.words[indexWord] = val; // Update the specific word
        updatedGameData[indexGroup] = updatedGroup; // Replace the group in gameData
        setGameData(updatedGameData);
    } 

    const navigate = useNavigate()

    // SUBMIT actions
    const handleSubmit = async (e) => {

        e.preventDefault() 
        
        gameInfo.groups = groups;
        gameInfo.wordsPerGroup = wordsPerGroup;
        const gameUpload = {
            ...gameInfo,
            gameData,
        }
        console.log("Form Data:", JSON.stringify(gameUpload))

        navigate('/PlayGame', {state: gameUpload})

        try{
            const response = await fetch("http://127.0.0.1:5000/upload_game_data", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameUpload)
            });
            if (response.ok){
                const data = await response.json();
                console.log("Game Created Successfully:", response.data);
                //("Game Created Successfully!");
            }else{
                console.log("Error creating game:");
                //alert("There was an error creating the game.");
            }
        } catch (error){
            console.log("Network error:", error);
            //alert("There was a network error.");
        }

    }

    //const [data, setdate] = useState(({}));

      //let data = {};
      //JSON.stringify(dat);

      //fetch("http://localhost:5000/api").then(response => response.jpsn()).then;
    
    return (
      <div className="container">
        
        <h1>Your New Set</h1>
        
        <p className="lead">Create your own connections using this form!</p>
        <form onSubmit={handleSubmit}>

            {/*Game name input*/}
            <div className="mb-3">
                <label>Game Name</label>
                <input 
                    type="text"
                    name = "gameName"
                    value={gameInfo.gameName}
                    onChange={gameNameChange}
                    required
                    />
                </div>
                
                {/*Creator name input*/}
                <div className="mb-3">
                    <label>Creator Name</label>
                    <input 
                    type="text"
                    name = "creatorName"
                    value={gameInfo.creatorName}
                    onChange={creatorNameChange}
                    required
                    />
                </div>

                {/*Game Visibility (Public/Private) input*/}
                <div className="mb-3">
                    <label>Game Visibility</label>
                    <input 
                    type="radio"
                    name = "visibility"
                    value= {true}
                    checked={gameInfo.public === true}
                    onChange={visibilityChange}
                    required/>

                    Public

                    <input 
                    type="radio"
                    name = "visibility"
                    value = {false}
                    checked={gameInfo.public === false}
                    onChange={visibilityChange}
                    required/>
                    Private
                </div>

                {/*Category multiple select input*/}
                <div className="mb-3">
                    <label>Select Category</label>
                    <select
                        name="category"
                        onChange={categoryChange}
                    >
                        <option value="none">None</option>
                        <option value="math">Math</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        <option value="programming">Programming</option>
                    </select>
                </div>
                
                {/*groups input*/}
                <div className="mb-3">
                    <label>Select # of groups</label>
                    <select
                        name="groups"
                        onChange={groupsChange}
                        value = {groups}
                    >
                        {Array.from({ length: 7 }, (_, i) => i + 2).map((num) => (
                        <option key={num} value={num}>{num}</option>))}
                    </select>
                </div>

                {/*wordsPerGroup input*/}
                <div className="mb-3">
                    <label>Select # of words per group</label>
                    <select
                        name="wordsPerGroup"
                        onChange={wordsPerGroupChange}
                        value={wordsPerGroup}
                    >
                        {Array.from({ length: 7 }, (_, i) => i + 2).map((num) => (
                        <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            
                {gameData.map((groupObject, indexGroup)=> (
                    <div key={indexGroup} className="word-group">
                        <div className="mb-3">
                            <label>Group name</label>
                            <input 
                            type="text"
                            name = "groupName"
                            value = {gameData[indexGroup].groupName}
                            onChange={(e)=>updateGameDataGroup(e.target.value, indexGroup)} // update group
                            required/>
                        </div>
                        {groupObject.words.map((words, indexWord) => (
                            <div key={indexWord} className="mb-3">
                                <label>Word {indexWord + 1}</label>
                                    <input type="text"
                                    name = "wordInput"
                                    value={gameData[indexGroup].words[indexWord]}
                                    onChange={(e)=>updateGameDataWords(e.target.value, indexGroup, indexWord)} //update words
                                    required/>
                                </div>
        ))}
    </div>
))}

    

        <button type="submit">Play Now</button>
     </form>
    </div>
);}

export default CreateGame;