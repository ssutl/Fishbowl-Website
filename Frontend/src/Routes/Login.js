import React, {useState} from 'react'
import App from '../App'
import { GoogleLogin } from 'react-google-login';
import '../Styling/Login.css'

function Login() {
    const [logged, setLogged] = useState("");

    const responseGoogle = (response) => {
        setLogged(response.hasOwnProperty('tokenId'))
      }

    if(logged){
        return(
            <App/>
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
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                    >Login With Google</GoogleLogin>
                </div>
            </div>
        </div>
    )
}

export default Login
