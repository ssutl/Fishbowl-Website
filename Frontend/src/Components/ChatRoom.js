import React, {useState, useEffect} from 'react'
import '../Styling/ChatRoom.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import PublishIcon from '@material-ui/icons/Publish';
import useChat from "../Components/useChat";

function ChatRoom() {
    const { state } = useLocation();
    let current_page = useLocation().pathname.split("/").pop();
    console.log('current_page: ', current_page);
    const token = localStorage.getItem('session-token')

    const [room,setRoom] = useState(null)

    
    const {roomId}  = current_page; // Gets roomId from URL
    // console.log('roomId: ', roomId);
    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    console.log('messages: ', messages);
    
    const [newMessage, setNewMessage] = useState(""); // Message to be sent



    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
      };
    
      const handleSendMessage = () => {

        axios({
            method:`PUT`,
            url: `http://localhost:5000/chat/update/${current_page}`,
            headers: {"x-auth-token":`${token}`},
            data: {newMessage}
        }).then((res)=>{
            setRoom(res.data[0])
        })

        sendMessage(newMessage);
        document.querySelector(".input").value=""
      };


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
                    {messages.map((message, i) => (
                        <div className={message.ownedByCurrentUser ? "my-message" : "received-message"}>
                            {message.body}
                        </div>
                    ))}
                </div>
                <div className="chat-bar">
                    <input type="text" className="input" placeholder="Respond to question" onChange={handleNewMessageChange}></input>
                    <div className="send" onClick={handleSendMessage}><p>Send</p><PublishIcon id="upload"/></div>
                </div>

            </div>
            
        </div>:
        <BarLoader color={"#FFFFFF"} css={override} size={300} />
    )
}

export default ChatRoom
