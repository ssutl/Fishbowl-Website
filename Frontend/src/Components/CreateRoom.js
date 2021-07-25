import React, { useState, useContext } from "react";
import { UserContext } from "../Context/CurrentUser";
import '../Styling/CreateRoom.css'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CreateRoom() {
    const history = useHistory();
    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')

    const [roomExists, setRoomExists] = useState(false)


        const handleSubmit = () => {

            if(roomName.trim().length){
                console.log("name is valid")

                axios({
                    method:`POST`,
                    url: `http://localhost:5000/chat/new`,
                    headers: {"x-auth-token":`${token}`},
                    data:{
                        CreatedById: info.id,
                        Tags:{
                            Math:Math,
                            English:English,
                            Geography:Geography,
                            FM:FM,
                            CS:CS,
                            Economics:Economics,
                            History:History,
                            Biology:Biology,
                            Psychology:Psychology,
                            Physics:Physics,
                            Polotics:Polotics,
                            Music:Music,
                            RE:RE
                        },
                        Deleted: false,
                        Title:roomName,
                        Question: roomQuestion
                    }
                })
                .then((res)=>{
                    if(res.data.msg === "Room name already exists"){
                        setRoomExists(true)
                    }else{
                        setRoomExists(false)
                        history.push(`/Chat/${roomName}`)
                    }
                    
                })
                .catch((error)=>{
                    console.log("error", error)
                })

            }else{
                console.log("name is invalid")
            }

        }

    const [roomName, setRoomName] = useState("")
    console.log('roomName: ', roomName);
    const [roomQuestion, setRoomQuestion] = useState("")
    console.log('roomQuestion: ', roomQuestion);
    const [Math,setMath] = useState(false)
    console.log('Math: ', Math);
    const [English,setEnglish] = useState(false)
    const [Geography,setGeography] = useState(false)
    const [FM,setFM] = useState(false)
    const [CS,setCS] = useState(false)
    const [Economics,setEconomics] = useState(false)
    const [History,setHistory] = useState(false)
    const [Biology,setBiology] = useState(false)
    const [Psychology,setPsychology] = useState(false)
    const [Physics,setPhysics] = useState(false)
    const [Polotics,setPolotics] = useState(false)
    const [Music,setMusic] = useState(false)
    const [RE,setRE] = useState(false)

    return (
        <div className="section">
            <div className="section-holder">
                <div className="title">
                    
                </div>
                <div className="inputs">
                    <input type="input" className={roomExists?"input_field exists":"input_field"} onChange={(event)=>setRoomName(event.target.value)} required id="name" placeholder="Room Name" />
                    <input type="input"  className="input_field" id="question" placeholder="Room Question" onChange={(event)=> setRoomQuestion(event.target.value)} required/>
                </div>
                <div className="boxes">
                    <div className="box-holder">
                        <div className={Math?"tag selected":"tag"} onClick={()=>setMath(!Math)}>#Math</div>
                        <div className={English?"tag selected":"tag"} onClick={()=>setEnglish(!English)}>#English</div>
                        <div className={Geography?"tag selected":"tag"} onClick={()=>setGeography(!Geography)}>#Geography</div>
                        <div className={FM?"tag selected":"tag"} onClick={()=>setFM(!FM)}>#FM</div>
                        <div className={CS?"tag selected":"tag"} onClick={()=>setCS(!CS)}>#CS</div>
                        <div className={Economics?"tag selected":"tag"} onClick={()=>setEconomics(!Economics)}>#Economics</div>
                        <div className={History?"tag selected":"tag"} onClick={()=>setHistory(!History)}>#History</div>
                        <div className={Biology?"tag selected":"tag"} onClick={()=>setBiology(!Biology)}>#Biology</div>
                        <div className={Psychology?"tag selected":"tag"} onClick={()=>setPsychology(!Psychology)}>#Psychology</div>
                        <div className={Physics?"tag selected":"tag"} onClick={()=>setPhysics(!Physics)}>#Physics</div>
                        <div className={Polotics?"tag selected":"tag"} onClick={()=>setPolotics(!Polotics)}>#Polotics</div>
                        <div className={Music?"tag selected":"tag"} onClick={()=>setMusic(!Music)}>#Music</div>
                        <div className={RE?"tag selected":"tag"} onClick={()=>setRE(!RE)}>#RE</div>
                    </div>
                </div>
                <div className="submit">
                    <div className="BTN" onClick={()=>handleSubmit()}>
                        <h3>Create</h3>
                    </div>
                </div>
                 
            </div>
        </div>
    )
}

export default CreateRoom
