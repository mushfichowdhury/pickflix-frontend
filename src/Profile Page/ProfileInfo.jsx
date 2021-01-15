import React from 'react';
import "./ProfileInfo.css"

const ProfileInfo = (props) => {
    console.log(props)
    return (
        <div 
        style={{ backgroundImage: `url(${props.currentUser.image})` }}
        className="card">
            <h1>{props.currentUser.name}, {props.currentUser.age}</h1>
            <h4>Netflix Binger</h4>
        </div>
    )

};

export default ProfileInfo;