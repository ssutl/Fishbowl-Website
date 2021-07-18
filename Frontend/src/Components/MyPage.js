import React from "react";
import { useLocation } from "react-router-dom";
import "../Styling/specificUserPage.css"
import EditIcon from '@material-ui/icons/Edit';

function MyPage() {
    const { state } = useLocation();


    

    
    


    return (
        <div className="section2">
            <div className="holder">
                    <div className="banner">
                        <input
                            type="file"
                            id="incomingBanner"
                            onChange={(event) => {
                               
                            }}
                        ></input>
                        <label className="edit" htmlFor="incomingBanner" >
                            <EditIcon/>
                        </label>
                       
                    </div>
                    <div className="imageHolder">
                        <img src={state.info.image} alt=""/>
                    </div>
            </div>
            
        </div>
    )
}

export default MyPage
