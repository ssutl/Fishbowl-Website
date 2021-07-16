import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "../Styling/specificUserPage.css"
// import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';

function SpecificUserPage() {
    const { state } = useLocation();
    const [incomingFile, setIncomingFile] = useState("");


    return (
        <div className="section2">
            <div className="holder">
                    <div className="banner">
                    </div>
                    <div className="imageHolder">
                        <img src={state.user.image}/>
                    </div>
            </div>
            
        </div>
    )
}

export default SpecificUserPage
