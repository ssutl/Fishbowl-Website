import React, { useState } from "react";
import '../Styling/CreateRoom.css'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';


function CreateRoom() {
    const history = useHistory();
    const info = useContext(UserContext)

    const handleSubmit = () => {
        axios({
            method:`POST`,
            data:{
                
            }
        })
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
                    <h1>Create Room</h1>
                </div>
                <form className="form">
                    <div className="inputs">
                        <div className="upper">
                            <div className="roomInput">
                                <div className="name">
                                    <h3>Room Name</h3>

                                </div>
                                <div className="input">
                                    <textarea type="text" placeholder="Room Name" className="inputField" onChange={(event)=>setRoomName(event.target.value)} required/>

                                </div>
                            </div>
                            <div className="roomInput">
                                <div className="name">
                                    <h3>Room Question</h3>

                                </div>
                                <div className="input">
                                    <textarea type="text" placeholder="Room Question" className="inputField" onChange={(event)=> setRoomQuestion(event.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        <div className="lower">
                            <div className="tags">
                                <div className="titleB">
                                    <h3>Choose Tags</h3>
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

                            </div>
                        </div>
                    </div>
                    <div className="upload">
                        <input type="submit" id="uploadBtn">

                        </input>
                        {/* <Link to={`/Chat/${roomName}`}> */}
                            <label htmlFor="uploadBtn" className="uploadLabel" onClick={handleSubmit()}>
                                <h2>Create</h2>
                            </label>
                        {/* </Link> */}
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default CreateRoom
