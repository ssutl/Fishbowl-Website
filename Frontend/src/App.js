import './Styling/App.css';
import NavBar from './Components/NavBar';
import ProfileBar from './Components/ProfileBar';
import Middle from './Routes/Middle';
import { UserContext } from "./Context/CurrentUser";
import { BrowserRouter as Router} from "react-router-dom";
import React, {useState} from "react";

function App(props) {
  const [data, setData] = useState('');
  console.log('data: ', data);
  const [profileData, setProfileData] = useState('');

  const childToParent = (childdata) => {
    setData(childdata)
  }

  const profileToParent = (profileData) => {
    setProfileData(profileData)
  }

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{name: props.name , email: props.email, image: props.image, id: props.id}}>
            <NavBar profileData={profileData} followReq={data.followReq}/>
            <Middle childToParent={childToParent} dashboard={profileData}/>
            <ProfileBar search={data.search} profileToParent={profileToParent}/>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
