import React, { useContext, useEffect, useState } from "react";
import '../Styling/ProfileBar.css'
import { GoogleLogout } from 'react-google-login';
import { UserContext } from "../Context/CurrentUser";

function ProfileBar() {

      const info = useContext(UserContext)
      console.log('stuff: ', info.image);

      const logout = () =>{
          
      }
      
    return (
        <div className="profile-holder">
            <div className="profile">
                <div className="upper-profile">
                    <div className="left">
                        <div className="image-holder">
                            <img src={info.image} className="image"></img>
                        </div>
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
        </div>
    )
}

export default ProfileBar
