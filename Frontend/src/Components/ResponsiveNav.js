import React, { useContext, useState, useEffect } from "react";
import '../Styling/ResponsiveNav.css'
import { Link } from "react-router-dom";
import { UserContext } from "../Context/CurrentUser";
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import axios from 'axios';





function ResponsiveNav({ profileData, followReq }) {

    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')
    const history = useHistory();
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState()
    const [following, setFollowing] = useState()
    const breakpoint = 1248;
    const tablet_breakpoint = 768;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);


    let list = []


    useEffect(() => {
        let isMounted = true;

        setLoading(true)
        axios({ //Getting all users on the site
            method: "GET",
            url: `https://fishbowl-heroku.herokuapp.com/users/get`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            if(isMounted){
                setUsers(response.data)
            }
        }).catch((error) => {
            console.log('error: ', error);

        })


        axios({
            method: "GET", //Getting the users the current user follows
            url: `https://fishbowl-heroku.herokuapp.com/users/get/${info.name}`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            if(isMounted){
                setFollowing(response.data[0].following)
                setLoading(false)
            }
        }).catch((error) => {
            console.log('error: ', error);

        })

        return () => { isMounted = false };
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
            <div className="main">
                <div className="nav-scroll">
                    <Link to={{ pathname: `/People/${info.name}`, state: { user: user } }} >
                        <div className="circle">
                            <img src={info.image} alt=""></img>
                        </div>
                        <div className={info.online ? "online-circle" : "offline-circle"}>
                        </div>
                    </Link>
                    <Link to="/" className="home" id="home">
                        <p>Feed</p>
                    </Link>
                    <div className="friend">
                        <p className="friend-text">Friends <ArrowRightAltIcon style={screenWidth < tablet_breakpoint ? { fontSize: 35 } : { fontSize: 40 }} /></p>
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
