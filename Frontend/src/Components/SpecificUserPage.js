import React from "react";
import { useLocation } from "react-router-dom";
import "../Styling/specificUserPage.css"
// import axios from "axios";

function SpecificUserPage() {
    const { state } = useLocation();


    return (
        <div className="section2">
            <div className="holder">
                    <div className="banner">
                    </div>
                    <div className="imageHolder">
                        <img src={state.user.image} alt=""/>
                    </div>
            </div>
            
        </div>
    )
}

export default SpecificUserPage
