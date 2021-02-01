import React from 'react'
import "./NavBar.css"
import { Link } from 'react-router-dom'
import ls from "local-storage"


const NavBar = (props) => {

    const localClickHandler = (e) => {
        ls.set("currentUser", null)
        // props.logoutHandler()
    }

    return (
        props.currentUser === null ?
        <></>
        :
        <div className="header">
            <Link to="/profile">
                <button> Profile </button>
            </Link>
            <img src="https://fontmeme.com/permalink/210115/72a4a804c01a2fa22cb39362f6132c1d.png"/>
            <Link to="/pickpage">
                <button> Pickpage </button>
            </Link>
            <Link to="/welcome">
                <button onClick={localClickHandler} > Logout </button>
            </Link>
        </div>
    )
    
}

export default NavBar
