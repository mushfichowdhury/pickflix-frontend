import React from 'react';
import TinderCard from 'react-tinder-card';
import "./TinderCards.css"
import GenreFilter from './GenreFilter';
import { withAlert } from 'react-alert'
import _ from 'underscore'
// import { Console } from 'console';
// THIS IS OUR PRE-PRESENTATION VERSION. I <3 U
class TinderCards extends React.Component {

    state= {
        movies: [],
        omdbData: [],
        frankensteinMoviesArray: [],
        addedMovieObj: {},
        likedMovies: [],
        likedArray: [],
        lastDirection: "",
        genreFilter: "All",
        languageFilter: "English",
        mediaFilter: "movie",
        data: {},
        isMovieAdded: false,
        genreIdsWithNamesArray: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/movies")
            .then(resp => resp.json())
            .then((moviesArray) => {
                this.setState({
                    movies: moviesArray.sort(() => Math.random() - Math.random()).slice(0, 100).filter(movie => movie.country === "USA" && movie.language === "English" && movie.media === "movie")
                    // movies: moviesArray.filter(movie => movie.country === "USA" && movie.language === "English")
                    // need to render the movies that DO NOT match any of the movies in the likedMovies db
                })
            })
        fetch("http://localhost:3000/liked_movies")
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
        // const alert = this.props.alert;
        // Need to include the current_userid stuff here
        if (this.state.likedMovies.filter((obj) => { return obj.user.id === 1 }).map(obj => obj.movie.netflixid).includes(movie.netflixid)) {
            console.log("Did not add")
            // this.alert.show("You've already picked this flix!")
            alert("You've already picked this flix!")
        }
        else {
            console.log("adding movie")
            fetch("http://localhost:3000/liked_movies", {
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
        if (this.state.likedMovies.filter((obj) => { return obj.user.id !== data.user.id }).map(obj => obj.movie.netflixid).includes(data.movie.netflixid)) {
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

    // BELOW IS THE FRANKENSTEIN VERSION WE WILL COME BACK TO LATER
    // setRandomGenreIds = () => {

    //     let allGenreIds = [10673, 10702, 11804, 11828, 1192487, 1365, 1568, 2125, 2653, 43040, 43048, 4344, 46576, 75418, 76501, 77232, 788212, 801362, 852490, 899, 9584, 10695, 11146, 2653, 2729, 3063, 413820, 452, 6721, 7424, 9302, 10056, 27480, 27950, 28034, 28083, 28233, 48586, 5455, 561, 6218, 6796, 6962, 78120, 783, 89513, 10032, 11093, 13158, 29809, 2994, 31273, 31574, 31694, 32392, 46553, 46560, 46576, 46588, 47147, 47465, 48303, 48586, 48744, 76186, 1009, 10256, 10375, 105, 10778, 11559, 11755, 1208951, 1333288, 1402, 1747, 17648, 2030, 2700, 31694, 3300, 34157, 3519, 3996, 4058, 4195, 43040, 4426, 4906, 52104, 52140, 52847, 5286, 5475, 5610, 56174, 58905, 59169, 61132, 61330, 6197, 63092, 63115, 6548, 711366, 7120, 72407, 7539, 77599, 77907, 78163, 78655, 79871, 7992, 852492, 869, 89585, 9302, 9434, 9702, 9736, 10944, 3675, 4734, 74652, 7627, 9434, 10005, 10105, 10599, 1159, 15456, 180, 2595, 26126, 2760, 28269, 3652, 3675, 4006, 4720, 48768, 49110, 49547, 50232, 5161, 5349, 55087, 56178, 58710, 60026, 6839, 7018, 72384, 77245, 852494, 90361, 9875, 11, 11075, 11714, 1208954, 1255, 12994, 13158, 2150, 25955, 26009, 2696, 2748, 2757, 2893, 29809, 3179, 31901, 34204, 3653, 3682, 384, 3916, 3947, 4282, 4425, 452, 4961, 500, 5012, 52148, 52904, 56169, 5763, 58677, 58755, 58796, 59064, 6206, 62235, 6616, 6763, 68699, 6889, 711367, 71591, 72354, 7243, 7539, 75459, 76507, 78628, 852493, 89804, 9299, 9847, 9873, 26835, 52804, 751423, 3329, 4720, 500, 5977, 65263, 7120, 10695, 10944, 1694, 42023, 45028, 48303, 61546, 75405, 75804, 75930, 8195, 83059, 8711, 89585, 11804, 3269, 384, 4195, 56184, 69192, 7077, 875, 9916, 1192487, 1195213, 1208951, 1208954, 1218090, 78367, 852488, 852490, 852491, 852492, 852493, 852494, 10032, 10741, 1701, 2222, 2856, 5096, 52843, 6031, 13335, 13573, 32392, 52852, 55774, 59433, 84488, 88635, 29281, 36103, 502675, 108533, 11014, 1372, 1492, 1568, 1694, 2595, 2729, 3327, 3916, 47147, 4734, 49110, 50232, 52780, 52849, 5903, 6000, 6926, 852491, 180, 25788, 4370, 5286, 7243, 9327, 10306, 10499, 10504, 10719, 11014, 11140, 1138506, 1321, 1774, 3269, 43048, 46588, 5505, 58798, 65558, 6867, 75390, 78507, 799, 852488, 8933, 89811, 9147, 972, 12739, 51063, 801362, 1365, 43040, 1568, 43048, 11881, 7442, 3761, 6031, 4906, 9847, 10778, 5661, 3327, 760, 5507, 50462, 7424, 2653, 9302, 452, 11146, 3063, 10695, 2729, 1433679, 6721, 5923, 6133, 69616, 29764, 77232, 78104, 2030, 3936, 11075, 5230, 10719, 52387, 89804, 89844, 8195, 69946, 12339, 12762, 262, 846815, 3652, 3179, 90139, 77907, 5480, 12443, 17648, 28269, 4425, 798, 84488, 84489, 69624, 1009, 6051, 3682, 52508, 10757, 12433, 1774, 52140, 52148, 52120, 52117, 52104, 1252, 56174, 56178, 56169, 56181, 63151, 56184, 58704, 846810, 702387, 846807, 783, 3960, 46576, 46560, 48586, 31694, 2994, 29809, 32473, 48303, 31574, 32392, 11093, 31273, 47147, 46588, 46553, 48744, 47465, 10032, 69636, 6548, 78163, 53717, 10118, 49266, 7129, 1105, 528582748, 25955, 6895, 788212, 9584, 4058, 9875, 6889, 5824, 10185, 10499, 26126, 26009, 26146, 37938, 899, 9736, 6206, 3979, 875, 5903, 9434, 10944, 7627, 4734, 74652, 8451, 5080, 59169, 60339, 60026, 59064, 58700, 77951, 869, 45028, 3493, 67673, 59433, 6839, 5763, 4961, 13158, 12994, 3653, 89513, 79871, 9873, 89441, 10606, 89442, 5254, 10659, 52858, 89708, 11079, 26835, 52804, 52855, 58879, 52847, 31901, 51058, 51056, 52849, 9744, 77599, 7687, 62285, 78503, 72436, 3890, 12803, 11828, 4426, 5161, 2150, 8243, 8654, 7462, 6485, 10306, 58905, 58710, 58677, 58807, 58798, 31851, 7120, 4720, 500, 5977, 65263, 63115, 58755, 58886, 65198, 82489, 867737, 5096, 61115, 108663, 108663, 9793, 27018, 5349, 71591, 107985, 393181, 89585, 8711, 11804, 4195, 384, 7077, 3269, 9942, 5051, 10463, 2222, 852490, 852492, 852494, 852493, 1218090, 78367, 852491, 852488, 1192487, 1208951, 1208954, 1195213, 48785, 58750, 3300, 4282, 8221, 6867, 1293326, 4344, 1747, 2893, 10750, 65925, 10398, 1402191, 6000, 799, 711366, 711367, 64256, 1461923, 64256, 1138506, 10271, 413820, 751423, 52843, 28233, 27950, 27480, 28034, 28083, 27346, 8248, 6626, 1989, 5685, 11283, 68699, 67879, 1402, 3996, 15456, 6763, 1613, 88635, 75408, 67708, 10741, 34157, 1333288, 8985, 6695, 34204, 105, 2757, 7825, 67644, 5875, 76501, 77245, 76507, 76510, 2125, 4006, 11, 25804, 4814, 26, 9090, 76186, 947, 10056, 6796, 6962, 6218, 5455, 561, 1701, 90361, 52852, 84483, 13335, 9994, 48768, 49547, 10365, 63782, 1138254, 78120, 78655, 78208, 78628, 78321, 78634, 61132, 78463, 62235, 62510, 78507, 78373, 12123, 75418, 79049, 75459, 75436, 75415, 75390, 75392, 2700, 7018, 6616, 10504, 55087, 2145, 5505, 8721, 36103, 6073, 9833, 3081, 10005, 1408777, 3278, 4649, 5475, 61656, 1255, 502675, 3830, 7153, 3329, 9916, 17241, 17241, 1458609, 8883, 3830, 78250, 60829, 26156, 26052, 11567, 6998, 4922, 11755, 1884, 10599, 2696, 69192, 9292, 1321, 76802, 108533, 1492, 6926, 3916, 1694, 11014, 2595, 52780, 49110, 50232, 9702, 5012, 13573, 53310, 5608, 3903, 10256, 8646, 1519826, 12549, 3215, 3675, 3947, 9196, 61330, 58796, 61546, 61546, 58741, 65558, 67675, 6814, 2760, 9327, 5286, 180, 7243, 4370, 25788, 10702, 9147, 55774, 11559, 29281, 35800, 972, 42023, 11140, 63092, 63975, 62016, 76793, 1516534, 6384, 3519, 9299, 53915, 52147, 60951, 10832, 8933, 1159, 48762, 10673, 7992, 11177, 10375, 7539, 10105, 11714, 83059, 4366, 1372, 83, 5610, 10634, 26105, 52904, 89811, 11522, 9472, 1159493, 75445, 72407, 72384, 72354, 72404, 75432, 75804, 5342, 1800, 6197, 75930, 7700, 1458, 2856, 70023, 75405, 711367, 64256, 2893]
    //     let sampleGenreIds = _.sample(allGenreIds, 10)
    //     let genreIdString = sampleGenreIds.join()
    //     return genreIdString
    // }

    // componentDidMount = () => {
    //     let genreIdString = this.setRandomGenreIds()

    //     fetch("https://unogs-unogs-v1.p.rapidapi.com/api.cgi?t=genres", {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-key": "8afd7ffa98msh66c5e14a405f912p133da5jsne6eb4d751d16",
    //             "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => this.setState({genreIdsWithNamesArray: data["ITEMS"]}))
    //         .catch(err => {
    //             console.error(err);
    //         });
        
    //     fetch(`https://rapidapi.p.rapidapi.com/aaapi.cgi?q=%7Bquery%7D-!1900%2C2018-!0%2C5-!0%2C10-!${genreIdString}-!Any-!Any-!Any-!gt100-!%7Bdownloadable%7D&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and`, {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-key": "8afd7ffa98msh66c5e14a405f912p133da5jsne6eb4d751d16",
    //             "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
    //         }
    //     })
    //         .then(resp => resp.json())
    //         .then(moviesArr => {
    //             this.setState({ movies: moviesArr["ITEMS"] })
    //             this.createMovieObjects(this.state.movies)
    //         })
    //     fetch("http://localhost:3000/liked_movies")
    //         .then(resp => resp.json())
    //         .then((data) => this.setState({ likedMovies: data }))

    // }

    // createMovieObjects = (moviesArr) => {
    //     let apiKey = "91b02583"
    //     let newArray = moviesArr.map(movie => {
    //         this.omdbRequest(movie, apiKey)         
    //     })
    // }

    // omdbRequest = (movie, apiKey) => {
    //     console.log("movie from omdb request", movie)
    //     fetch(`http://omdbapi.com/?i=${movie["imdbid"]}&apikey=${apiKey}&plot=full`)
    //         .then(r=>r.json())
    //         .then(data => {
    //             console.log("line 80", data)
    //             this.setState({ omdbData: data})
    //             movie = {
    //                 "netflixid": movie["netflixid"],
    //                 "title": movie["title"],
    //                 "image": movie["image"],
    //                 "rating": movie["rating"],
    //                 "media": movie["type"],
    //                 "runtime": movie["runtime"],
    //                 "largeimage": movie["largeimage"],
    //                 "imdbid": movie["imdbid"],
    //                 "priority": 10,
    //                 "genre": data["Genre"],
    //                 "year": data["Year"],
    //                 "released": data["Released"],
    //                 "rated": data["Rated"],
    //                 "director": data["Director"],
    //                 "writer": data["Writer"],
    //                 "actors": data["Actors"],
    //                 "plot": data["Plot"],
    //                 "language": data["Language"],
    //                 "country": data["Country"],
    //                 "awards": data["Awards"],
    //                 "poster": data["Poster"],
    //                 "imdbRating": data["imdbRating"],
    //                 "imdbVotes": data["imdbVotes"]
    //             }
    //             this.setState((prevState) => ({frankensteinMoviesArray: [...prevState.frankensteinMoviesArray, movie]}) )  
    //             })
    //             console.log("frankenarray", this.state.frankensteinMoviesArray)
    //         }
    
    // swipeHandler = (dir, movie) => {
    //     if(dir === 'right') {
    //         this.setState((prevState) => ({
    //             likedArray: [...prevState.likedArray, movie],
    //             lastDirection: dir
    //         }))
    //         this.addMovieToDatabase(movie)
    //         console.log(movie)
    //     }
    //     else {
    //         movie.priority -= 1
    //         this.setState({ lastDirection: dir})
    //     }
    // }

    // addMovieToDatabase = (movie) => {
    //     console.log("swiped movie", movie)
    //     fetch("http://localhost:3000/movies", {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //             "accept": "application/json"
    //         },
    //         body: JSON.stringify(movie)
    //     })
    //         .then(r=>r.json())
    //         .then(data => {
    //             console.log("new movie data", data)
    //             this.setState({
    //                 addedMovieObj: data,
    //                 isMovieAdded: true
    //             })

    //         }
    //         )
    //     _.delay(this.addLikedMovie, 1000)
    // }

    // addLikedMovie = () => {
    //         let likedMovieObj = {
    //             user_id: this.props.currentUser.id,
    //             movie_id: this.state.addedMovieObj.id
    //         }
    //         console.log("liked movie object 103", likedMovieObj)
    //         if (this.state.likedMovies.filter((obj) => { return obj.user.id === 1 }).map(obj => obj.movie.netflixid).includes(this.state.addedMovieObj.netflixid)) {
    //             console.log("Did not add")
    //             alert("You've already picked this flix!")
    //         }
    //         else {
    //             console.log("adding movie")
    //             fetch("http://localhost:3000/liked_movies", {
    //                 method: "POST",
    //                 headers: {
    //                     'Content-Type': "application/json",
    //                     "accept": 'application/json'
    //                 },
    //                 body: JSON.stringify(likedMovieObj)
    //             })
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     console.log("data in liked_movies POST", data)
    //                     this.setState((prevState) => ({
    //                         likedMovies: [...prevState.likedMovies, data]
    //                     }))
    //                     this.checkIfMovieMatched(data)
    //                 })
    //         }
            
    // }

    // checkIfMovieMatched = (data) => {
    //     if (this.state.likedMovies.filter((obj) => { return obj.user.id !== data.user.id }).map(obj => obj.movie.netflixid).includes(data.movie.netflixid)) {
    //         alert("You've got a match!")
    //     }
    //     else {
    //         console.log("movie did not match")
    //     }
    // }

    // changeGenreFilter = (filterValue) => {
    //     this.setState({
    //         genreFilter: filterValue
    //     })
    // }

    // changeLanguageFilter = (filterValue) => {
    //     this.setState({
    //         languageFilter: filterValue
    //     })
    // }

    // changeMediaFilter = (filterValue) => {
    //     this.setState({
    //         mediaFilter: filterValue
    //     })
    // }

    // filterAllMovies = () => {
    //     let arrayToReturn = this.state.movies
    //     if(this.state.genreFilter !== "All"){
    //         arrayToReturn = this.state.movies.filter((movieObj) => {
    //             return movieObj.includes(this.state.genreFilter)
    //     })
    //     }
    //     this.setState({
    //         movies: arrayToReturn
    //     })
    // }

    render() {
        // let someMovies = this.state.movies.splice(0, 10)
        let smallDeck = this.state.frankensteinMoviesArray.splice(0, 10)
        let deckOfCards = _.sample(this.state.frankensteinMoviesArray, 10)
        console.log("Deck", deckOfCards)
        console.log("all movies", this.state.frankensteinMoviesArray)
    return (
        <div className="root">
            {/* <GenreFilter
                genreFilter={this.state.genreFilter}
                languageFilter={this.state.languageFilter}
                mediaFilter={this.state.mediaFilter}
                changeGenreFilter={this.changeGenreFilter}
                changeLanguageFilter={this.changeLanguageFilter}
                changeMediaFilter={this.changeMediaFilter}
            />
                <br></br>
                <hr></hr>
                <br></br> */}
            <div>
                {this.state.lastDirection === 'right' ? <div className="flex"><h2 className='infoText'>Added to Liked Movies!</h2></div> 
                : this.state.lastDirection === 'left' ? <div className="flex"><h2 className='infoText'>That Movie Sucked!</h2></div> 
                : <h2 className='infoText'>Swipe a card to get started!</h2>}
            </div>
            <div className="cardContainer" >
            {this.state.movies.map(movie => (
                <TinderCard
                className="swipe"
                key={movie["netflixid"]}
                preventSwipe={['up', 'down']}
                onSwipe={(dir) => this.swipeHandler(dir, movie)}
                >
                <div 
                style={{ backgroundImage: `url(${movie["poster"]})` }}
                className="card">
                    <h1>{movie["title"]}</h1>
                    <h4>{movie["genre"]}</h4>
                    {/* <h5>{movie.plot}</h5> */}
                </div>
                </TinderCard>
            ))}
            </div>
        </div>
    )
    }
}   

export default TinderCards
