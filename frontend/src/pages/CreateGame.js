// src/pages/Home.js
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing
// import axios from 'axios';      // Using axios to make a POST request

function CreateGame(){
    // Define state for form fields
    const [gameInfo, setGameInfo] = useState({
        gameName: '',
        public: true,
        creatorName: '',
        category: 'none',
        gameLink: '',
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
        alert(JSON.stringify(gameInfo))
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
        gameData[indexGroup].groupName = val
        alert(JSON.stringify(gameData[indexGroup]))
    }
    
    // word update - needs one parameter
    const updateGameDataWords = (val, indexGroup, indexWord)=>{
        gameData[indexGroup].words[indexWord] = val
        alert(JSON.stringify(gameData[indexGroup]))
    } 


    const handleSubmit = (e) => {
        e.preventDefault() 
        //axios.post('http://localhost:3000/api/items', gameInfo)       // Send a POST request to Flask backend
    }

    //const [data, setdate] = useState(({}));

      //let data = {};
      //JSON.stringify(dat);

      //fetch("http://localhost:5000/api").then(response => response.jpsn()).then;
    
      return (
      <div className="container text-center my-5">
        <h1 className="display-4 text-success">Create game</h1>
        <p className="lead text-muted">
            Create game here
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
                    <input type="text"
                    name = "creatorName"
                    value={gameInfo.creatorName}
                    onChange={creatorNameChange}
                    required/>
                </div>

                {/*Game Visibility (Public/Private) input*/}
                <div className="mb-3">
                    <label>Game Visibility</label>
                    <input type="radio"
                    name = "visibility"
                    value= {true}
                    checked={gameInfo.public === true}
                    onChange={visibilityChange}
                    required/>
                    Public

                    <input type="radio"
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
                        <option key={num} value={num}>{num}</option>))}
                    </select>
                </div>
               
                {/*Inputing group title
                <div className="mb-3">
                    <label htmlfor="gameName">Game Name</label>
                    <input 
                    type="text"
                    name = "gameName"
                    value={gameInfo.gameName}
                    onChange={gameNameChange}
                    required
                    />
                </div>
                
                
                */}
                
                {/*Inputing X words for group*/}

                {/*Repeat for the total # of groups selected*/}
                {/*Inputing group title*/}

                {/*Inputing X words for group*/}

                {gameData.map((groupObject, indexGroup)=>
                <div>
                        <div className="mb-3">
                            <label htmlfor="groupName">Group name</label>
                            <input type="text"
                            name = "groupName"
                            
                            onChange={(e)=>updateGameDataGroup(e.target.value, indexGroup)} // update title
                            required/>
                        </div>
                        {groupObject.words.map((words, indexWord)=>
                            <div>
                                <p></p>
                                <span >
                                    <label htmlfor="wordInput">inputBox</label>
                                    <input type="text"
                                    name = "wordInput"
                                    value={gameData[indexGroup].words[indexWord]}
                                    onChange={(e)=>updateGameDataWords(e.target.value, indexGroup, indexWord)} //update words
                                    required/>
                                </span>
                            </div>
                        )}


                </div>)}
                

                <button type="submit">Submit</button>
             </form>
        </p>
      </div>
    );
}
  
export default CreateGame;
  {/*
                    {x.map((y)=>
                    
                    <div>
                        <label htmlfor="box">Box</label>
                        <input
                        type="text"
                        />

                        </div>)}*/}