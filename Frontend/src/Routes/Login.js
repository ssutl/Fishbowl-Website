import React, {useState} from 'react'
import App from '../App'
import { GoogleLogin } from 'react-google-login';
import '../Styling/Login.css'

function Login() {
    const [logged, setLogged] = useState("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")

    const onLoginSuccess = (response) => {
        console.log("Login Successful")
        setLogged(response.hasOwnProperty('tokenId'))
        setName(response.dt.Ve)
        setEmail(response.dt.Nt)
        setImage(response.dt.CJ)
        console.log(response)
      }

    const onFailureSuccess = (response)=>{
        console.log("Login Failed", response)
    }

    if(logged){
        return(
            <App name={name} email={email} image={image}/>
        )
    }else return (
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
                            onSuccess={onLoginSuccess}
                            onFailure={onFailureSuccess}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                    >Login With Google</GoogleLogin>
                </div>
            </div>
        </div>
    )
}

export default Login
