import './Styling/App.css';
import NavBar from './Components/NavBar';
import ProfileBar from './Components/ProfileBar';
import Middle from './Routes/Middle';
import { UserContext } from "./Context/CurrentUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App(props) {

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{name: props.name , email: props.email, image: props.image}}>
            <NavBar/>
            <Middle/>
            <ProfileBar/>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
