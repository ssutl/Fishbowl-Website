import React, {useState, useEffect} from 'react'
import '../Styling/ChatRoom.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import PublishIcon from '@material-ui/icons/Publish';

function ChatRoom() {
    const { state } = useLocation();
    let current_page = useLocation().pathname.split("/").pop();
    const token = localStorage.getItem('session-token')

    const [room,setRoom] = useState(null)
    console.log('room: ', room);


    useEffect(()=>{
        axios({
            method:'GET',
            url: `http://localhost:5000/chat/get/Title/${current_page}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            setRoom(res.data[0])
        })
    },[state])

    const override = css`
    position: absolute;
    width: 200px;
    top: 50%;
    left:45%;
  `;

    return (room !== null?
        <div className="chat-room-section">
            <div className="chat-room-holder">
                <div className="question">
                    <p id="title">{room.Title}</p>
                    <p id="question">{room.Question}</p>



                </div>
                <div className="messaging">

                </div>
                <div className="chat-bar">
                    <input type="text" className="input" placeholder="Respond to question"></input>
                    <div className="send"><p>Send</p><PublishIcon id="upload"/></div>
                </div>

            </div>
            
        </div>:
        <BarLoader color={"#FFFFFF"} css={override} size={300} />
    )
}

export default ChatRoom
