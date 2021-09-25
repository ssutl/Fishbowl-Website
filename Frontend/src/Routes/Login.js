import React, { useState, useEffect } from 'react'
import App from '../App'
import { GoogleLogin } from 'react-google-login';
import '../Styling/Login.css'
import axios from 'axios';
import PublishIcon from '@material-ui/icons/Publish';

function Login() {
    /*
    ============================
                Current User Info
    ============================
    */
    const [username, setUserName] = useState("")
    const[createUser, setCreateUser] = useState(false)
    const [responseSuccesful, setResponseSuccessful] = useState(false)
    const [image, setImage] = useState("")
    const [email, setEmail] = useState("")
    const [logged, setLogged] = useState(false)
    const [id, setUserId] = useState("")
    const [status, setStatus] = useState("")
    const [token, setToken] = useState()
    const breakpoint = 1024;
    const[usernameTaken, setUsernameTaken] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const resize = () => {
        setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);


    const responseSuccessGoogle = (response) => {
        setEmail(response.profileObj.email)
        setImage(response.profileObj.imageUrl)
        setToken(response.tokenId)        
        checkUsername([response.tokenId,response.profileObj.email])
    }

    const checkUsername = (prop) =>{
        localStorage.setItem('session-token', prop[0]) //Storing token from google into local storage for access later

        axios({
            method: "GET",
            url: "https://fishbowl-heroku.herokuapp.com/users/get",
            headers: { "x-auth-token": `${prop[0]}` },
        }).then((response)=>{
            if(response.data.length !== 0){

                if(response.data.filter((user)=> user.email === prop[1]).length > 0){
                    response.data.map((user)=>{
                        if(user.email === prop[1]){
                            setUserName(user.username)
                            setUserId(user._id)
                            localStorage.setItem('userID', user._id) //Storing token from google into local storage for access later
                            setLogged(true)
                        }
                    })
                }else{
                    setCreateUser(true)
                }

            }else{
                setCreateUser(true)
            }
                
        })
    }



    

    const handleUserNameSubmit = () =>{
        document.querySelector('.username-input').value= ''
        if(username.length > 0){
            axios({
                method: "POST",
                url: "https://fishbowl-heroku.herokuapp.com/users/new",
                headers: { "x-auth-token": `${token}` },
                data: {username ,email, status, image}
            }).then((response)=>{
                if(response.data.msg === "user already exists"){
                    setUsernameTaken(true)
                }else{

                    axios({
                        method: "GET",
                        url: "https://fishbowl-heroku.herokuapp.com/users/get",
                        headers: { "x-auth-token": `${token}` },
                    }).then((response)=>{
                        if(response.data.length !== 0){
                            if(response.data.filter((user)=> user.email === email).length > 0){
                                response.data.map((user)=>{
                                    if(user.email === email){
                                        setUserId(user._id)
                                        localStorage.setItem('userID', user._id) //Storing token from google into local storage for access later
                                        setLogged(true)
                                    }
                                })
                            }
                        }
                            
                    })


                }
            }).catch((error)=>{
                console.log('error: ', error);

            })
        }
        
    }


    if(screenWidth >= breakpoint){
        if (logged && username !== "" && id !== "" && email!== "") { //Conditionally rendering main app
            return <App name={username} email={email} image={image} id={id} />
        } else {
            return (
                <div className="login-page">
                    <div className="left">
                        <div className="text-holder">
                            <div className="chunkz">
                                <h1 className="large">JOIN</h1>
                                <h1 className="large">CREATE</h1>
                                <h1 className="large">COMMUNICATE</h1>
                                <h1 className="small">CHAT</h1>
                                <h1 className="small">ROOMS</h1>
                            </div>
                            <div className="website-desc">
                                <p><span>{`Create & Join Chat Rooms`} 💬🌎</span> We are making this the easiest way to recieve informed and live responses to any of your questions 📚</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="login-holder">
                            <div className="upper">
                                <p className="title" id="welcomeback">Welcome</p>
                                <p id="logintoyouraccount">{createUser? `Enter Username`: `Log Into Your Account`}</p>
                            </div>
                            <div className="lower">
                                {createUser?(
                                    <>
                                        <div className={usernameTaken?"input-holder username-taken":"input-holder"}>
                                            <input className="username-input" onChange={(event)=> setUserName(event.target.value)} required type="text" placeholder={usernameTaken?"Username Already Exists":"Choose Your Username"}></input>
                                        </div>
                                        <div className="submit" onClick={()=>handleUserNameSubmit()}>
                                            <PublishIcon/>
                                        </div>
                                    </>
                                ):(
                                    <GoogleLogin
                                        className="login-button"
                                        clientId="939358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com"
                                        onSuccess={responseSuccessGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        render={renderProps => (
                                            <div className="loginBtn" onClick={renderProps.onClick}>Login With Google</div>
                                        )}
                                        isSignedIn={true}
                                    >Login With Google</GoogleLogin>
                                )}
                                
                            </div>
                        </div>
    
                    </div>
                    
                </div>
            )
        }

    }else{
        return(
            <div className="GoToDesktop">
                <h1>Mobile Site Pending - Please Visit Desktop Site</h1>
            </div>
        )
    }

    
}

export default Login
