import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../Styling/Feed.css'
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

function Feed() {
    return (
        <div className="feed-section">
            <Router>
                <div className="top-section">
                    <div className="holder">
                        <div className="feed-BTN">
                            <Link><p>Your Feed</p></Link>
                            <Link><p>Friends</p></Link>
                        </div>
                        <div className="create-BTN">
                            <AddIcon/>
                            <p>New Room</p>
                        </div>
                    </div>
                </div>
                <Switch>

                </Switch>
            </Router>
        </div>
    )
}

export default Feed;
