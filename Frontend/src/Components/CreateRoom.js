import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/CurrentUser";
import '../Styling/CreateRoom.css'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


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
    const [reminder, setReminder] = useState(false)
    const [homework, setHomework] = useState(false)
    const [event, setEvent] = useState(false)
    const [test, setTest] = useState(false)
    const [holiday, setHoliday] = useState(false)
    const [trainingDay, setTrainingDay] = useState(false)
    const [noSchool, setNoSchool] = useState(false)
    const [gcse, setGCSE] = useState(false)
    const [football, setFootball] = useState(false)
    const [thoughts, setThoughts] = useState(false)
    const [sixth, setSixth] = useState(false)
    const [createChatRoom, setCreateChatRoom] = useState(true)
    console.log('createChatRoom: ', createChatRoom);
    const [createPost, setCreatePost] = useState(false)
    console.log('createPost: ', createPost);

    const breakpoint = 1200;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);

    


    const handleSubmit = () => {


        if (roomName.trim().length) { //Checking if room name is not empty

            if(createChatRoom){
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
                    url: `https://fishbowl-heroku.herokuapp.com/chat/new`,
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
            }else if(createPost){
                let tags = { //Temporary object to store current option by user
                    Reminder: reminder,
                    Homework: homework,
                    Event: event,
                    Test: test,
                    Holiday: holiday,
                    "Training Day": trainingDay,
                    "No School": noSchool
                }
    
                let chosenArray = Object.keys(tags).filter((e)=>tags[e]) //Filtering array to only show tags which are true
    
                const data = { //Creating an object to send to db
                    CreatedByName: info.name,
                    CreatedByImage: info.image,
                    Tags: chosenArray,
                    Deleted: false,
                    Title: roomName,
                    Question: roomQuestion,
                    Answered: false,
                    Post: true
                }
        
                axios({ //Uploadinf room options to the database
                    method: `POST`,
                    url: `https://fishbowl-heroku.herokuapp.com/chat/new`,
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
    }

    if(screenWidth >=breakpoint){
        return (
            <div className="section">
                <div className="section-holder">
                    <div className="title">
                        <div className="home">
                            <Link to="/">
                                <KeyboardBackspaceIcon id="arrow" style={{ fontSize: 40 }} />
                            </Link>
                            <Link to="/">
                                <h2>Home</h2>
                            </Link>
                        </div>
                        <div className="posterOrChatHolder">
                            <p  className={createChatRoom? null : "notActive"} onClick={()=> {
                                setCreateChatRoom(true)
                                setCreatePost(false)
                                }}>Chat Room</p>
                            <p className={createPost? null : "notActive"} onClick={()=> {
                                setCreatePost(true);
                                setCreateChatRoom(false)
                                }}>Post</p>
                        </div>
                    </div>

                    <div className="inputs">
                        <input type="input" className="input_field" onChange={(event) => setRoomName(event.target.value)} required id="name" placeholder={createChatRoom? roomExists ? "Room Already Exists  - ( Max 30 )" : "Room Name - ( Max 30 )": createPost? roomExists? "Post Title Already Exists" : "Post Title - ( Max 30 )" : null} maxLength="30" autoComplete="off"/>
                        <div className="text-counter">
                            {30 - roomName.length}
                        </div>
                        <input type="input" className="input_field" autoComplete="off" id="question" placeholder="Room Question" onChange={(event) => setRoomQuestion(event.target.value)} placeholder={createChatRoom? "Room Question - (Max 150)" : createPost? "Enter Topic Of Post - (Max 150)" :null} maxLength="150" required />
                        <div className="text-counter">
                            {150 - roomQuestion.length}
                        </div>
                    </div>
                    <div className="boxes">
                        <div className="box-holder">
                            {createChatRoom?(
                                <>
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
                                </>
                            ):(
                                <>
                                <div className={reminder ? "tag selected" : "tag"} onClick={() => setReminder(!reminder)}>#Reminder</div>
                                <div className={homework ? "tag selected" : "tag"} onClick={() => setHomework(!homework)}>#Homework</div>
                                <div className={event ? "tag selected" : "tag"} onClick={() => setEvent(!event)}>#Event</div>
                                <div className={noSchool ? "tag selected" : "tag"} onClick={() => setNoSchool(!noSchool)}>#No_School</div>
                                <div className={trainingDay ? "tag selected" : "tag"} onClick={() => setTrainingDay(!trainingDay)}>#Training_Day</div>
                                <div className={holiday ? "tag selected" : "tag"} onClick={() => setHoliday(!holiday)}>#Holiday</div>
                                <div className={test ? "tag selected" : "tag"} onClick={() => setTest(!test)}>#Test</div>
                                </>
                            )}
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
