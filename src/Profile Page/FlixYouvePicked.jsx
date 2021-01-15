import React from 'react';
import LikedMovies from './LikedMovies';
import "./Profile.css"

class FlixYouvePicked extends React.Component {

    state= {
        likedMovies: []
    }
    
    componentDidMount = () => {
        fetch("http://localhost:3000/liked_movies")
        .then(resp => resp.json())
        .then((likedMoviesArray) => {
            console.log("liked movies array", likedMoviesArray)
            this.setState({
            likedMovies: likedMoviesArray.filter(obj => obj.user.id === this.props.currentUser.id)
            })
        })
        console.log("user's liked movies", this.state.likedMovies)
    }

    deleteLikedMovie = (movieObjId) => {
        let updatedLikedMovies = this.state.likedMovies.filter((movieObj) => {
        return movieObj.id != movieObjId
        })
        this.setState({
            likedMovies: updatedLikedMovies
        })
    }
    
    allLikedMovies = () => {
        return this.state.likedMovies.map((movieObj) => <LikedMovies key={movieObj.id} currentUser={this.props.currentUser} movieObj={movieObj} deleteLikedMovie={this.deleteLikedMovie}/> )
    }

    render() {
    return (
    <div>
        <h1>Flix You've Picked</h1>
        <ul className="cardContainer" >
            {this.allLikedMovies()}
        </ul>
    </div>
    )}

};

export default FlixYouvePicked;