import React from 'react';
import FlixYouvePicked from './FlixYouvePicked'
import FlixYouveWatched from './FlixYouveWatched'
import "./Profile.css"
import ProfileInfo from './ProfileInfo';


class Profile extends React.Component {
    state = {
        users: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/users")
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
    <div class="grid-container">
        {/* <div class="Watched-Movies">
            <FlixYouveWatched />
        </div> */}

        <div class="ProfileInfo">
            <ProfileInfo currentUser={this.props.currentUser} />
        </div>

        <div class="Liked-Movies">
            <FlixYouvePicked currentUser={this.props.currentUser}/>
        </div>

    </div>
    )}

};

export default Profile;