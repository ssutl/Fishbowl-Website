import React, { useContext, useState, useEffect} from "react";
import { UserContext } from "../Context/CurrentUser";
import '../Styling/Feed.css'
import AddIcon from '@material-ui/icons/Add';
import '../Styling/Feed.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

function Feed(input) {
    console.log('search: ', input.search);
    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')
    const [allRooms, setAllRooms] = useState(null)
    const [friendFeed,setFriendFeed] = useState(false)
    const [feed,setFeed] = useState(true)

    const [name,setName] = useState('')

    

    useEffect(()=>{
        axios({
            method:'GET',
            url: `https://chat-app-mongo-uk.herokuapp.com/chat/get`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            setAllRooms(res.data.reverse())
        })
    },[])

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
                        {allRooms === null? <BarLoader color={"#FFFFFF"} css={override} size={300} />: allRooms.filter((chat)=>{
                            
                            return(
                                chat.Title.toUpperCase().includes(input.search.toUpperCase()) ||
                                chat.Question.toUpperCase().includes(input.search.toUpperCase()) 

                            );
                        }).map((room, index)=>{
                                return(
                                    <Link to={{pathname:`/Chat/${room.Title}`, state:{room}}} className="link" key={index}>
                                        <div className="room-holder" key={index}>
                                            <div className="top-section">
                                                <p id="Title">{room.Title}</p>
                                                <p id="Question">{room.Question.substring(0,70)} ....</p>
                                            </div>
                                            <div className="low-section">
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
    )
}

export default Feed;
