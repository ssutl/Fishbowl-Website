import React, { useContext, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Context/CurrentUser";
import { ReactComponent as YourSvg } from '../svg/Void.svg';

import "../Styling/specificUserPage.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function SpecificUserPage() {
    const { state } = useLocation(); //Next users business
    console.log('state: ', state);
    const info = useContext(UserContext) //Current Logged in users business
    console.log('info: ', info);

    
    const token = localStorage.getItem('session-token')


    const[usersRooms,setUsersRooms] = useState([])
    console.log('usersRooms: ', usersRooms);
    const [following,setFollowing] = useState()
    console.log('following: ', following);


    useEffect(()=>{ //On page load get the rooms of the user clicked on
        axios({
            method:'GET',
            url: `http://localhost:5000
/chat/get/${state.user.username}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            setUsersRooms(res.data.reverse())
        })

        axios({ //Checking if logged in user is following the user which has been clicked
            method:'GET',
            url: `http://localhost:5000
/users/get/${info.name}`,
            headers: {"x-auth-token":`${token}`}
        }).then((res)=>{
            if(res.data[0].following.includes(state.user.username)){
                setFollowing(true)
            }else{
                setFollowing(false)
            }
        })

    },[state])

    


    const handleInteract = () =>{
        setFollowing(!following)
        requests()
    }

    const requests = () =>{
        if(!following){
            axios({
                method:'PUT',
                url: `http://localhost:5000
/users/update/${info.name}`,
                headers: {"x-auth-token":`${token}`},
                data: {following: state.user.username}
            }).then((res)=>{
                console.log(res)
            })
        }else if(following){
            axios({
                method:'PUT',
                url: `http://localhost:5000
/users/update/${info.name}`,
                headers: {"x-auth-token":`${token}`},
                data: {unfollowing: state.user.username}
            }).then((res)=>{
                console.log('res: ', res);
               
            })
        }
    }

    let mypage = state.user.username === info.name;
    console.log('mypage: ', mypage);

        
        


        


    return (
        
        <div className="section2">
            <div className="holder">
                    <div className="banner">
                    </div>
                    <div className="imageHolder">
                        <img src={state.user.image} alt=""/>
                    </div>
                    {mypage?usersRooms.length === 0?(
                        <div className="follow-my-section"></div>
                    ):(
                        <div className="follow-my-section">
                            <p>My Rooms</p>
                        </div>
                    ):(
                        <div className="follow-section">
                            <div className={following?"following-BTN":"follow-BTN"} onClick={handleInteract}>
                                <PersonAddIcon id=""/>
                                {following?<p>Following</p>:<p>Follow</p>}
                            </div>
                            <p>{usersRooms.length === 0? null: `${state.user.username}'s Room's`}</p>
                        </div>
                    )}
                    <div className="specificFeedHolder">
                        <div className={usersRooms.length === 0?"svg":"scrollUser"}>
                                {usersRooms.length === 0? (
                                    <>
                                        <div className="titlo"><h1>{mypage?`YOU HAVE NO ROOMS`:`${state.user.username.toUpperCase()} HAS NO ROOMS`}</h1></div>
                                        <div className="svg"><YourSvg id="svg"/></div>
                                    </>
                                ): usersRooms.map((room, index)=>{
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
