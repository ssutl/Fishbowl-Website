import React, { useContext, useState, useEffect } from "react";
import '../Styling/ProfileBar.css'
import { useLocation } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from "../Context/CurrentUser";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


function ProfileBar({ profileToParent, search }) {
    const [flag, setFlag] = useState(false) //Whenever user follows another user flag is set and state is passed to navbar so it knows when to refresh data


    useEffect(() => {
        profileToParent(flag)
    }, [flag])

    let profileSearch = search
    let current_page = useLocation().pathname.split("/").pop();
    let current = useLocation().pathname.split("/").slice(-2)[0];

    const info = useContext(UserContext)

    const history = useHistory();
    const token = localStorage.getItem('session-token')
    const [searching, setSearching] = useState(false)
    const chatroom = current === "Chat";
    const dashboard = current_page === "" && !searching;
    const userSearch = current_page === "" && searching
    const [users, setUsers] = useState('')
    const [following, setFollowing] = useState()
    const [status, setStatus] = useState('')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const breakpoint = 1248;

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);








    useEffect(() => { //Setting searching state whenever search value is larger than 0
        setSearching(profileSearch.length > 0)
    }, [profileSearch])

    const updateStatus = (recievedStatus) => {
        axios({
            method: 'PUT',
            url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.name}`,
            headers: { "x-auth-token": `${token}` },
            data: { status: recievedStatus }
        }).then((res) => {
            setStatus(recievedStatus)
        }).catch((error) => {
            console.log('error: ', error);
        })
    }






    useEffect(() => { //Recieving users for the dashboard
        axios({
            method: "GET",
            url: "https://fishbowl-heroku.herokuapp.com/users/get",
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.log('error: ', error);

        })

        axios({
            method: "GET",
            url: `https://fishbowl-heroku.herokuapp.com/users/get/${info.name}`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            setFollowing(response.data[0].following)
            setStatus(response.data[0].status)
        }).catch((error) => {
            console.log('error: ', error);

        })


    }, [current_page])

    const getFollowing = () => {
        axios({
            method: "GET",
            url: `https://fishbowl-heroku.herokuapp.com/users/get/${info.name}`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            setFollowing(response.data[0].following)
        }).catch((error) => {
            console.log('error: ', error);

        })
    }


    const requests = (userID, value) => {
        if (value) {
            axios({
                method: 'PUT',
                url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.name}`,
                headers: { "x-auth-token": `${token}` },
                data: { following: userID }
            }).then((res) => {
                getFollowing()
                setFlag(!flag)
            }).catch((error) => {
                console.log('error: ', error);

            })
        } else if (!value) {
            axios({
                method: 'PUT',
                url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.name}`,
                headers: { "x-auth-token": `${token}` },
                data: { unfollowing: userID }
            }).then((res) => {
                getFollowing()
                setFlag(!flag)
            }).catch((error) => {
                console.log('error: ', error);

            })
        }
    }




    const logout = () => {

        axios({ //On logout changing users status to offline
            method: `PUT`,
            url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.name}`,
            headers: { "x-auth-token": `${token}` },
            data: { status: status }
        }).then((response) => {
            history.go(0)
        }).catch((error) => {
            console.log('error: ', error);

        })
    }



    let user = { //Creating object for when user clicks their own profile
        email: info.email,
        id: info.id,
        image: info.image,
        username: info.name
    }

    if (screenWidth > breakpoint) {

        return (
            <div className="profile-holder">
                <div className="profile">
                    <div className="upper-profile">
                        <div className="left">
                            <Link to={{ pathname: `/People/${info.name}`, state: { user: user } }}>
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

                        <div className="status-select-btn">
                            <span>{status.length === 0 ? `choose status` : status}</span>

                            <div className="status-dropdown-content">
                                <p onClick={() => updateStatus("Online")}>
                                    Online
                                </p>
                                <p onClick={() => updateStatus("Offline")}>Offline</p>
                                <p onClick={() => updateStatus("Idle")}>Idle</p>
                                <p onClick={() => updateStatus("Busy")}>Busy</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="noti">
                    <div className="dashboard">
                        <p>Dashboard Panel</p>
                    </div>
                    {dashboard ? <h1>Search for friends and this changes</h1> : userSearch ? (
                        <div className="users">
                            <div className="holder">
                                {users.length === 0 ? <h1>Empty</h1> : users.filter((eachUser) => {
                                    return eachUser.username !== info.name && eachUser.username.toUpperCase().includes(profileSearch.toUpperCase())
                                }).map((user, index) => {
                                    return (
                                        <div className="user-holder">
                                            <Link to={{ pathname: `/People/${user.name}`, state: { user: user } }}>
                                                <img src={user.image} alt="" />
                                                <h2>{user.username}</h2>
                                            </Link>
                                            <div className={following.includes(user.username) ? "following-BTN" : "follow-BTN"} onClick={() => requests(user.username, !following.includes(user.username))}>
                                                <PersonAddIcon id="" />
                                                {following.includes(user.username) ? <p>Following</p> : <p>Follow</p>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : chatroom ? <h1>Chat Room</h1> : null}

                </div>
            </div>
        )
    } else if (screenWidth < breakpoint) {
        return (
            null
        )
    }
}

export default ProfileBar
