import React, { useContext} from "react";
import '../Styling/ProfileBar.css'
import { GoogleLogout } from 'react-google-login';
import { UserContext } from "../Context/CurrentUser";
import axios from 'axios';

function ProfileBar() {

      const info = useContext(UserContext)

      

      const logout = () =>{

        axios({ //On logout changing users status to offline
            method:`PUT`,
            url: `http://localhost:5000/users/update/${info.id}`,
            data: {"online":false}
        }).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.log("error", error)
        })
      }
      
    return (
        <div className="profile-holder">
            <div className="profile-container">
                <div className="profile">
                    <div className="upper-profile">
                        <div className="left">
                            <div className="image-holder">
                                <img src={info.image} className="image" alt=""></img>
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
            
        </div>
    )
}

export default ProfileBar
