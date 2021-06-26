import './Styling/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import GlobalFeed from './Routes/GlobalFeed';
import ProfileBar from './Components/ProfileBar';
import Middle from './Components/Middle';

function App() {

  return (
    <div className="App">
        <NavBar/>
        <Middle/>
        <ProfileBar/>
    </div>

  );
}

export default App;
