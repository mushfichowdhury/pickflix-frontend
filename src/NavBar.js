import React from 'react'
import "./NavBar.css"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ls from "local-storage"


const NavBar = (props) => {

    const localClickHandler = (e) => {
        ls.set("currentUser", null)
    }

    return (
        <div className="header">
            <Link to="/profile">
                <button> Profile </button>
            </Link>
            <Link to="/welcome">
                <img src="https://fontmeme.com/permalink/210115/72a4a804c01a2fa22cb39362f6132c1d.png"/>
            </Link>
            <Link to="/pickpage">
                <button> Pickpage </button>
            </Link>

        {/* {ls.get("currentUser") !== null
        ? 
        <Link to="/login">
        <button onClick={localClickHandler}>Logout</button> 
        </Link>
        :
            <Link to="/login">
                <IconButton>
                    <MeetingRoomIcon className="header__icon" fontSize="large"/>
                </IconButton>
            </Link>
        } */}
        </div>
    )
    
}

export default NavBar
