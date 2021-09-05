import React, { useEffect, useContext, useState } from "react";
import '../Styling/NavBar.css'
import axios from 'axios';
import { UserContext } from "../Context/CurrentUser";
import { Link } from "react-router-dom";
import mainLogo from '../svg/fish-bowl.png';
import BarLoader from "react-spinners/BarLoader";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";


function NavBar({ profileData, followReq }) {
    const info = useContext(UserContext)
    const token = localStorage.getItem('session-token')
    const [users, setUsers] = useState([])
    const [following, setFollowing] = useState()
    let list = []
    const [loading, setLoading] = useState()
    const breakpoint = 1200;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const resize = () => {
        setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);

    /**
     * ==============================================
     * Interval to update status of users in navbar
     * ==============================================
     */


    useEffect(() => {
        let isMounted = true;

        if(isMounted){
            setLoading(true)
            getFollowing()

            const interval = setInterval(() => { //Set interval will allow user to to see status updates
                    getFollowing()
            }, 6000)
            return () => clearInterval(interval);
        }
        return () => { isMounted = false };
    }, [profileData, followReq])

    if (loading === false) {
            users.map((user) => {
                if (following.includes(user.username)) {
                    list.push(user)
                }
            })
    }


    const getFollowing = () => {
        axios({ //Getting all users on the site
            method: "GET",
            url: `https://fishbowl-heroku.herokuapp.com/users/get`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            setUsers(response.data.reverse()) //Setting state with current info
        }).catch((error) => {
            console.log('error: ', error);

        })

        axios({
            method: "GET", //Getting the users the current user follows to filter 
            url: `https://fishbowl-heroku.herokuapp.com/users/get/${info.name}`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            setFollowing(response.data[0].following)  //Setting state with current info
            setLoading(false)
        }).catch((error) => {
            console.log('error: ', error);
        })
    }

    /**
     * ==============================================
     * Interval to update status of users in navbar
     * ==============================================
     */









    const override = css`
    position: absolute;
    width: 200px;
    top: 50%;
    left:10%;
  `;
    const underride = css`
    position: absolute;
    width: 200px;
    top: 50%;
    left:15%;
  `;


    if (screenWidth >= breakpoint) {
        return (
            <div className="nav-holder">
                <div className="logo">
                    <Link to="/">
                        <img src={mainLogo} />
                        <h1>Fishbowl</h1>
                    </Link>
                </div>
                <div className="home-btn">

                </div>
                <div className="people-holder">
                    <div className="upper">
                        <h1>Friends</h1>
                        <h2>People</h2>
                    </div>
                    <div className={list.length === 0 || list == null ? "lower-set" : "lower"}>
                        {loading?(
                            <FadeLoader color={"#FFFFFF"} size={50} css={underride} />
                        ):
                        list.length === 0 || list == null && following.length === 0 ? (
                            <>
                                <p>Connect With Friends</p>
                                <p id="small">Start by searching for a friends name in the searchbar</p>
                            </>
                        ) : list.length === 0 && following.length !== 0 ? (
                            <BarLoader color={"#FFFFFF"} size={300} css={override} />
                        ) :
                            list.filter((newUser) => {
                                return newUser.username !== info.name
                            }).map((user, index) => {
                                return (
                                    <div className="user-holder" key={index}>
                                        <Link to={{ pathname: `/People/${user.username}`, state: { user: user } }} key={index}>
                                            <div className="circle">
                                                <img src={user.image} referrerpolicy="no-referrer" alt=""></img>
                                            </div>
                                            <div className={user.status === "Online" ? "online-circle" : user.status === "Offline" ? "offline-circle" : user.status === "Busy" ? "busy-circle" : user.status === "Idle" ? "idle-circle" : "empty"}>

                                                <div className="pop-up">{user.status}</div>
                                            </div>
                                            <p>{screenWidth < 1024 ? user.username.substring(0, 5) + ' ..' : user.username}</p>
                                        </Link>
                                    </div>
                                )
                            })}

                    </div>
                </div>
            </div >
        )
    } else{
        return (
            null
        )
    }
}

export default NavBar
