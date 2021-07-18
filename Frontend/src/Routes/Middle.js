import React from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
import Feed from '../Components/Feed';
import '../Styling/Middle.css'
import SearchIcon from '@material-ui/icons/Search';
import SpecificUserPage from '../Components/SpecificUserPage';
import MyPage from '../Components/MyPage';
import CreateRoom from '../Components/CreateRoom';
import ChatRoom from '../Components/ChatRoom';

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
                    <Route exact path="/" component={withRouter(Feed)}/>
                    <Route exact path="/People/:name" component={withRouter(SpecificUserPage)}/>
                    <Route exact path="/:name" component={withRouter(MyPage)}/>
                    <Route exact path="/Create/:name" component={withRouter(CreateRoom)}/>
                    <Route exact path="/Chat/:roomId" component={withRouter(ChatRoom)}/>
                </Switch>
        </div>
        
    )
}

export default Middle
