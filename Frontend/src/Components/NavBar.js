import React, { useEffect, useContext, useState } from "react";
import '../Styling/NavBar.css'
import axios from 'axios';
import { UserContext } from "../Context/CurrentUser";
import { Link } from "react-router-dom";
import mainLogo from'../svg/fish-bowl.png';

function NavBar() {
    

    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')
    const [users, setUsers] = useState("")
    const [following, setFollowing] = useState("")


    useEffect(()=>{
        axios({
        method:"GET",
        url: `https://chat-app-mongo-uk.herokuapp.com/users/get`,
        headers: {"x-auth-token":`${token}`}
        }).then((response)=>{
            setUsers(response.data)
        }).catch((error)=>{
            console.log('error: ', error);
                
        })

        axios({
        method:"GET",
        url: `https://chat-app-mongo-uk.herokuapp.com/users/get/${info.name}`,
        headers: {"x-auth-token":`${token}`}
        }).then((response)=>{
            setFollowing(response.data[0].following)
        }).catch((error)=>{
            console.log('error: ', error);
        })
    },[])



    


    return (
        <div className="nav-holder">
            <div className="logo">
                <Link to="/">
                    <img src={mainLogo}/>
                    <h1>Fishbowl</h1>
                </Link>
            </div>
            <div className="home-btn">

            </div>
            <div className="people-holder">
                <div className="upper">
                    <h1>People</h1>
                    <h2>Online</h2>
                </div>
                <div className={users.length === 0?"lower-set":"lower"}>
                    {users.length === 0? (
                        <>
                            <p>Connect With Friends</p>
                            <p id="small">Start by searching for a friends name in the searchbar</p>
                        </>
                    ) : 
                    users.filter((newUser)=>{
                        return newUser.username !== info.name
                    }).map((user,index)=>{
                        return(
                                <div className="user-holder" key={index}>
                                   <Link to={{pathname: `/People/${user.username}`, state:{user: user}}} key={index}>
                                        <div className="circle">
                                            <img src={user.image} alt=""></img>
                                        </div>  
                                        <div className={user.online?"online-circle":"offline-circle"}>
                                        </div>  
                                        <p>{user.username}</p>  
                                    </Link>
                                </div>  
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default NavBar
