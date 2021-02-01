import React from 'react'
import "./NavBar.css"
import ls from "local-storage"
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    const localClickHandler = (e) => {
        ls.set("currentUser", null)
        // props.logoutHandler()
    }

    return (
        props.currentUser === null ?
        <></>
        :
        <div className="navnav">
            
            <img 
            className="navlogo"
            src="https://fontmeme.com/permalink/210115/72a4a804c01a2fa22cb39362f6132c1d.png"
            alt="PickFlix"
            />
            
            <Link to="/home" >
                <button className="navbutton" > Home </button>
            </Link>
            <Link to="/pickpage" >
                <button className="navbutton" > Pick Page </button>
            </Link>
            <Link to="/profile" >
                <button className="navbutton" > Profile </button>
            </Link>
            <Link to="/welcome" >
                <button className="navlogout" onClick={localClickHandler}> Log Out </button>
            </Link>

        </div>
    )
    
}

export default NavBar
