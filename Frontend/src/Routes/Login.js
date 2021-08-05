import React, {useState} from 'react'
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
    const [username,setUserName] = useState("")
    const [userClicked, setUserClicked] = useState()
    const [image,setImage] = useState("")
    const [email, setEmail] = useState("")
    const [online, setOnline] = useState(false)
    const [logged, setLogged] = useState()
    const [id, setUserId] = useState()
    const [token, setToken] = useState()


    const responseSuccessGoogle = (response) =>{
        console.log('response: ', response);
        setUserName(response.profileObj.name) //Using Google Response to set current User
        setEmail(response.profileObj.email)
        setImage(response.profileObj.imageUrl)
        setToken(response.tokenId)
        setOnline(true) //Marking that user is online
        setUserClicked(true)
        
    }
    
    if(userClicked){
        localStorage.setItem('session-token',token)
        
        axios({ //Retrieving the user table to get the id of the current user
            method:"GET",
            url: "https://chat-app-mongo-uk.herokuapp.com/users/get",
            headers: {"x-auth-token":`${token}`}
        }).then((response)=>{
            // console.log('response from get request: ', response);
            response.data.forEach((student)=>{
                if(student.username === username){
                    setUserId(student._id)
                }
            })
        })

        axios({ //Creating users account & if user already has account it wont be created again
            method:"POST",
            url: "https://chat-app-mongo-uk.herokuapp.com/users/new",
            headers: {"x-auth-token":`${token}`},
            data: {username,email, image, online}
        }).then(()=>{
            setLogged(true)
        })

        
    }
        
    
    
    const responseErrorGoogle = (response) =>{

    }

    if(logged){
        axios({ //Changin Status to online if user already existed
            method:`PUT`,
            url: `https://chat-app-mongo-uk.herokuapp.com/users/update/${id}`,
            headers: {"x-auth-token":`${token}`},
            data: {"online":true}
        }).then((response)=>{
            console.log("online put request successful")
        }).catch((error)=>{
            console.log("error", error)
        })

        return <App name={username} email={email} image={image} id={id}/>
    }else{
        return (
            <div className="login-page">
                <div className="login-holder">
                    <div className="upper">
                        <p className="title">Welcome</p>
                        <p>Join and socialize on a network for students</p>
                    </div>
                    <div className="lower">
                        <GoogleLogin
                        className="login-button"
                                clientId="939358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com"
                                onSuccess={responseSuccessGoogle}
                                onFailure={responseErrorGoogle}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                        >Login With Google</GoogleLogin>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
