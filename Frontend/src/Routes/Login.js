import React, { useState } from 'react'
import App from '../App'
import { GoogleLogin } from 'react-google-login';
import '../Styling/Login.css'
import axios from 'axios';

function Login() {
    /*
    ============================
                Current User Info
    ============================
    */
    const [username, setUserName] = useState("")
    const [userClicked, setUserClicked] = useState()
    const [image, setImage] = useState("")
    const [email, setEmail] = useState("")
    const [logged, setLogged] = useState()
    const [id, setUserId] = useState()
    const [status, setStatus] = useState("")
    const [token, setToken] = useState()

    const breakpoint = 1200;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);


    const responseSuccessGoogle = (response) => {
        setUserName(response.profileObj.name) //Using Google Response to set current User
        setEmail(response.profileObj.email)
        setImage(response.profileObj.imageUrl)
        setToken(response.tokenId)
        setUserClicked(true)

    }

    if (userClicked) {
        localStorage.setItem('session-token', token)

        axios({ //Retrieving the user table to get the id of the current user
            method: "GET",
            url: "https://fishbowl-heroku.herokuapp.com/users/get",
            headers: { "x-auth-token": `${token}` }
        }).then((response) => {
            response.data.forEach((student) => {
                if (student.username === username) {
                    setUserId(student._id)
                }
            })
        })

        axios({ //Creating users account & if user already has account it wont be created again
            method: "POST",
            url: "https://fishbowl-heroku.herokuapp.com/users/new",
            headers: { "x-auth-token": `${token}` },
            data: { username, email, image, status }
        }).then(() => {
            setLogged(true)
            // setUserClicked(false)
        })


    }



    const responseErrorGoogle = (response) => {

    }


    if(screenWidth >= breakpoint){
        if (logged) {
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
                                <p id="logintoyouraccount">Log Into Your Account</p>
                            </div>
                            <div className="lower">
                                <GoogleLogin
                                    className="login-button"
                                    clientId="939358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com"
                                    // render={renderProps => (
                                    //     <button onClick={renderProps.onClick} style={{
                                    //             backgroundColor: "#0096ff",
                                    //             height: "50px",
                                    //             width: "60%",
                                    //             borderRadius: "5px",
                                    //             outline:"none",
                                    //             border: "none",
                                    //             cursor:"pointer",
                                    //             color:"white"
                                    //     }}>Login With Google</button>
                                    //   )}
                                    onSuccess={responseSuccessGoogle}
                                    onFailure={responseErrorGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                >Login With Google</GoogleLogin>
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
