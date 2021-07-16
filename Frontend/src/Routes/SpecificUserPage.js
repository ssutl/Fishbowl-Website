import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "../Styling/specificUserPage.css"
import axios from "axios";

function SpecificUserPage() {
    const { state } = useLocation();


    return (
        <div className="section2">
            <div className="holder">
                

                <h1>{state.user.username}</h1>
            </div>
        </div>
    )
}

export default SpecificUserPage
