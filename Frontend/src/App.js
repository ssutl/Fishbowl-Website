import './Styling/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import GlobalFeed from './Routes/GlobalFeed';
import ProfileBar from './Components/ProfileBar';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar/>
        {/* <ProfileBar/> */}
        <Switch>
          <Route path="/" exact component={GlobalFeed}></Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
