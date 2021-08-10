import React, { useContext, useState, useEffect } from "react";
import '../Styling/ResponsiveNav.css'
import { Link } from "react-router-dom";
import { UserContext } from "../Context/CurrentUser";
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import axios from 'axios';





function ResponsiveNav({ profileData, followReq }) {

    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')
    const history = useHistory();
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState()
    const [following, setFollowing] = useState()
    const breakpoint = 1248;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);


    let list = []


    useEffect(() => {
        setLoading(true)
        axios({ //Getting all users on the site
            method: "GET",
            url: `http://localhost:5000/users/get`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.log('error: ', error);

        })


        axios({
            method: "GET", //Getting the users the current user follows
            url: `http://localhost:5000/users/get/${info.name}`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            setFollowing(response.data[0].following)
            setLoading(false)
        }).catch((error) => {
            console.log('error: ', error);

        })
    }, [profileData, followReq])

    if (loading === false) {
        users.map((user) => {
            if (following.includes(user.username)) {
                list.push(user)
            }
        })

    }



    let user = { //Creating object for when user clicks their own profile
        email: info.email,
        id: info.id,
        image: info.image,
        username: info.name
    }

    const logout = () => {

        axios({ //On logout changing users status to offline
            method: `PUT`,
            url: `http://localhost:5000/users/update/${info.name}`,
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
            <div className="main">
                <div className="nav-scroll">
                    <Link to="/" className="buttons" id="home">
                        <p>Home</p>
                    </Link>
                    <Link to={{ pathname: `/People/${user.name}`, state: { user: user } }} className="buttons">
                        <p>Something</p>
                    </Link>
                    <Link to={{ pathname: `/People/${info.name}`, state: { user: user } }} >
                        <div className="circle">
                            <img src={info.image} alt=""></img>
                        </div>
                        <div className={info.online ? "online-circle" : "offline-circle"}>
                        </div>
                    </Link>
                    <p className="friend-text">Friends</p>


                    <div className="friend-holder">
                        {list.filter((newUser) => {
                            return newUser.username !== info.name
                        }).map((user, index) => {
                            return (
                                <div className="user-holder" key={index}>
                                    <Link to={{ pathname: `/People/${user.username}`, state: { user: user } }} key={index}>
                                        <div className="circle">
                                            <img src={user.image} alt=""></img>
                                        </div>
                                        <div className={user.online ? "online-circle" : "offline-circle"}>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div className="logout">
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

    } else {
        return (
            null
        )
    }


}

export default ResponsiveNav
