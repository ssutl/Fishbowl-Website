import React, { useEffect, useContext, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Feed from '../Components/Feed';
import '../Styling/Middle.css'
import SearchIcon from '@material-ui/icons/Search';
import SpecificUserPage from '../Components/SpecificUserPage';
import CreateRoom from '../Components/CreateRoom';
import ChatRoom from '../Components/ChatRoom';
import { useHistory } from 'react-router-dom';
// import Feed from '../Components/Feed';

function Middle({ childToParent, dashboard }) {
    const history = useHistory();
    const [search, setSearch] = useState("")
    const [followReq, setFollowReq] = useState("")
    const [roomCreated, setRoomCreated] = useState("")
    const breakpoint = 1200;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);

    useEffect(() => {
        const data = { search, followReq }
        childToParent(data)
    }, [search, followReq])

    const specificUserToParent = (specificUser) => {
        setFollowReq(specificUser)
    }


    const createRoomToParent = (createRoom) => {
        setRoomCreated(createRoom)
    }

    if(screenWidth >= breakpoint){
        return (

            <div className="middle-holder">
                <div className="section1">
                    <div className="search-wrapper">
                        {/* <SearchIcon/> */}
                        <input className="searchBar" type="text" placeholder="Search for rooms or friends" onChange={(event) => { setSearch(event.target.value); history.push('/'); }}></input>
                    </div>
                </div>
                <Switch>
    
                    {/* <Route exact path="/" component={withRouter(Feed)} value={search}/> */}
                    <Route exact path="/" render={(props) => (
                        <Feed input={search} followR={followReq} dashboard={dashboard} roomCreated={roomCreated} />
                    )} />
                    <Route exact path="/People/:name" render={() => (
                        <SpecificUserPage specificUserToParent={specificUserToParent} />
                    )} />
                    <Route exact path="/Create/:name" render={() => (
                        <CreateRoom createRoomToParent={createRoomToParent} />
                    )} />
                    <Route exact path="/Chat/:roomId" component={withRouter(ChatRoom)} />
                </Switch>
            </div>
    
        )
    }else{
        return(
            null
        )
    }

    
}

export default Middle
