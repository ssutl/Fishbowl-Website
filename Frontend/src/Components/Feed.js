import React, { useContext} from "react";
import { UserContext } from "../Context/CurrentUser";
import '../Styling/Feed.css'
import AddIcon from '@material-ui/icons/Add';
import '../Styling/Feed.css'
import { Link } from "react-router-dom";

function Feed() {
    const info = useContext(UserContext)

    return (
        <div className="feed-section">
                <div className="top-section">
                    <div className="holder">
                        <div className="feed-BTN">
                            <p>Your Feed</p>
                            <p>Friends</p>
                        </div>
                        <Link to={{pathname:`/Create/${info.name}`}}>
                            <div className="create-BTN">
                                <AddIcon/>
                                <p>New Room</p>
                            </div>
                        </Link>
                    </div>
                </div>

        </div>
    )
}

export default Feed;
