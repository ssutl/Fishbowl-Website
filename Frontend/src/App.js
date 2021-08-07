import './Styling/App.css';
import NavBar from './Components/NavBar';
import ProfileBar from './Components/ProfileBar';
import Middle from './Routes/Middle';
import { UserContext } from "./Context/CurrentUser";
import { BrowserRouter as Router} from "react-router-dom";
import React, {useState} from "react";

function App(props) {
  const [data, setData] = useState('');

  const childToParent = (childdata) => {
    setData(childdata)
  }

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{name: props.name , email: props.email, image: props.image, id: props.id}}>
            <NavBar/>
            <Middle childToParent={childToParent}/>
            <ProfileBar search={data}/>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
