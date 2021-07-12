import React, {useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styling/specificUserPage.css"
import axios from "axios";

function SpecificUserPage() {
    let current_user_ID = useLocation().pathname.split("/").pop();
    const [clickedUser,setClickedUser] = useState("")
    console.log('clickedUser: ', clickedUser);
    
        axios({
        method:"GET",
        url: "http://localhost:5000/users/get",
        }).then((response)=>{
            response.data.forEach((user)=>{
                if(user._id === current_user_ID){
                    setClickedUser(user)
                }
            })
        }).catch((error)=>{
            console.log("error:", error)
        })

    return (
        <div className="section2">
            <div className="holder">
                <div className="navigation">
                    <h1>{clickedUser.username}</h1>

                </div>
            </div>
        </div>
    )
}

export default SpecificUserPage
