import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from '../Components/Feed';
import '../Styling/Middle.css'
import SearchIcon from '@material-ui/icons/Search';

function Middle() {
    return (
        <div className="middle-holder">
            <Router>
                <div className="section1">
                    <div className="search-wrapper">
                        <SearchIcon/>
                        <input className="searchBar" type="text" placeholder="Search for rooms, users or subjects"></input>
                    </div>
                </div>
                <Switch>
                    <Route path="/" exact component={Feed}/>
                </Switch>
            </Router>
            
            
        </div>
    )
}

export default Middle
