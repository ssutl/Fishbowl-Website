import React, { useContext, useState, useEffect } from "react";
import '../Styling/ProfileBar.css'
import { useLocation } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from "../Context/CurrentUser";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoneAllIcon from '@material-ui/icons/DoneAll';


function ProfileBar({ profileToParent, search }) {
    const [flag, setFlag] = useState(false) //Whenever user follows another user flag is set and state is passed to navbar so it knows when to refresh data


    useEffect(() => { //Passing Flag to parent to indicate when a user follows or unfollows a user
        let isMounted = true;

        if(isMounted){
            profileToParent(flag)
        }

        return () => { isMounted = false };
    }, [flag]) //Runs whenever flag is altered

    let profileSearch = search
    let current_page = useLocation().pathname.split("/").pop(); //Collecting current page
    let current = useLocation().pathname.split("/").slice(-2)[0]; //Collecting current page

    const info = useContext(UserContext)

    const history = useHistory();
    const token = localStorage.getItem('session-token')
    const [searching, setSearching] = useState(false)
    const chatroom = current === "Chat";
    const dashboard = current_page === "" && !searching; //Dashboard display is true if user is not searching and on home page
    const userSearch = current_page === "" && searching //Search display is true if user is on home page and searching
    const [users, setUsers] = useState('')
    const [following, setFollowing] = useState()
    const [status, setStatus] = useState('')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const breakpoint = 1200;
    const upper_breakpoint_laptop = 1800;

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);






    /**
     * ==============================================
     * Setting searching to tru whenever user types
     * ============================================
     */

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            setSearching(profileSearch.length > 0)
        }
        return () => { isMounted = false };
    }, [profileSearch])

    /**
     * ==============================================
     * Setting searching to tru whenever user types
     * ============================================
     */





    /**Changing the users status */

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

    /**Changing the users status */






    useEffect(() => { //Recieving users for the dashboard
        let isMounted = true;

        if(isMounted){
            getUsers()

            const interval = setInterval(() => { //Set interval will allow user to to see status updates
                    getUsers()
            }, 6000)
            return () => clearInterval(interval);
        }
        return () => { isMounted = false };

        
    }, [current_page]) //Only calls on page load


    const getUsers = () =>{
        console.log("getting users")
        axios({
            method: "GET",
            url: "https://fishbowl-heroku.herokuapp.com/users/get",
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
                setUsers(response.data.reverse()) //Storing array in state
        }).catch((error) => {
            console.log('error: ', error);

        })

        axios({
            method: "GET",
            url: `https://fishbowl-heroku.herokuapp.com/users/get/${info.name}`,
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
                setFollowing(response.data[0].following) //Storing list of the users the current follows
                setStatus(response.data[0].status) //Recieving their status information
        }).catch((error) => {
            console.log('error: ', error);
        })
    }


    const requests = (userID, value) => { //Handling following and unfollowing
        if (value) {
            axios({
                method: 'PUT',
                url: `https://fishbowl-heroku.herokuapp.com/users/update/${info.name}`,
                headers: { "x-auth-token": `${token}` },
                data: { following: userID }
            }).then((res) => {
                getFollowing() //Once a user makes a request update their display
                setFlag(!flag) //Change flag to indicate that a user has made request
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
                getFollowing() //Once a user makes a request update their display
                setFlag(!flag) //Change flag to indicate that a user has made request
            }).catch((error) => {
                console.log('error: ', error);

            })
        }
    }

    const getFollowing = () => { //Get following array
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


    let user = { //Creating object for when user clicks their own profile
        email: info.email,
        id: info.id,
        image: info.image,
        username: info.name
    }

    const redirectToUser = (data) =>{  //Link for when a user clicks another user
        history.push({
            pathname: `/People/${data[0]}`,
            state: { user: data[1] }
        })
    }

    


    if (screenWidth >= breakpoint) {

        return (
            <div className="profile-holder">
                <div className="profile">
                    <div className="upper-profile">
                        <div className="left">
                            <Link to={{ pathname: `/People/${info.name}`, state: { user: user } }}>
                                <div className="image-holder">
                                    <img src={info.image} className="image" referrerpolicy="no-referrer" alt=""></img>
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
                            onLogoutSuccess={()=> history.go(0)}
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
                                        <div className="user-holder" key={index}>
                                            <img src={user.image} alt="" onClick={()=> redirectToUser([user.name, user])}/>
                                            <div className="name-holder" onClick={()=> redirectToUser([user.name, user])}>
                                                <h2>{user.username}</h2>
                                            </div>
                                            <div className={following.includes(user.username) ? "following-BTN" : "follow-BTN"} onClick={() => requests(user.username, !following.includes(user.username))}>
                                                {screenWidth < upper_breakpoint_laptop? following.includes(user.username) ? <DoneAllIcon/> :<PersonAddIcon id="" />  : following.includes(user.username) ? null : <PersonAddIcon id="" />}
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
    } else{
        return (
           null
        )
    }
}

export default ProfileBar
