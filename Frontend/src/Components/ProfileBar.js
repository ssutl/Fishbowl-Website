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
import statusLogo from '../svg/status.png'
import homeLogo from '../svg/home.png'
import logoutLogo from '../svg/logout.png'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
    const[myRooms,setMyRooms] = useState([])
    const[currentRoom,setCurrentRoom] = useState()
    console.log('currentRoom: ', currentRoom);
    
    const [displayStatus, setDisplayStaus] = useState(false)
    const [status, setStatus] = useState('')
    const [left, setLeft] = useState()
    const [right, setRight] = useState()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    const breakpoint = 1200;
    const upper_breakpoint_laptop = 1800;

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);



    
    useEffect(()=>{
        let isMounted = true;

        if(current === "Chat"){
            axios({
                method: 'GET',
                url: `https://fishbowl-heroku.herokuapp.com/chat/get/id/${current_page}`,
                headers: { "x-auth-token": `${token}` }
            }).then((res) => {
                if(isMounted){
                    setCurrentRoom(res.data[0]) //Reversing order of rooms before we set variable, so that newest is at the top
                }
            })
        }
    },[current_page])
    






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

        
            axios({
                method: 'GET',
                url: `https://fishbowl-heroku.herokuapp.com/chat/get/${info.name}`,
                headers: { "x-auth-token": `${token}` }
            }).then((res) => {
                if(isMounted){
                    setMyRooms(res.data.reverse()) //Reversing order of rooms before we set variable, so that newest is at the top
                }
            })

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
        return(
            <div className="whole-holder">
                <div className="profile">
                    <div className="dashboardTitle">
                        <p>Fishbowl.Dashboard</p>
                    </div>
                            <div className="menu">
                               <div className="title">
                                   <p>MENU</p>
                               </div>
                               <div className="menu-item" onClick={()=>{dashboard?history.push({ pathname: `/People/${info.name}`, state: { user: user } }):history.push("/")}}>
                                <img src={homeLogo} id="profile-img" alt=""/>
                                <p>Home</p>
                               </div>
                               <div className="menu-item" onClick={()=>setDisplayStaus(!displayStatus)}>
                                   <img src={statusLogo} alt=""/>
                                   <p id="statusPara">{status.length === 0 ? `choose status` : status}</p>
                                   <div className="options">
                                       <div className="online-circle" onClick={() => updateStatus("Online")}>
                                            <div className="pop-up">online</div>
                                       </div>
                                       <div className="offline-circle" onClick={() => updateStatus("Offline")}>
                                            <div className="pop-up">offline</div>
                                       </div>
                                       <div className="busy-circle" onClick={() => updateStatus("Busy")}>
                                            <div className="pop-up">busy</div>
                                       </div>
                                       <div className="idle-circle" onClick={() => updateStatus("Idle")}>
                                            <div className="pop-up">idle</div>
                                       </div>
                                   </div>
                               </div>
                               <GoogleLogout
                                    clientId="939358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    render={renderProps => (
                                        <div onClick={renderProps.onClick} className="menu-item">
                                            <img src={logoutLogo} id="logoutLogo"/>
                                            <p>Logout</p>
                                        </div>
                                      )}
                                    onLogoutSuccess={()=> history.go(0)}
                                >
                                </GoogleLogout>
                            </div>
                            {dashboard ? (
                                <>
                                    <div className="room-stats">
                                        <div className="room-nav">
                                            <p>MY STATS</p>
                                        </div>
                                        <ol>
                                            <li>{`Total Rooms: ${myRooms.length}`}</li>
                                            <li>{`Total Answered: ${myRooms.filter((obj)=> obj.Answered).length}`}</li>
                                            <li>{`Total Messages: ${myRooms.reduce((accumulator,current) => accumulator + current.Messages.length,0)}`}</li>
                                        </ol>
                                    </div>  
                                    <div className="user-in">
                                        <img src={info.image} referrerpolicy="no-referrer" onClick={()=>history.push({ pathname: `/People/${info.name}`, state: { user: user } })}/>
                                        <p onClick={()=>history.push({ pathname: `/People/${info.name}`, state: { user: user } })}>{info.name}</p>
                                    </div>
                                </>
                            ): userSearch? (
                                <div className="users">
                                    <div className="holder">
                                        {users.length === 0 ? <h1>Empty</h1> : users.filter((eachUser) => {
                                            return eachUser.username !== info.name && eachUser.username.toUpperCase().includes(profileSearch.toUpperCase())
                                        }).map((user, index) => {
                                            return (
                                                <div className="user-holder" key={index}>
                                                    <img src={user.image} referrerpolicy="no-referrer" alt="" onClick={()=> redirectToUser([user.name, user])}/>
                                                    <div className="name-holder" onClick={()=> redirectToUser([user.name, user])}>
                                                        <h2>{user.username}</h2>
                                                    </div>
                                                    <div className={following.includes(user.username) ? "following-BTN" : "follow-BTN"} onClick={() => requests(user.username, !following.includes(user.username))}>
                                                        {following.includes(user.username) ? <DoneAllIcon/> : null}
                                                        {following.includes(user.username) ? null: <p>Follow</p>}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ): chatroom? (
                                <div className="chat-prof">
                                    <div className="title">
                                        <p>ROOM STATS</p>
                                    </div>
                                    <ol>
                                        {currentRoom !== undefined? (
                                        <li>{`Total Messages: ${currentRoom.Messages.length}`}</li>

                                        ):null}
                                    </ol>
                                    <div className="contributer-list">
                                        <p>Contributers :</p>
                                        <div className="vertical-scroll">
                                            {}
                                        </div>
                                    </div>
                                </div>
                            )
                            : null}
                </div>
            </div>
        )
    }

    
}

export default ProfileBar
