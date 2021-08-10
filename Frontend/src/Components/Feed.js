import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/CurrentUser";
import '../Styling/Feed.css'
import AddIcon from '@material-ui/icons/Add';
import '../Styling/Feed.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

function Feed({ input, followR, dashboard, roomCreated }) {



    // console.log('search: ', input.search);
    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')
    const [allRooms, setAllRooms] = useState([])
    const [friendFeed, setFriendFeed] = useState(false)
    const [feed, setFeed] = useState(true)
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState()
    const breakpoint = 768;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);

    let friends_rooms = []

    const [name, setName] = useState('')





    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            url: `http://localhost:5000/chat/get`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            setAllRooms(res.data.reverse())
        })

        axios({
            method: "GET", //Getting the users the current user follows
            url: `http://localhost:5000/users/get/${info.name}`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            setFollowing(response.data[0].following)
            setLoading(false)
        }).catch((error) => {
            console.log('error: ', error);

        })
    }, [followR, dashboard, roomCreated])

    if (loading === false) {
        allRooms.map((room) => {
            if (following.includes(room.CreatedByName)) {
                friends_rooms.push(room)
            }
        })
    }

    const override = css`
    position: absolute;
    width: 200px;
    top: 50%;
    right:45%;
  `;


    return (
        <div className="feed-section">
            <div className="top">
                <div className="holder">
                    <div className="feed-BTN">
                        <p className={feed ? "active" : "normal"} onClick={() => {
                            setFeed(true);
                            setFriendFeed(false)
                        }}>Global Feed</p>
                        <p className={friendFeed ? "active" : "normal"} onClick={() => {
                            setFeed(false);
                            setFriendFeed(true)

                        }}>Friends</p>
                    </div>
                    <Link to={{ pathname: `/Create/${info.name}` }}>
                        <div className="create-BTN">
                            <AddIcon />
                            {screenWidth < breakpoint ? null : <p>New Room</p>}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="bottom-section">
                <div className="scroll">
                    {allRooms == null || friends_rooms == null ? <BarLoader color={"#FFFFFF"} css={override} size={300} /> : feed ? allRooms.length === 0 ? <h1>No Global Rooms</h1>
                        : (allRooms.filter((chat) => {

                            return (
                                chat.Title.toUpperCase().includes(input.toUpperCase()) ||
                                chat.Question.toUpperCase().includes(input.toUpperCase())

                            );
                        }).map((room, index) => {
                            return (
                                <Link to={{ pathname: `/Chat/${room.Title}`, state: { room } }} className="link" key={index}>
                                    <div className={following.includes(room.CreatedByName) ? "room-holder-friend" : "room-holder"} key={index}>
                                        <div className="top-section">
                                            <p id="Title">{room.Title}</p>
                                            <p id="Question">{room.Question.substring(0, 70)} ....</p>
                                        </div>
                                        <div className="low-section">
                                            <div className="low-holder">
                                                {Object.keys(room.Tags).filter(k => room.Tags[k]).map((tag, index) => {
                                                    return <div className="roomTag" key={index}>{tag}</div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })) : friends_rooms.length === 0 ? <h1>Cureently have np friends</h1> : (
                            friends_rooms.filter((chat) => {

                                return (
                                    chat.Title.toUpperCase().includes(input.toUpperCase()) ||
                                    chat.Question.toUpperCase().includes(input.toUpperCase())

                                );
                            }).map((room, index) => {
                                return (
                                    <Link to={{ pathname: `/Chat/${room.Title}`, state: { room } }} className="link" key={index}>
                                        <div className="room-holder-friend" key={index}>
                                            <div className="top-section">
                                                <p id="Title">{room.Title}</p>
                                                <p id="Question">{room.Question.substring(0, 70)} ....</p>
                                            </div>
                                            <div className="low-section">
                                                <div className="low-holder">
                                                    {Object.keys(room.Tags).filter(k => room.Tags[k]).map((tag, index) => {
                                                        return <div className="roomTag" key={index}>{tag}</div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })

                        )}
                </div>
            </div>

        </div>
    )
}

export default Feed;
