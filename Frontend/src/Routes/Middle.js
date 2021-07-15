import React from 'react'
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Feed from '../Components/Feed';
import '../Styling/Middle.css'
import SearchIcon from '@material-ui/icons/Search';
import SpecificUserPage from './SpecificUserPage';

function Middle() {
    return (

            <div className="middle-holder">
                <div className="middle-container">
                <div className="section1">
                    <div className="search-wrapper">
                        <SearchIcon/>
                        <input className="searchBar" type="text" placeholder="Search for rooms, users or subjects"></input>
                    </div>
                </div>
                <Switch>
                    <Route  exact path="/" exact component={Feed}/>
                    <Route path="/People/:name" exact component={SpecificUserPage}/>
                </Switch>

                </div>
                
        </div>
        
    )
}

export default Middle
