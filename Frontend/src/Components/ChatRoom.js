import React, {useState, useEffect, useContext} from 'react'
import '../Styling/ChatRoom.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { UserContext } from "../Context/CurrentUser";
import { css } from "@emotion/react";
import PublishIcon from '@material-ui/icons/Publish';
import useChat from "../Components/useChat";

function ChatRoom() {
    const { state } = useLocation();
    const info = useContext(UserContext)
    let current_page = useLocation().pathname.split("/").pop();
    console.log('current_page: ', current_page);
    const token = localStorage.getItem('session-token')

    const [room,setRoom] = useState(null)
    console.log('room: ', room);
    
    // const [savedMsg, setSavedMsg] = useState()

    
    const {roomId}  = current_page; // Gets roomId from URL
    // console.log('roomId: ', roomId);
    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    
    const [newMessage, setNewMessage] = useState(""); // Message to be sent
    console.log('newMessage: ', newMessage);

    


    let current = new Date()

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
      };
    
      const handleSendMessage = () => {
          
          const data = {
              sentBy: info.name,
              message: newMessage,
              image: info.image,
              date: current.getDate() + "-" + (current.getMonth()+1) + "-" + current.getFullYear(),
              time: current.getHours() + ":" + current.getMinutes()
          }

        axios({
            method:`PUT`,
            url: `http://localhost:5000/chat/update/${current_page}`,
            headers: {"x-auth-token":`${token}`},
            data: {data}
        }).then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log("error", error)
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
            setRoom(res.data[0]);
            // setSavedMsg(res.data[0].Messages.reverse())
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
                    
                    {room.Messages.map((msg)=>(
                        <div className={msg.sentBy === info.name? "my-message": "received-message"}>
                            <div className="info">
                                <div className="circle">
                                    <img src={msg.image}/>
                                </div>    
                                <div className="userName"><p>{msg.sentBy}</p></div> 
                                <div className="date"><p>Date: {msg.date}</p></div>
                                <div className="time"><p>Time: {msg.time}</p></div>
                            </div>    
                            <div className="reply">
                                <p>{msg.message}</p>
                            </div>    
                        </div>
                    ))}
                    {messages.map((message, i) => (
                        <div className={"my-message"}>
                            <div className="info">
                                <div className="circle">
                                    <img src={info.image}/>
                                </div>   
                                <div className="date"><p>Date: {current.getDate() + "-" + (current.getMonth()+1) + "-" + current.getFullYear()} </p></div>
                                <div className="time"><p>Time: {current.getHours() + ":" + current.getMinutes()}</p></div>
                            </div>    
                            <div className="reply">
                                <p>{message.body}</p>
                            </div>  
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
