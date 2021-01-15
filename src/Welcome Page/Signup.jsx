import React from 'react'
import "./LogIn.css"
import { Link } from "react-router-dom"
import { Redirect } from "react-router-dom"

class Signup extends React.Component {

    state = {
    name: "",
    age: "",
    image: "",
    username: "",
    password: "",
    signupComplete: false
}

changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(e.target.value)
}

localSubmitHandler = (e) => {
    e.preventDefault()
    let newUser = {
        name: this.state.name, 
        age: this.state.age,
        image: this.state.image,
        username: this.state.username,
        password: this.state.password
    }
    this.props.submitHandler(newUser)
    this.setState({ name: "", age: "", photo: "", username: "", password: "", signupComplete: true})
    
}
render(){
    if (this.state.signupComplete) {
        return < Redirect to="/pickpage" />
    }
    return (
        <div>
            <div className="back">
                <form onSubmit={this.localSubmitHandler}>
                    <div className="box-input">
                        <input type="name" name="name" placeholder="Name" required value={this.state.name} onChange={this.changeHandler}/>
                        <input type="age" name="age" placeholder="Age" required value={this.state.age} onChange={this.changeHandler}/>
                        <input type="photo" name="image" placeholder="image link" required value={this.state.image} onChange={this.changeHandler}/>
                        <input type="username" name="username" placeholder="Username" required value={this.state.username} onChange={this.changeHandler}/>
                        <input type="password" name="password" placeholder="Password" required value={this.state.password} onChange={this.changeHandler}/>
                        <button type="submit">Sign Up</button> 
                        <Link to="/login">
                            <button variant="contained" class="welcomebutton" >Back to Log In</button>
                        </Link>                       
                    </div>
                </form>
            </div>
        </div>
    );
    }
}

export default Signup