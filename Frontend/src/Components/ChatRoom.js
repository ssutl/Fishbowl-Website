import React, { useState, useEffect, useContext } from 'react'
import '../Styling/ChatRoom.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { UserContext } from "../Context/CurrentUser";
import { css } from "@emotion/react";
import PublishIcon from '@material-ui/icons/Publish';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory } from 'react-router-dom';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from "react-router-dom";
// import { io } from "socket.io-client";
import useChat from './UseChat'



function ChatRoom() {
    const history = useHistory();
    const info = useContext(UserContext)
    let current_page = useLocation().pathname.split("/").pop();
    const token = localStorage.getItem('session-token')
    const [room, setRoom] = useState(null)
    const [editing, setEditing] = useState(false)
    const [editedQuestion, setEditedQuestion] = useState("")
    const [editedName, setEditedName] = useState("")
    const [answered, setAnswered] = useState()
    const [empty, setEmpty] = useState()
    let current_date = new Date()
    let current_year = current_date.getFullYear()
    let current_month = current_date.getMonth()
    let current_day = current_date.getDate()
    let current_hour = current_date.getHours()
    const breakpoint = 768;
    const desktop_breakpoint = 1248;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);

    //Socketss
    const { roomId } = current_page;
    const { messages, sendMessage } = useChat(roomId);


    const [newMessage, setNewMessage] = useState()
    const [roomSavedMsgs, setRoomSavedMsgs] = useState()



    useEffect(() => { //Setting Room messages whenever page refreshes
        axios({
            method: `GET`,
            url: `https://fishbowl-heroku.herokuapp.com/chat/get/Title/${current_page}`,
            headers: { "x-auth-token": `${token}` },
        }).then((res) => {
            setRoomSavedMsgs(res.data[0].Messages);

        }).catch((error) => {
            console.log("error", error)
        })
    }, [current_page])




    const handleSendMessage = () => {
        if (newMessage.length !== 0) {
            sendMessage(newMessage);
            setNewMessage("");

            const data = {
                text: newMessage,
                sentBy: info.name,
                sentByImage: info.image,
                date: { year: current_date.getFullYear(), month: current_date.getMonth(), day: current_date.getDate(), hour: current_date.getHours() },
                likes: []
            }

            axios({
                method: `PUT`,
                url: `https://fishbowl-heroku.herokuapp.com/chat/update/${current_page}`,
                headers: { "x-auth-token": `${token}` },
                data: { message: data }
            }).then((res) => {
                console.log('res: ', res);

            }).catch((error) => {
                console.log("error", error)
            })
            document.querySelector('.input').value = ''
        } else {
            setEmpty(true)
        }
    }







    //Initial Room Data Grab
    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get/Title/${current_page}`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            setRoom(res.data[0]);
            setAnswered(res.data[0].Answered)
        })

    }, [])

    const userPage = () => {
        axios({
            method: "GET",
            url: `https://fishbowl-heroku.herokuapp.com/users/get/${room.CreatedByName}`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            history.push({
                pathname: `/People/${room.CreatedByName}`,
                state: { user: response.data[0] }
            })
        }).catch((error) => {
            console.log("error:", error)
        })

    }


    const updateQuestion = () => {
        setEditing(false)
        if (editedQuestion.length && editedName.length > 0) {
            axios({
                method: `PUT`,
                url: `https://fishbowl-heroku.herokuapp.com/chat/update/${current_page}`,
                headers: { "x-auth-token": `${token}` },
                data: { Question: editedQuestion, Title: editedName }
            }).then((res) => {
                redirect()
            }).catch((error) => {
                console.log("error", error)
            })
        }
    }

    const redirect = () => {
        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get/Title/${editedName}`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            setRoom(res.data[0]);
            history.push({
                pathname: `/Chat/${editedName}`,
                state: { room: res.data[0] }
            })

        })

    }





    const override = css`
    position: absolute;
    width: 200px;
    top: 50%;
    left:45%;
  `;
    const response = css`
    position: absolute;
    width: 200px;
    top: 50%;
    left:30%;
  `;

    useEffect(() => {
        axios({
            method: 'PUT',
            url: `https://fishbowl-heroku.herokuapp.com
/chat/update/${current_page}`,
            headers: { "x-auth-token": `${token}` },
            data: { Answered: answered }
        }).then((res) => {
            console.log('res: ', res);

        })

    }, [answered])



    return (room !== null ?
        <div className="chat-room-section">
            <div className="chat-room-holder">
                <div className="navbar">
                    <div className="home">
                        <Link to="/">
                            <KeyboardBackspaceIcon id="arrow" style={{ fontSize: 40 }} />
                        </Link>
                        {screenWidth < breakpoint ? null : (
                            <Link to="/">
                                <h2>Home</h2>
                            </Link>
                        )}
                    </div>

                    <div className={room.CreatedByName === info.name ? "group" : "group-without"}>
                        <div className="answered-block">
                            {answered ? (
                                <>
                                    <CheckCircleIcon style={{ fontSize: 30 }} id="completeIcon" />
                                    <h3>Answered</h3>
                                </>
                            ) : null}
                        </div>
                        <div className="room-options">
                            {editing ? (
                                room.CreatedByName === info.name ? (
                                    <>
                                        <div className="edit" onClick={() => setEditing(!editing)}><EditIcon /></div>
                                        <div className="secondBTN" onClick={updateQuestion}><PublishIcon /></div>
                                    </>
                                ) : null
                            ) : (
                                <>
                                    {room.CreatedByName === info.name ? (
                                        <>
                                            <div className="edit" onClick={() => setEditing(!editing)}><EditIcon /></div>
                                            <div className={answered ? "secondBTN answered" : "secondBTN"} onClick={() => setAnswered(!answered)}><CheckCircleIcon /></div>
                                        </>
                                    ) : null}
                                </>
                            )}
                        </div>

                    </div>



                </div>
                <div className="scrollable">

                    <div className="question">
                        {editing ? (
                            <>
                                <input type="input" className="input_field" onChange={(event) => setEditedName(event.target.value)} required id="name" placeholder={`${room.Title} - (Max 30)`} maxLength="30" />
                                <div className="text-counter">
                                    {30 - editedName.length}
                                </div>
                                <input type="input" className="input_field" id="Q" placeholder={`${room.Question} - (Max 150)`} onChange={(event) => setEditedQuestion(event.target.value)} required />
                                <div className="text-counter">
                                    {150 - editedQuestion.length}
                                </div>
                            </>
                        ) : (
                            <>
                                <p id="title">{room.Title}</p>
                                <p id="question">{room.Question}</p>
                                <p id="creation" onClick={userPage}>Created by {room.CreatedByName.toUpperCase()}</p>

                            </>
                        )}
                    </div>
                    {messages === undefined ? (<BarLoader color={"#FFFFFF"} css={override} size={300} />) : messages.slice(0).reverse().map((liveMessage, index) => (
                        <div className="msg" key={index}>
                            <div className="top">
                                <Link>
                                    <img src={liveMessage.sentByImage} alt="" />
                                    <h2>{liveMessage.sentBy}</h2>
                                </Link>
                                <p>{`· ${current_year === liveMessage.date.year ? current_month === liveMessage.date.month ? current_day === liveMessage.date.day ? current_hour === liveMessage.date.hour ? `<1h` : current_hour - liveMessage.date.hour + `h` : current_day - liveMessage.date.day + `d` : current_month - liveMessage.date.month + `m` : current_year - liveMessage.date.year + `y`}`}</p>
                            </div>
                            <div className="middle">
                                <p>{liveMessage.text}</p>
                            </div>
                            <div className="bottom"></div>
                        </div>
                    ))}
                    {roomSavedMsgs === undefined ? (<BarLoader color={"#FFFFFF"} css={override} size={300} />) : roomSavedMsgs.slice(0).reverse().map((savedMessage, index) => (
                        <div className="msg" key={index}>
                            <div className="top">
                                <Link>
                                    <img src={savedMessage.sentByImage} alt="" />
                                    <h2>{savedMessage.sentBy}</h2>
                                </Link>
                                <p>{`· ${current_year === savedMessage.date.year ? current_month === savedMessage.date.month ? current_day === savedMessage.date.day ? current_hour === savedMessage.date.hour ? `<1h` : current_hour - savedMessage.date.hour + `h` : current_day - savedMessage.date.day + `d` : current_month - savedMessage.date.month + `m` : current_year - savedMessage.date.year + `y`}`}</p>
                            </div>
                            <div className="middle">
                                <p>{savedMessage.text}</p>
                            </div>
                            <div className="bottom"></div>
                        </div>
                    ))}
                </div>


                <div className="chat-bar">
                    <input type="text" className="input" id="myInput" placeholder={empty ? "Enter Something" : "Respond to question"} onChange={(event) => setNewMessage(event.target.value)} required></input>
                    <div className="send" onClick={handleSendMessage}><p>Send</p><PublishIcon id="upload" /></div>
                </div>

            </div>
        </div> :
        <BarLoader color={"#FFFFFF"} css={screenWidth < desktop_breakpoint ? response : override} size={300} />
    )
}

export default ChatRoom



