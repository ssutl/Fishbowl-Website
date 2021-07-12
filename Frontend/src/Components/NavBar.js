import React, { useEffect, useContext, useState } from "react";
import '../Styling/NavBar.css'
import axios from 'axios';
import { UserContext } from "../Context/CurrentUser";
import { Link } from "react-router-dom";

function NavBar() {
    const info = useContext(UserContext)
    const [users, setUsers] = useState("")

    useEffect(()=>{
        axios({
        method:"GET",
        url: "http://localhost:5000/users/get",
        }).then((response)=>{
            setUsers(response.data)
        }).catch((error)=>{
            console.log("error:", error)
        })
    },[])
    


    return (
        <div className="nav-holder">
            <div className="people-holder">
                <div className="upper">
                    <h1>People</h1>
                    <h2>Online</h2>
                </div>
                <div className="lower">
                    {users.length === 0? <h1>Empty</h1> : 
                    users.filter((newUser)=>{
                        return newUser.username !== info.name
                    }).map((user,index)=>{
                        return(
                            <Link to={`/people/${user._id}`} >
                                <div className="user-holder" key={index}>
                                    <div className="circle">
                                        <img src={user.image}></img>
                                    </div>  
                                    <p>{user.username}</p>  
                                </div>
                            </Link>
                                
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default NavBar
