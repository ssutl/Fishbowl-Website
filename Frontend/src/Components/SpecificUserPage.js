import React, { useContext, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "../Styling/specificUserPage.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function SpecificUserPage() {
    const { state } = useLocation();
    const token = localStorage.getItem('session-token')


    const[usersRooms,setUsersRooms] = useState(null)


    useEffect(()=>{
        axios({
            method:'GET',
            url: `http://localhost:5000/chat/get/${state.user._id}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            setUsersRooms(res.data)
        })
    },[state])

    const handleFollow = () =>{
        
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
                        <div className="follow-BTN" onClick={handleFollow}>
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
                                                                return <div className="roomTag">{tag}</div>
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
