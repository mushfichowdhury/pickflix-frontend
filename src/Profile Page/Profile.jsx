import React from 'react';
import FlixYouvePicked from './FlixYouvePicked'
import FlixYouveWatched from './FlixYouveWatched'
import "./Profile.css"


class Profile extends React.Component {
    state = {
        users: []
    }

    componentDidMount = () => {
        fetch("https://pick-flix.herokuapp.com/users")
        .then(resp => resp.json())
        .then(userdata => {
            this.setState({
                users: userdata
            })
        })
    }
    
    
    render() {
        console.log("Profile.jsx props:", this.props.currentUser)
    return (
        <div class="profile-grid-container">
            <div class="ProfilePhoto">
                <div className="profile">
                    <div className="photocircle" >
                        <img className="profilepic" src={this.props.currentUser.image} alt="profile pic"/>
                    </div>
                </div>
            </div>
            
            <div class="Name">
                <h1>{this.props.currentUser.name}</h1>
            </div>

        <div class="Details"></div>
        <div class="UserInfo"></div>
        <div class="FavoriteMovies"></div>
        <div class="RecentlyWatched"></div>
        <div class="WantToWatch"></div>
                    
        <div class="UserStats"></div>
        </div>
    )}

};

export default Profile;