import React, {useState} from 'react'
import App from '../App'
import { GoogleLogin } from 'react-google-login';
import '../Styling/Login.css'
import axios from 'axios';

function Login() {
    const [username,setUserName] = useState("")
    const [signedIn, setSignedIn] = useState()
    const [image,setImage] = useState("")
    const [email, setEmail] = useState("")
    const [logged, setLogged] = useState()


    const responseSuccessGoogle = (response) =>{
        setUserName(response.Ys.Ve)
        setEmail(response.Ys.It)
        setImage(response.Ys.gJ)
        setSignedIn(true)
        
    }
    
    if(signedIn){
        console.log(username)
        axios({
            method:"POST",
            url: "http://localhost:5000/users/new",
            data: {username,email, image}
        }).then(()=>{
            setLogged(true)
        })
    }
        
    
    
    const responseErrorGoogle = (response) =>{

    }

    if(logged){
        return <App name={username} email={email} image={image}/>
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
