import React from 'react';
import TinderCard from 'react-tinder-card';
import "./TinderCards.css"
import _ from 'underscore'
class TinderCards extends React.Component {

    state= {
        movies: [],
        likedMovies: [],
        likedArray: [],
        deck: []
    }


    componentDidMount = () => {
        fetch("https://pick-flix.herokuapp.com/movies")
            .then(resp => resp.json())
            .then((moviesArray) => {
                this.setState({
                    movies: moviesArray,
                    deck: _.sample(moviesArray, 50)
                })
            })

        fetch("https://pick-flix.herokuapp.com/liked_movies")
            .then(resp => resp.json())
            .then((data) => {
                this.setState({
                    likedMovies: data
                })
            })
    }

    addLikedMovie = (movie) => {
        let likedMovieObj = {
            user_id: this.props.currentUser.id,
            movie_id: movie.id
        }
        if (this.state.likedMovies.filter((obj) => { return obj.user.id === this.props.currentUser.id }).map(obj => obj.movie.movie_id).includes(movie.movie_id)) {
            console.log("Did not add")
            alert("You've already picked this flix!")
        }
        else {
            console.log("adding movie")
            fetch("https://pick-flix.herokuapp.com/liked_movies", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    Accepts: 'application/json'
                },
                body: JSON.stringify(likedMovieObj)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState((prevState) => ({
                        likedMovies: [...prevState.likedMovies, data]
                    }))
                    this.checkIfMovieMatched(data)
                })
        }
    }

    checkIfMovieMatched = (data) => {
        if (this.state.likedMovies.filter((obj) => { return obj.user.id !== data.user.id }).map(obj => obj.movie.id).includes(data.movie.id)) {
            alert("You've got a match!")
        }
        else {
            console.log("movie did not match")
        }
    }

    swipeHandler = (dir, movie) => {
        if (dir === 'right') {
            this.setState((prevState) => ({
                likedArray: [...prevState.likedArray, movie],
                lastDirection: dir
            }))
            console.log(movie)
            this.addLikedMovie(movie)
        }
        else {
            movie.priority -= 1
            this.setState({ lastDirection: dir })
        }
    }

    render() {
        console.table("DECK", this.state.deck)
        const base_img_url = "https://image.tmdb.org/t/p/original/"
    return (
        <div className="root">
            <div>
                {this.state.lastDirection === 'right' ? <div className="flex"><h2 className='infoText'>Added to Liked Movies!</h2></div> 
                : this.state.lastDirection === 'left' ? <div className="flex"><h2 className='infoText'>That Movie Sucked!</h2></div> 
                : <h2 className='infoText'>Swipe a card to get started!</h2>}
            </div>
            <div className="tinderposterContainer" >
            {this.state.deck.map(movie => (
                
                <TinderCard
                className="swipe"
                key={movie["id"]}
                preventSwipe={['up', 'down']}
                onSwipe={(dir) => this.swipeHandler(dir, movie)}
                >
                    <div className="tinderposter">
                    <h1>{movie["name"]}</h1>
                    <img src={`${base_img_url}${movie["poster"]}`} alt="poster" />
                    {/* <h4>{movie["genre"]}</h4> */}
                    {/* <h5>{movie["overview"]}</h5> */}
                </div>
                </TinderCard>
            ))}
            </div>
        </div>
    )
    }
}   

export default TinderCards
