import React from 'react'
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Feed from '../Components/Feed';
import '../Styling/Middle.css'
import SearchIcon from '@material-ui/icons/Search';
import SpecificUserPage from '../Components/SpecificUserPage';
import MyPage from '../Components/MyPage';
import CreateRoom from '../Components/CreateRoom';

function Middle() {
    return (

            <div className="middle-holder">
                <div className="section1">
                    <div className="search-wrapper">
                        <SearchIcon/>
                        <input className="searchBar" type="text" placeholder="Search for rooms, users or subjects"></input>
                    </div>
                </div>
                <Switch>
                    <Route  exact path="/" exact component={Feed}/>
                    <Route path="/People/:name" exact component={SpecificUserPage}/>
                    <Route path="/:name" exact component={MyPage}/>
                    <Route path="/Create/:name" exact component={CreateRoom}/>
                    {/* <Route path="/Chat/:roomId" exact component={ChatRoom}/> */}
                </Switch>
        </div>
        
    )
}

export default Middle
