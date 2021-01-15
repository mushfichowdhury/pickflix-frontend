import React from 'react';
import { Link } from 'react-router-dom';
import "./LogIn.css"

const Welcome = () => {

    return (
        <div>

            <div>
                <div id="vertical-flip" class="welcomecard">
                    <div class="flip">
                        <div class="front">
                            <div class="logo">
                                <img src="https://fontmeme.com/permalink/210115/72a4a804c01a2fa22cb39362f6132c1d.png" alt="PickFlix" />
                            </div>
                        </div>
                        <div className="back">
                            <Link to="/login">
                                <button variant="contained" class="welcomebutton" >Enter</button>
                            </Link>
                            {/* <Link to="/signup">
                                <Button variant="contained" class="welcomebutton" >New User?</Button>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Welcome;