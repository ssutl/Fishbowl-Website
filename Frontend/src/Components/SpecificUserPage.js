import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Context/CurrentUser";
import { ReactComponent as YourSvg } from '../svg/Void.svg';

import "../Styling/specificUserPage.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useHistory } from 'react-router-dom';


function SpecificUserPage({ specificUserToParent }) {

    const history = useHistory();
    const [following, setFollowing] = useState()
    const breakpoint = 1024;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { state } = useLocation(); //Next users business
    console.log('state: ', state);
    const info = useContext(UserContext) //Current Logged in users business
    const token = localStorage.getItem('session-token')
    console.log('token: ', token);
    const [usersRooms, setUsersRooms] = useState([])
    console.log('usersRooms: ', usersRooms);
    let mypage = state.user.username === info.name;

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);


    
    /**
     * ============================================================================================
     * On page load we gather the information of current users page: Their rooms, name, image etc
     * ============================================================================================
     */
    useEffect(() => {
        let isMounted = true;

        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get/specificUserRoom/${state.user.id}`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            if(isMounted){
                setUsersRooms(res.data.reverse())
            }
        }).catch((err)=>{
            console.log(err)
        })

        axios({ //Checking if logged in user is following the user which has been clicked
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/users/get/${info.id}`,
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

    /**
     * ============================================================================================
     * On page load we gather the information of current users page: Their rooms, name, image etc
     * ============================================================================================
     */


    /**
     * =========================
     * Handling user interaction
     * =========================
     */


     useEffect(() => { //Passing a flage to middle.js to indicate the user has made a new interaction
        let isMounted = true;

        if(isMounted){
            specificUserToParent(following)
        }

        return () => { isMounted = false };
    }, [following]) 

    const handleInteract = () => {
        setFollowing(!following) //Interaction flag changes whenever a user follows or unfollows
        requests()
    }

    
    /**
     * =====================================
     * Interaction API request - Un/Follow
     * =====================================
     */
    const requests = () => {
        if (!following) { //If not following make them follow
            axios({
                method: 'PUT',
                url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.id}`,
                headers: { "x-auth-token": `${token}` },
                data: { following: state.user.username }
            }).then((res) => {
            }).catch((err)=>{
                console.log('err: ', err);
            })
        } else if (following) { //If following make the unfollow
            axios({
                method: 'PUT',
                url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.id}`,
                headers: { "x-auth-token": `${token}` },
                data: { unfollowing: state.user.username }
            }).then((res) => {
            }).catch((err)=>{
                console.log('err: ', err);
            })
        }
    }

    /**
     * =====================================
     * Interaction API request - Un/Follow
     * =====================================
     */

    /**
     * =========================
     * Handling user interaction
     * =========================
     */



    const deleteRoom = (data) =>{
        console.log('data: ', data);
        data[0].preventDefault() //Preventing it from redirecting to room

        axios({
            method: 'DELETE',
            url: `https://fishbowl-heroku.herokuapp.com/chat/delete/id/${data[1]}`, //Deleting room clicked on
            headers: { "x-auth-token": `${token}` },
        }).then((res) => {
            refreshRooms() //Refreshing feed
        }).catch((err)=>{
            console.log('err: ', err);
        })
    }

    const refreshRooms = () =>{ //Function to update users room feed
        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get/specificUserRoom/${state.user.id}`,
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
                        <img referrerpolicy="no-referrer" src={state.user.image} alt="" />
                    </div>
                    {mypage ? usersRooms.length === 0 ? (
                        <div className="follow-my-section"></div>
                    ) : (
                        <div className="follow-my-section">
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
                                        <Link to= {{ pathname: `/Chat/${room._id}`, state: { room } }} className="link1" key={index}>
                                            <div className="usersRooms" key={index}>
                                                <div className="upper">
                                                    <p id="Title">{room.Title}</p>
                                                    <p id="Question">{room.Question.length >= 105? room.Question.substring(0, 105) + `...` : room.Question}</p>
                                                </div>
                                                <div className="lower">
                                                    <div className="low-holder">
                                                    {room.Tags.map((tag, index) => {
                                                        return <div className="roomTag" key={index}>{tag}</div>
                                                    })}
                                                    </div>
                                                    {mypage?(
                                                        <div className="delete">
                                                            <div className="delete-icon-holder" onClick={(event)=>deleteRoom([event, room._id])}>
                                                                <DeleteIcon/>
                                                            </div>
                                                        </div>
                                                    ):null}
                                                </div>
                                                {room.Answered? (
                                                        <div className="answered">
                                                            <div className="dot">
                                                                <p>Answered</p>
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
