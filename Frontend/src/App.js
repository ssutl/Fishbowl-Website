import './Styling/App.css';
import NavBar from './Components/NavBar';
import ProfileBar from './Components/ProfileBar';
import Middle from './Routes/Middle';
import { UserContext } from "./Context/CurrentUser";

function App(props) {

  return (
    <div className="App">
      <UserContext.Provider value={{name: props.name , email: props.email, image: props.image}}>
          <NavBar/>
          <Middle/>
          <ProfileBar/>
      </UserContext.Provider>
    </div>

  );
}

export default App;
