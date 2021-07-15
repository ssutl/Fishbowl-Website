import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "../Styling/specificUserPage.css"
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { Link } from "react-router-dom";

function SpecificUserPage() {
    const { state } = useLocation();
    console.log('state: ', state);


    return (
        <div className="section2">
            <div className="holder">

            <div className="banner">
                <div className="arrow-holder">
                    <Link to="/">
                        <ArrowBackIosRoundedIcon id="arrow"/>
                    </Link>
                </div>
                <div className="profile-image">
                    <img src={state.user.image}/>
                </div>

            </div>
                

                <h1>{state.user.username}</h1>

            </div>
            
        </div>
    )
}

export default SpecificUserPage
