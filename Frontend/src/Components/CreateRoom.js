import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/CurrentUser";
import '../Styling/CreateRoom.css'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import backA from '../svg/back.png'



function CreateRoom({ createRoomToParent }) {

    


    

    const history = useHistory();
    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')

    const [roomExists, setRoomExists] = useState(false)
    const [roomName, setRoomName] = useState("")
    const [roomQuestion, setRoomQuestion] = useState("")
    const [Math, setMath] = useState(false)
    const [English, setEnglish] = useState(false)
    const [Geography, setGeography] = useState(false)
    const [FM, setFM] = useState(false)
    const [CS, setCS] = useState(false)
    const [Economics, setEconomics] = useState(false)
    const [History, setHistory] = useState(false)
    const [Biology, setBiology] = useState(false)
    const [Psychology, setPsychology] = useState(false)
    const [Physics, setPhysics] = useState(false)
    const [Politics, setPolitics] = useState(false)
    const [Music, setMusic] = useState(false)
    const [RE, setRE] = useState(false)
    const [chatting, setChatting] = useState(false)
    const [university, setUniversity] = useState(false)
    const [alevel, setALevel] = useState(false)
    const [gcse, setGCSE] = useState(false)
    const [football, setFootball] = useState(false)
    const [thoughts, setThoughts] = useState(false)
    const [sixth, setSixth] = useState(false)

    const breakpoint = 1024;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);

    


    const handleSubmit = () => {


        if (roomName.trim().length) { //Checking if room name is not empty

                let tags = { //Temporary object to store current option by user
                    Math: Math,
                    English: English,
                    Geography: Geography,
                    FM: FM,
                    CS: CS,
                    Economics: Economics,
                    History: History,
                    Biology: Biology,
                    Psychology: Psychology,
                    Physics: Physics,
                    Politics: Politics,
                    Music: Music,
                    RE: RE,
                    Chatting:chatting,
                    University: university,
                    "A-Level": alevel,
                    GCSE: gcse,
                    Football: football,
                    "Thoughts?": thoughts,
                    "Sixth Form": sixth
                }
    
                let chosenArray = Object.keys(tags).filter((e)=>tags[e]) //Filtering array to only show tags which are true
    
                const data = { //Creating an object to send to db
                    CreatedByID: info.id,
                    CreatedByName: info.name,
                    CreatedByImage: info.image,
                    Tags: chosenArray,
                    Deleted: false,
                    Title: roomName,
                    Question: roomQuestion,
                    Answered: false
                }
        
                axios({ //Uploadinf room options to the database
                    method: `POST`,
                    url: `http://localhost:5000/chat/new`,
                    headers: { "x-auth-token": `${token}` },
                    data: data
                })
                .then((res) => {
                    if (res.data.msg === "Room name already exists") {
                        setRoomExists(true)
                        document.querySelector('.input_field').value = "" //Clearing input
                    } else {
                        setRoomExists(false)
                        history.push({ //Redirecting user to the page of the room created
                            pathname: `/Chat/${res.data._id}`
                        })
                    }
                })
                .catch((error) => {
                    console.log('error: ', error);
                })    
        } 
    }

    if(screenWidth >=breakpoint){
        return (
            <div className="section">
                <div className="section-holder">
                    <div className="title">
                        <div className="home">
                            <Link to="/">
                                <img id="arrow" src={backA} alt=""/>
                            </Link>
                        </div>
                    </div>

                    <div className="inputs">
                        <input type="input" className="input_field" onChange={(event) => setRoomName(event.target.value)} required id="name" placeholder={roomExists ? "Room Already Exists  - ( Max 30 )" : "Room Name - ( Max 30 )"} maxLength="30" autoComplete="off"/>
                        <div className="text-counter">
                            {30 - roomName.length}
                        </div>
                        <input type="input" className="input_field" autoComplete="off" id="question" placeholder="Room Question" onChange={(event) => setRoomQuestion(event.target.value)} placeholder="Room Question - (Max 150)" maxLength="150" required />
                        <div className="text-counter">
                            {150 - roomQuestion.length}
                        </div>
                    </div>
                    <div className="boxes">
                        <div className="box-holder">
                                    <div className={Math ? "tag selected" : "tag"} onClick={() => setMath(!Math)}>#Math</div>
                                    <div className={English ? "tag selected" : "tag"} onClick={() => setEnglish(!English)}>#English</div>
                                    <div className={Geography ? "tag selected" : "tag"} onClick={() => setGeography(!Geography)}>#Geography</div>
                                    <div className={FM ? "tag selected" : "tag"} onClick={() => setFM(!FM)}>#FM</div>
                                    <div className={CS ? "tag selected" : "tag"} onClick={() => setCS(!CS)}>#CS</div>
                                    <div className={Economics ? "tag selected" : "tag"} onClick={() => setEconomics(!Economics)}>#Economics</div>
                                    <div className={History ? "tag selected" : "tag"} onClick={() => setHistory(!History)}>#History</div>
                                    <div className={Biology ? "tag selected" : "tag"} onClick={() => setBiology(!Biology)}>#Biology</div>
                                    <div className={Psychology ? "tag selected" : "tag"} onClick={() => setPsychology(!Psychology)}>#Psychology</div>
                                    <div className={Physics ? "tag selected" : "tag"} onClick={() => setPhysics(!Physics)}>#Physics</div>
                                    <div className={Politics ? "tag selected" : "tag"} onClick={() => setPolitics(!Politics)}>#Politics</div>
                                    <div className={Music ? "tag selected" : "tag"} onClick={() => setMusic(!Music)}>#Music</div>
                                    <div className={RE ? "tag selected" : "tag"} onClick={() => setRE(!RE)}>#RE</div>
                                    <div className={chatting ? "tag selected" : "tag"} onClick={() => setChatting(!chatting)}>#Chatting</div>
                                    <div className={university ? "tag selected" : "tag"} onClick={() => setUniversity(!university)}>#University</div>
                                    <div className={alevel ? "tag selected" : "tag"} onClick={() => setALevel(!alevel)}>#A-Level</div>
                                    <div className={gcse ? "tag selected" : "tag"} onClick={() => setGCSE(!gcse)}>#GCSE</div>
                                    <div className={football ? "tag selected" : "tag"} onClick={() => setFootball(!football)}>#Football</div>
                                    <div className={thoughts ? "tag selected" : "tag"} onClick={() => setThoughts(!thoughts)}>#Thoughts?</div>
                                    <div className={sixth ? "tag selected" : "tag"} onClick={() => setSixth(!sixth)}>#Sixth_Form</div>
                        </div>
                    </div>
                    <div className="submit">
                        <div className="BTN" onClick={() => handleSubmit()}>
                            <h3>Create</h3>
                        </div>
                    </div>
    
                </div>
            </div>
        )
    }else{
        return(
            null
        )
    }

    
}

export default CreateRoom
