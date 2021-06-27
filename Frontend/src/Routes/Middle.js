import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from '../Components/Feed';
import '../Styling/Middle.css'


function Middle() {
    return (
        <div className="middle-holder">
            <Router>
                <div className="section1"></div>
                <Switch>
                    <Route path="/" exact component={Feed}/>
                </Switch>
            </Router>
            
            
        </div>
    )
}

export default Middle
