import React, {useState, useEffect, useContext} from 'react'
import '../Styling/ChatRoom.css'
import { Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { UserContext } from "../Context/CurrentUser";
import { css } from "@emotion/react";
import PublishIcon from '@material-ui/icons/Publish';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from "react-router-dom";


function ChatRoom() {
    const history = useHistory();
    const info = useContext(UserContext)
    let current_page = useLocation().pathname.split("/").pop();
    const token = localStorage.getItem('session-token')
    const [room,setRoom] = useState(null)
    const [editing,setEditing] = useState(false)
    const [editedQuestion, setEditedQuestion] = useState()
    const [editedName, setEditedName] = useState()
    const [answered, setAnswered] = useState()


    

    

    //Initial Room Data Grab
    useEffect(()=>{
        axios({
            method:'GET',
            url: `https://chat-app-mongo-uk.herokuapp.com/chat/get/Title/${current_page}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            setRoom(res.data[0]);
            setAnswered(res.data[0].Answered)
            // setSavedMsg(res.data[0].Messages.reverse())
        })

    },[])

    const updateQuestion = () =>{
        setEditing(false)
        axios({
            method:`PUT`,
            url: `https://chat-app-mongo-uk.herokuapp.com/chat/update/${current_page}`,
            headers: {"x-auth-token":`${token}`},
            data: {Question: editedQuestion, Title:editedName}
        }).then((res)=>{
            redirect()
        }).catch((error)=>{
            console.log("error", error)
        })
          
      }
    
      const redirect = () =>{
        axios({
            method:'GET',
            url: `https://chat-app-mongo-uk.herokuapp.com/chat/get/Title/${editedName}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            setRoom(res.data[0]);
            history.push({
                pathname: `/Chat/${editedName}`,
                state: {room: res.data[0]}
            })
    
        })
    
      }
    
      useEffect(()=>{
        axios({
            method:'PUT',
            url: `https://chat-app-mongo-uk.herokuapp.com/chat/update/${current_page}`,
            headers: {"x-auth-token":`${token}`},
            data: {Answered: answered}
        }).then((res)=>{
            console.log('res: ', res);
    
        })
    
        },[answered])



    const override = css`
    position: absolute;
    width: 200px;
    top: 50%;
    left:45%;
  `;



    return (room !== null?
        <div className="chat-room-section">
            <div className="chat-room-holder">
                <div className="navbar">
                    <div className="home">
                        <Link to="/">
                            <KeyboardBackspaceIcon id="arrow" style={{ fontSize: 40 }} />
                        </Link>
                        <Link to="/">
                            <h2>Home</h2>
                        </Link>
                    </div>
                        
                    <div className={room.CreatedById === info.id?"group":"group-without"}>
                        <div className="answered-block">
                                {answered?(
                                    <>
                                        <CheckCircleIcon style={{ fontSize: 30 }} id="completeIcon"/>
                                        <h3>Answered</h3>
                                    </>
                                ):null}
                        </div> 
                        <div className="room-options">
                            {editing?(
                                room.CreatedById === info.id?(
                                        <>
                                            <div className="edit" onClick={()=>setEditing(!editing)}><EditIcon/></div>
                                            <div className="secondBTN" onClick={updateQuestion}><PublishIcon/></div>
                                        </>
                                ):null
                            ):(
                                <>
                                    {room.CreatedById === info.id?(
                                        <>
                                            <div className="edit" onClick={()=>setEditing(!editing)}><EditIcon/></div>
                                            <div className={answered?"secondBTN answered":"secondBTN"} onClick={()=>setAnswered(!answered)}><CheckCircleIcon/></div>
                                        </>
                                    ):null}
                                </>
                            )}
                        </div> 
        
                    </div>
                            
                    
                    
                </div>

                <div className="question">
                    {editing?(
                        <>
                            <input type="input" className="input_field" onChange={(event)=>setEditedName(event.target.value)} required id="name" placeholder={room.Title} />
                            <input type="input"  className="input_field" id="Q" placeholder={room.Question} onChange={(event)=>setEditedQuestion(event.target.value)} required/>
                        </>
                    ):(
                        <>
                            <p id="title">{room.Title}</p>
                            <p id="question">{room.Question}</p>
                            
                        </>
                    )}
                </div>
                <div className="messaging">
                    

                </div>
                <div className="chat-bar">
                    <input type="text" className="input" id="myInput" placeholder="Respond to question" onChange=""></input>
                    <div className="send" onClick=""><p>Send</p><PublishIcon id="upload"/></div>
                </div>

            </div>
        </div>:
        <BarLoader color={"#FFFFFF"} css={override} size={300} />
    )
}

export default ChatRoom



