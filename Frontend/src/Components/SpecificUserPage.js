import React, { useContext, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Context/CurrentUser";

import "../Styling/specificUserPage.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function SpecificUserPage() {
    const { state } = useLocation();
    const info = useContext(UserContext)
    console.log('state: ', state);
    const token = localStorage.getItem('session-token')


    const[usersRooms,setUsersRooms] = useState(null)
    const [following,setFollowing] = useState()


    useEffect(()=>{
        axios({
            method:'GET',
            url: `http://localhost:5000/chat/get/${state.user._id}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            setUsersRooms(res.data)
        })

        axios({
            method:'GET',
            url: `http://localhost:5000/users/get/${info.name}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            if(res.data[0].following.includes(state.user.username)){
                setFollowing(true)
            }else{
                setFollowing(false)
            }
        })

    },[state])

    const handleFollow = () =>{

        // axios({
        //     method:'PUT',
        //     url: `http://localhost:5000/users/update/${info.id}`,
        //     headers: {"x-auth-token":`${token}`},
        //     data: {following: state.user.username}
        // }).then((res)=>{
        //     console.log(res)
        // })

        // axios({
        //     method:'GET',
        //     url: `http://localhost:5000/users/get/${info.name}`,
        //     headers: {"x-auth-token":`${token}`}
        // }).then((res)=>{
        //     if(res.data[0].following.includes(state.user.username)){
        //         setFollowing(true)
        //     }else{
        //         setFollowing(false)
        //     }
        // })

    }
        


    return (
        
        <div className="section2">
            <div className="holder">
                    <div className="banner">
                    </div>
                    <div className="imageHolder">
                        <img src={state.user.image} alt=""/>
                    </div>
                    <div className="follow-section">
                        <div className={following?"following-BTN":"follow-BTN"} onClick={handleFollow}>
                            <PersonAddIcon id=""/>
                            <p>Follow</p>
                        </div>
                    </div>
                    <div className="specificFeedHolder">
                        <div className="scrollUser">
                            {usersRooms === null? <h1>No Current Rooms</h1>: usersRooms.reverse().map((room, index)=>{
                                        return(
                                            <Link to={{pathname:`/Chat/${room.Title}`, state:{room}}} className="link1" key={index}>
                                                <div className="usersRooms" key={index}>
                                                    <div className="upper">
                                                        <p id="Title">{room.Title}</p>
                                                        <p id="Question">{room.Question.substring(0,70)}</p>
                                                    </div>
                                                    <div className="lower">
                                                        <div className="low-holder">
                                                            {Object.keys(room.Tags).filter(k => room.Tags[k]).map((tag,index)=>{
                                                                return <div className="roomTag" key={index}>{tag}</div>
                                                                })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                        </div>
                    </div>
            </div>
            
        </div>
    )
}

export default SpecificUserPage
