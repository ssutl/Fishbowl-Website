import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../Styling/Feed.css'
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import '../Styling/Feed.css'

function Feed() {
    return (
        <div className="feed-section">
                <div className="top-section">
                    <div className="holder">
                        <div className="feed-BTN">
                            <p>Your Feed</p>
                            <p>Friends</p>
                        </div>
                        <div className="create-BTN">
                            <AddIcon/>
                            <p>New Room</p>
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default Feed;
