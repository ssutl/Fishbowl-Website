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
    const [signedIn, setSignedIn] = useState()
    const [image,setImage] = useState("")
    const [email, setEmail] = useState("")
    const [online, setOnline] = useState(false)
    const [logged, setLogged] = useState()
    const [id, setUserId] = useState()


    const responseSuccessGoogle = (response) =>{
        setUserName(response.Ys.Ve) //Using Google Response to set current User
        setEmail(response.Ys.It)
        setImage(response.Ys.gJ)
        setOnline(true) //Marking that user is online
        setSignedIn(true)
        
    }
    
    if(signedIn){
        
        axios({ //Creating users account & if user already has account it wont be created again
            method:"POST",
            url: "http://localhost:5000/users/new",
            data: {username,email, image, online}
        }).then(()=>{
            setLogged(true)
        })



        axios({ //Retrieving the user table to get the id of the current user
            method:"GET",
            url: "http://localhost:5000/users/get",
        }).then((response)=>{
            response.data.forEach((student)=>{
                if(student.username === username){
                    setUserId(student._id)
                }
            })
        })

        
    }
        
    
    
    const responseErrorGoogle = (response) =>{

    }

    if(logged){
        axios({ //Changin Status to online if user already existed
            method:`PUT`,
            url: `http://localhost:5000/users/update/${id}`,
            data: {"online":true}
        }).then((response)=>{
            
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
