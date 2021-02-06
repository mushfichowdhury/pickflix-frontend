import React from 'react'
import "./NavBar.css"
import ls from "local-storage"
import { Link } from 'react-router-dom'
import { push as Menu } from 'react-burger-menu';


class NavBar extends React.Component {
    state = {
        menuOpen: false
    }

    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
    }

    closeMenu() {
        this.setState({menuOpen: false})
    }

    toggleMenu () {
        this.setState(state => ({menuOpen: !state.menuOpen}))
    }

    localClickHandler = (e) => {
        ls.set("currentUser", null)
        // props.logoutHandler()
    }
    render() {
        return (
            this.props.currentUser === null ?
                <></>
                :
                <div className="navnav">
                    <img
                        className="navlogo"
                        src="https://fontmeme.com/permalink/210115/72a4a804c01a2fa22cb39362f6132c1d.png"
                        alt="PickFlix"
                    />
                    <Menu
                        right
                        noOverlay
                        isOpen={this.state.menuOpen}
                        onStateChange={(state) => this.handleStateChange(state)}
                        >
                            <Link to="/home" className="menuitem">
                                <button className="navbutton" onClick={() => this.closeMenu()}> Home </button>
                            </Link>
                            <Link to="/pickpage" className="menuitem">
                                <button className="navbutton" onClick={() => this.closeMenu()}> Pick Page </button>
                            </Link>
                            <Link to="/profile" className="menuitem">
                                <button className="navbutton" onClick={() => this.closeMenu()}> Profile </button>
                            </Link>
                            <Link to="/welcome" className="menuitem">
                                <button className="navbutton" onClick={this.localClickHandler}> Log Out </button>
                            </Link>
                    </Menu>
                </div>
        )
    }
    
}

export default NavBar