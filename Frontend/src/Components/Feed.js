import React, { useContext, useState, useEffect} from "react";
import { UserContext } from "../Context/CurrentUser";
import '../Styling/Feed.css'
import AddIcon from '@material-ui/icons/Add';
import '../Styling/Feed.css'
import { Link } from "react-router-dom";
import axios from 'axios';

function Feed() {
    const info = useContext(UserContext)
    const [allRooms, setAllRooms] = useState(null)

    const [friendFeed,setFriendFeed] = useState(false)
    
    const [feed,setFeed] = useState(true)

    

    useEffect(()=>{
        axios({
            method:'GET',
            url: `http://localhost:5000/chat/get`
        }).then((res)=>{
            setAllRooms(res.data)
        })
    },[])

    return (
        <div className="feed-section">
                <div className="top-section">
                    <div className="holder">
                        <div className="feed-BTN">
                            <p onClick={()=>{
                                setFeed(true);
                                setFriendFeed(false)
                            }}>Your Feed</p>
                            <p onClick={()=>{
                                setFeed(false);
                                setFriendFeed(true)
                            }}>Friends</p>
                        </div>
                        <Link to={{pathname:`/Create/${info.name}`}}>
                            <div className="create-BTN">
                                <AddIcon/>
                                <p>New Room</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="bottom-section">
                    <div className="scroll">
                        {allRooms === null? <h1>No Current Rooms</h1>: allRooms.reverse().map((room, index)=>{
                                return(
                                    <Link to={{pathname:`/Chat/${room.Title}`, state:{room}}} className="link" key={index}>
                                        <div className="room-holder" key={index}>
                                            <div className="top-section">
                                                <p id="Title">{room.Title}</p>
                                                <p id="Question">{room.Question.substring(0,70)}</p>
                                                
                                            </div>
                                            <div className="low-section">
                                                
                                            </div>        
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                </div>

        </div>
    )
}

export default Feed;
