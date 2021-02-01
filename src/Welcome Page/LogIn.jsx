import React from 'react';
import "./LogIn.css"
import { Link } from 'react-router-dom';


class LogIn extends React.Component {
    state = {
        username: "user",
        password: "demo"
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    localSubmitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    render(){
        return (
            <div>
                <div className="back">
                    <form className="loginform" onSubmit={this.localSubmitHandler}>
                        <div className="box-input">
                            <input type="username" name="username" placeholder="Username" required value={this.state.username} onChange={this.changeHandler} />
                            <input type="password" name="password" placeholder="Password" required value={this.state.password} onChange={this.changeHandler} />
                            <button className="loginbutton" type="submit" onClick={this.localSubmitHandler} >Log In</button>
                            {/* <Link to="/signup">
                                <button variant="contained" className="newuserbutton" >New User?</button>
                            </Link> */}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default LogIn