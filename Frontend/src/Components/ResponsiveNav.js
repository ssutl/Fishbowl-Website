import React, { useState, useContext } from 'react'
import '../Styling/ResponsiveNav.css'
import { Link } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';
import { UserContext } from "../Context/CurrentUser";
import { useHistory } from 'react-router-dom';


import axios from 'axios';




function ResponsiveNav() {
    const breakpoint = 1248;
    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')
    const history = useHistory();



    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
        // console.log("window.innerWidth: ", window.innerWidth);
    };

    window.addEventListener("resize", resize);

    const logout = () => {

        axios({ //On logout changing users status to offline
            method: `PUT`,
            url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.name}`,
            headers: { "x-auth-token": `${token}` },
            data: { "online": false }
        }).then((response) => {
            history.go(0)
        }).catch((error) => {
            console.log('error: ', error);

        })
    }


    if (screenWidth < breakpoint) {
        return (
            <div className="nav">
                <Link to="/">
                    <p>Home</p>
                </Link>
                <Link>
                    <p>My Page</p>
                </Link>
                <GoogleLogout
                    clientId="939358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                >
                </GoogleLogout>
            </div>
        )
    } else {
        return (
            null
        )
    }

}

export default ResponsiveNav
