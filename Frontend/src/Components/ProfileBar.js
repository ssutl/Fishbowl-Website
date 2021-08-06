import React, { useContext, useState} from "react";
import '../Styling/ProfileBar.css'
import { useLocation } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from "../Context/CurrentUser";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function ProfileBar() {
    const history = useHistory();
    let current_page = useLocation().pathname.split("/").pop();
    let current = useLocation().pathname.split("/").slice(-2)[0];
      const info = useContext(UserContext)
      const token = localStorage.getItem('session-token')

      

      const logout = () =>{
        //   console.log("hello")

        axios({ //On logout changing users status to offline
            method:`PUT`,
            url: `https://chat-app-mongo-uk.herokuapp.com/users/update/${info.id}`,
            headers: {"x-auth-token":`${token}`},
            data: {"online":false}
        }).then((response)=>{
            history.go(0)
        }).catch((error)=>{
            console.log('error: ', error);
            
        })
      }
      
    return (
        <div className="profile-holder">
            <div className="profile">
                <div className="upper-profile">
                    <div className="left">
                        <Link to={{pathname: `/${info.name}`, state:{info}}}>
                            <div className="image-holder">
                                <img src={info.image} className="image" alt=""></img>
                            </div>
                        </Link>
                    </div>
                    <div className="right">
                        <p className="name">{info.name}</p>
                        <p className="email">@{info.email}</p>
                    </div>
                </div>
                <div className="lower-profile">
                    <GoogleLogout
                    clientId="939358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    >
                    </GoogleLogout>
                </div>
            </div>
            <div className="noti">
                <div className="dashboard">
                    <p>Dashboard Panel</p>
                </div>
                {current_page ===""?<h1>dashboard</h1>:current === "Chat"?<h1>Chat Room</h1>:null}

            </div>
        </div>
    )
}

export default ProfileBar
