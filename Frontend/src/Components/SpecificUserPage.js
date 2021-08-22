import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Context/CurrentUser";
import { ReactComponent as YourSvg } from '../svg/Void.svg';

import "../Styling/specificUserPage.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function SpecificUserPage({ specificUserToParent }) {
    const [following, setFollowing] = useState()
    const breakpoint = 1200;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);


    useEffect(() => {
        specificUserToParent(following)
    }, [following])



    const { state } = useLocation(); //Next users business
    const info = useContext(UserContext) //Current Logged in users business


    const token = localStorage.getItem('session-token')


    const [usersRooms, setUsersRooms] = useState([])



    useEffect(() => { //On page load get the rooms of the user clicked on
        let isMounted = true;

        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get/${state.user.username}`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            if(isMounted){
                setUsersRooms(res.data.reverse())
            }
        })

        axios({ //Checking if logged in user is following the user which has been clicked
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/users/get/${info.name}`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            if(isMounted){
                if (res.data[0].following.includes(state.user.username)) {
                    setFollowing(true)
                } else {
                    setFollowing(false)
                }
            }
        })
        return () => { isMounted = false };

    }, [state])




    const handleInteract = () => {
        setFollowing(!following)
        requests()
    }

    const requests = () => {
        if (!following) {
            axios({
                method: 'PUT',
                url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.name}`,
                headers: { "x-auth-token": `${token}` },
                data: { following: state.user.username }
            }).then((res) => {
            }).catch((err)=>{
                console.log('err: ', err);
            })
        } else if (following) {
            axios({
                method: 'PUT',
                url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.name}`,
                headers: { "x-auth-token": `${token}` },
                data: { unfollowing: state.user.username }
            }).then((res) => {

            }).catch((err)=>{
                console.log('err: ', err);
            })
        }
    }

    let mypage = state.user.username === info.name;


    const deleteRoom = (data) =>{
        data[0].preventDefault()

        axios({
            method: 'DELETE',
            url: `https://fishbowl-heroku.herokuapp.com/chat/delete/id/${data[1]}`,
            headers: { "x-auth-token": `${token}` },
        }).then((res) => {
            refreshRooms()
        }).catch((err)=>{
            console.log('err: ', err);
        })


    }

    const refreshRooms = () =>{
        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get/${state.user.username}`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
                setUsersRooms(res.data.reverse())
        })
    }



    if(screenWidth >= breakpoint){
        return (

            <div className="section2">
                <div className="holder">
                    <div className="banner">
                        <h1>{state.user.username}</h1>
                    </div>
                    <div className="imageHolder">
                        <img src={state.user.image} alt="" />
                    </div>
                    {mypage ? usersRooms.length === 0 ? (
                        <div className="follow-my-section"></div>
                    ) : (
                        <div className="follow-my-section">
                            <p>My Rooms</p>
                        </div>
    
                    ) : (
                        <div className="follow-section">
                            <div className={following ? "following-BTN" : "follow-BTN"} onClick={handleInteract}>
                                <PersonAddIcon id="" />
                                {following ? <p>Following</p> : <p>Follow</p>}
                            </div>
                        </div>
                    )}
                    <div className="specificFeedHolder">
                        <div className={usersRooms.length === 0 ? "svg" : "scrollUser"}>
                            {usersRooms.length === 0 ? (
                                <>
                                    <div className="titlo"><h1>{mypage ? `YOU HAVE NO ROOMS` : `FRIEND HAS NO ROOMS`}</h1></div>
                                    <div className="svg"><YourSvg id="svg" /></div>
                                </>
                            ) : usersRooms.map((room, index) => {
                                return (
                                    <Link to={{ pathname: `/Chat/${room._id}`, state: { room } }} className="link1" key={index}>
                                        <div className="usersRooms" key={index}>
                                            <div className="upper">
                                                <p id="Title">{room.Title}</p>
                                                <p id="Question">{room.Question.substring(0, 70)}...</p>
                                            </div>
                                            <div className="lower">
                                                <div className="low-holder">
                                                    {Object.keys(room.Tags).filter(k => room.Tags[k]).map((tag, index) => {
                                                        return <div className="roomTag" key={index}>{tag}</div>
                                                    })}
                                                </div>
                                            </div>
                                            {mypage?(
                                                    <div className="delete" onClick={(event)=>deleteRoom([event, room._id])}>
                                                        <div className="delete-icon-holder">
                                                        <DeleteIcon/>
    
                                                        </div>
                                                    </div>
                                                ):null}
                                        </div>
                                    </Link>
                                )
                            })}
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

export default SpecificUserPage
