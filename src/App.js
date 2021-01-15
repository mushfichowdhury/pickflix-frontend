import './App.css';
import React, { Component } from 'react';
import NavBar from './NavBar'
import PickPage from './Pick Page/PickPage';
import Welcome from './Welcome Page/Welcome';
import Profile from './Profile Page/Profile';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom'
import LogIn from './Welcome Page/LogIn';
import Signup from './Welcome Page/Signup';
import axios from "axios";
import ls from "local-storage"


class App extends React.Component {
  state = {
    currentUser: "",
    allUsers: [],
    isLoggedIn: false
  }

  componentDidMount = () => {
    this.setState({ currentUser: ls.get("currentUser") || "" })
    fetch("http://localhost:3000/users")
      .then(resp => resp.json())
      .then(users => {
        this.setState({ allUsers: users })
      })
  
  }
  
  signupSubmitHandler = (newUser) => {
    console.log("new user in app.js", newUser)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(r => r.json())
      .then(user => {
        this.setState({ currentUser: user,})
        ls.set("currentUser", user)
      })
  }

  loginSubmitHandler = (userInfo) => {
    let foundUser = this.state.allUsers.find(user => userInfo.username === user.username)
    if (foundUser) {
      console.log("found")
      this.setState({ currentUser: foundUser, isLoggedIn: true })
      ls.set("currentUser", foundUser)
      this.props.history.push("/pickpage")
    }
 }

 logoutHandler = () => {
   this.setState({currentUser: {}})
   ls.remove("currentUser")
 }

  render() {
    console.log("Logged in as:", ls.get("currentUser"))
    return (
      
      <> 
        {ls.get("currentUser") === null ? 
          <div className="root" >
            <div >
              <Route
                path="/pickpage"
                render={(props) => (
                  <PickPage {...props} currentUser={ls.get("currentUser")} />
                )}
              />
              <Route path="/welcome" component={Welcome} />
              <Route path="/profile"
                render={(props) => (
                  <Profile {...props} currentUser={ls.get("currentUser")} />
                )} />
              <Route path="/login"
                render={(routerProps, props) => {
                  return (
                    <LogIn {...props}
                      submitHandler={this.loginSubmitHandler}
                      routerProps={routerProps} />
                  )
                }

                }
              />
              <Route
                path="/signup"
                render={(props) => (
                  <Signup {...props} submitHandler={this.signupSubmitHandler} />
                )}
              />
            </div>
          </div>

        :
        <div className="root" >
            <div >
              <NavBar
                logoutHandler={this.logOutHandler}
                currentUser={ls.get("currentUser")}
              />
              <Route
                path="/pickpage"
                render={(props) => (
                  <PickPage {...props} currentUser={ls.get("currentUser")} />
                )}
              />
              <Route path="/welcome" component={Welcome} />
              <Route path="/profile"
                render={(props) => (
                  <Profile {...props} currentUser={ls.get("currentUser")} />
                )} />
              <Route path="/login"
                render={(routerProps, props) => {
                  return (
                    <LogIn {...props}
                      submitHandler={this.loginSubmitHandler}
                      routerProps={routerProps} />
                  )
                }

                }
              />
              <Route
                path="/signup"
                render={(props) => (
                  <Signup {...props} submitHandler={this.signupSubmitHandler} />
                )}
              />
            </div>
          </div>
    }
      </>     
      
    );
    }
  }

export default withRouter(App)
