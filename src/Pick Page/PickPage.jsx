import React from 'react';
import TinderCards from './TinderCards'


const PickPage = (props) => {

    return (
    <div>
        <TinderCards currentUser={props.currentUser}/>
    </div>
    )

};

export default PickPage;