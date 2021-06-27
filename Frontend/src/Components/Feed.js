import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../Styling/Feed.css'
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import GlobalFeed from './GlobalFeed';
import LocalFeed from './LocalFeed';

function Feed() {
    return (
        <div className="feed-section">
            <Router>
                <div className="top-section">
                    <div className="holder">
                        <div className="feed-BTN">
                            <Link to="/"><p>Your Feed</p></Link>
                            <Link to="/Local"><p>Friends</p></Link>
                        </div>
                        <div className="create-BTN">
                            <AddIcon/>
                            <p>New Room</p>
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path="/" exact component={GlobalFeed}></Route>
                    <Route path="/Local" exact component={LocalFeed}></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Feed;
