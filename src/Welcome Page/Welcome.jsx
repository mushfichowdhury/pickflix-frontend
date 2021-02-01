import React from 'react';
import { Link } from 'react-router-dom';
import "./Welcome.css"
import RecentlyWatchedMovie from './RecentlyWatchedMovie';

const Welcome = () => {

    return (
        <div>
            <div className="welcomecontainer">
                <div class="logocontainer">
                    <img 
                    className="imglogo" 
                    src="https://fontmeme.com/permalink/210115/72a4a804c01a2fa22cb39362f6132c1d.png" 
                    alt="PickFlix" />
                    <Link to="/login">
                        <button variant="contained" className="logobutton">Enter</button>
                    </Link>
                </div>
            </div>
            <RecentlyWatchedMovie/>
        </div>
    )

};

export default Welcome;