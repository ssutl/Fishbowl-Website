import React, { useContext, useEffect, useState } from "react";
import '../Styling/ProfileBar.css'
import { GoogleLogout } from 'react-google-login';
import { UserContext } from "../Context/CurrentUser";

function ProfileBar() {
    const responseGoogle = (response) => {
        console.log(response);
      }

      const info = useContext(UserContext)
      console.log('stuff: ', info);
      
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
                    className="Logout of account"
                    clientId="939358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com"
                    buttonText="Logout of Account"
                    onLogoutSuccess={responseGoogle}
                    >
                    </GoogleLogout>
                </div>
            </div>
        </div>
    )
}

export default ProfileBar
