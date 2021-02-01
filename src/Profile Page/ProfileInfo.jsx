import React from 'react';
import "./ProfileInfo.css"

const ProfileInfo = (props) => {
    console.log(props)
    return (
        <div className="profilephoto">
            <div 
            style={{ backgroundImage: `url(${props.currentUser.image})` }}
            className="profilecard"
            >
                <h1>{props.currentUser.name}</h1>
                <h4>Netflix Binger</h4>
            </div>
            <div className="profileflipped">
                Favorite Movie: Rampage
            </div>
        </div>
    )

};

export default ProfileInfo;