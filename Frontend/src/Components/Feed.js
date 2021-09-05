import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/CurrentUser";
import '../Styling/Feed.css'
import AddIcon from '@material-ui/icons/Add';
import '../Styling/Feed.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import { useHistory } from 'react-router-dom';


function Feed({ input, followR, dashboard}) {


    const history = useHistory();
    const info = useContext(UserContext) //Stores current user info
    const token = localStorage.getItem('session-token') //Retrieves token from server to pass to api
    const [allRooms, setAllRooms] = useState([]) //Stores all current rooms from api
    const [friendFeed, setFriendFeed] = useState(false) //Boolean variable to switch between feeds
    const [feed, setFeed] = useState(true) //Boolean variable to switch between feeds
    const [following, setFollowing] = useState([]) //Array of the users the current user is following
    const [loading, setLoading] = useState() //Flag to indicate when API call is finished
    const breakpoint = 1200; //Tablet breakpoint
    const [screenWidth, setScreenWidth] = useState(window.innerWidth); //Settting screenwidth to current viewport size
    const [newRoomsAvailable, setNewRoomAvailable] = useState(false)
    const [cycledFinished, setCycledFinished] = useState(false)
    const [newFriendRooms, setNewFriendRooms] = useState(false)
    let friends_rooms = [] //Array for friends rooms
    const resize = () => {
        setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);







    /**
     * ===========================================================
     * Getting all current rooms and who the current user follows
     * ===========================================================
     */

    useEffect(() => {
        let isMounted = true;

        setLoading(true)
        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            if(isMounted){
            setAllRooms(res.data.reverse()) //Reversing order of rooms before we set variable, so that newest is at the top
            }
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
    }, [followR, dashboard]) //This gets called whenever these states change


    if (loading === false) { //Setting friends rooms
            allRooms.map((room) => {
                if (following.includes(room.CreatedByName)) {
                        friends_rooms.push(room)
                }
            })
        }
    
    

    /**
     * ===========================================================
     * Getting all current rooms and who the current user follows
     * ===========================================================
     */

    

    

    

    /**
     * ===========================================
     * Setting an interval to check for new rooms
     * ===========================================
     */

    useEffect(()=>{
        let isMounted = true;

        setCycledFinished(false) 

        if(newRoomsAvailable === false){ //If no new rooms set a repeating interval to check for new rooms
            if(isMounted){
                const interval = setInterval(()=>{
                    checkRooms()
                },10000)
                return () => clearInterval(interval);
            } 
        }

        return () => { isMounted = false };
    },[cycledFinished])

    const checkRooms = () =>{ //Getting rooms and checking if there are any more than whats already displayed
        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            if(res.data.length > allRooms.length){ //If recieved rooms array is larger than whats displayed give option to update
                if(allRooms.length < 5){ //If there is less than 5 automatically update
                    updateCurrentRooms()
                }else{
                    setNewRoomAvailable(true) //else provide an option to update
                }
            }else if(res.data.length < allRooms.length){
                updateCurrentRooms()
              }
        }).catch((err)=>{
            console.log('err: ', err);
        })
    }


    const updateCurrentRooms = () =>{ //Updating ooms
        axios({
            method: 'GET',
            url: `https://fishbowl-heroku.herokuapp.com/chat/get`,
            headers: { "x-auth-token": `${token}` }
        }).then((res) => {
            setAllRooms(res.data.reverse()) //Reversing order of rooms before we set variable, so that newest is at the top
            setNewRoomAvailable(false)
            // setNewFriendRooms(false)
            setCycledFinished(true)
        }).catch((err)=>{
            console.log('err: ', err);
        })
    }

    
    /**
     * ===========================================
     * Setting an interval to check for new rooms
     * ===========================================
     */

    





    

    const override = css`
    position: absolute;
    width: 200px;
    top: 50%;
    right:45%;
  `;

  if(screenWidth >= breakpoint){
    return (
        <div className="feed-section">
            <div className="top">
                <div className="holder">
                    <div className="feed-BTN">
                        <p className={newRoomsAvailable? "pink" :feed ? "normal" : "NotActive"} onClick={() => {
                            setFeed(true);
                            setFriendFeed(false);
                            updateCurrentRooms();
                            document.querySelector('.scroll').scrollTo(0, 0)
                        }}>Global Feed</p>
                        <p className={friendFeed ? "normal" : "NotActive"} onClick={() => {
                            setFeed(false);
                            setFriendFeed(true);
                            document.querySelector('.scroll').scrollTo(0, 0);
                        }}>Friend's Feed</p>
                    </div>
                    <Link to={{ pathname: `/Create/${info.name}` }}>
                        <div className="create-BTN">
                            <AddIcon />
                            {screenWidth < breakpoint ? null : <p>New Room</p>}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="bottom-section">
                {/* {newRoomsAvailable? (
                    <div className="indicator" onClick={()=>{
                        updateCurrentRooms();
                        document.querySelector('.scroll').scrollTo(0, 0)
                    }}>
                        <p>New Rooms</p>
                    </div>
                ): null
                } */}
                
                <div className="scroll">
                    {allRooms == null || friends_rooms == null ? <BarLoader color={"#FFFFFF"} css={override} size={300} /> : feed ? allRooms.length === 0 ? (
                        <div className="noGlobalorFriends">
                            <div className="write">
                                <h2>NO GLOBAL ROOMS</h2>
                            </div>
                            <div className="svgImage">
                                <img src="swirl.svg" />
                            </div>
                        </div>
                    )
                        : (allRooms.filter((chat) => {
                            

                            

                            return (
                                chat.Title.toUpperCase().includes(input.toUpperCase()) ||
                                chat.Question.toUpperCase().includes(input.toUpperCase())
                                //  chat.Tags.map((tag)=>{
                                //     return tag.toUpperCase().includes(input.toUpperCase())
                                // })
                                
                            );
                        }).map((room, index) => {
                            return (
                                <div onClick={(event)=>{room.Post? event.preventDefault() : history.push({ pathname: `/Chat/${room._id}`, state: { room } })}} className={room.Post? "link" : "link cursour"} key={index}>
                                    <div className={following.includes(room.CreatedByName) ? "room-holder-friend" : "room-holder"} key={index}>
                                        <div className="top-section">
                                            <p id="Title">{room.Title}</p>
                                            <p id="Question">{room.Question.substring(0, 105)} ....</p>
                                        </div>
                                        <div className="low-section">
                                            <div className="low-holder">
                                                {room.Tags.map((tag, index) => {
                                                    return <div className="roomTag" key={index}>{tag}</div>
                                                })}
                                            </div>
                                        </div>
                                        {room.Answered? (
                                            <div className="answered">
                                                <div className="dot">
                                                    <p>Answered</p>
                                                </div>  
                                            </div>
                                        ):null}
                                    </div>
                                </div>
                            )
                        })) : friends_rooms.length === 0 ? (
                            <div className="noGlobalorFriends">
                                <div className="write">
                                    <h2>NO FRIEND ROOMS</h2>
                                </div>
                                <div className="svgImage">
                                    <img src="friends.svg" />
                                </div>

                            </div>
                        ) : (
                        friends_rooms.filter((chat) => {

                            return (
                                chat.Title.toUpperCase().includes(input.toUpperCase()) ||
                                chat.Question.toUpperCase().includes(input.toUpperCase())

                            );
                        }).map((room, index) => {
                            return (
                                <div onClick={(event)=>{room.Post? event.preventDefault() : history.push({ pathname: `/Chat/${room._id}`, state: { room } })}} className={room.Post? "link" : "link cursour"} key={index}>
                                    <div className="room-holder-friend" key={index}>
                                        <div className="top-section">
                                            <p id="Title">{room.Title}</p>
                                            <p id="Question">{room.Question.substring(0, 70)} ....</p>
                                        </div>
                                        <div className="low-section">
                                            <div className="low-holder">
                                            {room.Tags.map((tag, index) => {
                                                    return <div className="roomTag" key={index}>{tag}</div>
                                                })}
                                            </div>
                                        </div>
                                        {room.Answered? (
                                            <div className="answered">
                                                <div className="dot">
                                                    <p>Answered</p>
                                                </div>  
                                            </div>
                                        ):null}
                                    </div>
                                </div>
                            )
                        })

                    )}
                </div>
            </div>

        </div>
    )
  }else{
      return(
          null
      )
  }

    
}

export default Feed;
