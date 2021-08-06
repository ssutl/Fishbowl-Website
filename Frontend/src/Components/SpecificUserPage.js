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
            url: `https://chat-app-mongo-uk.herokuapp.com/chat/get/${state.user.username}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            setUsersRooms(res.data.reverse())
        })

        axios({
            method:'GET',
            url: `https://chat-app-mongo-uk.herokuapp.com/users/get/${info.name}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            if(res.data[0].following.includes(state.user.username)){
                setFollowing(true)
            }else{
                setFollowing(false)
            }
        })

    },[state])



    useEffect(()=>{

        if(following){
            axios({
                method:'PUT',
                url: `https://chat-app-mongo-uk.herokuapp.com/users/update/${info.name}`,
                headers: {"x-auth-token":`${token}`},
                data: {following: state.user.username}
            }).then((res)=>{
                console.log(res)
            })
        }else{
            axios({
                method:'PUT',
                url: `https://chat-app-mongo-uk.herokuapp.com/users/update/${info.name}`,
                headers: {"x-auth-token":`${token}`},
                data: {unfollowing: state.user.username}
            }).then((res)=>{
                console.log('res: ', res);
               
            })
        }
        

    },[following])

        


    return (
        
        <div className="section2">
            <div className="holder">
                    <div className="banner">
                    </div>
                    <div className="imageHolder">
                        <img src={state.user.image} alt=""/>
                    </div>
                    <div className="follow-section">
                        <div className={following?"following-BTN":"follow-BTN"} onClick={()=>setFollowing(!following)}>
                            <PersonAddIcon id=""/>
                            {following?<p>Following</p>:<p>Follow</p>}
                        </div>
                    </div>
                    <div className="specificFeedHolder">
                        <div className="scrollUser">
                            {usersRooms === null? <h1>No Current Rooms</h1>: usersRooms.map((room, index)=>{
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
