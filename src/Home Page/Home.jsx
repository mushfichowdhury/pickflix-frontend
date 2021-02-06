import React, { Component } from 'react'
import './Home.css'
import MovieRow from './MovieRow'

export default class Home extends Component {
    render() {
        return (
            <div class="grid-container">
                <div class="Home">
                    <h1 style={{ textAlign: "center", color: "white"}}>Welcome {this.props.currentUser.name}</h1>
                </div>
                <div class="RecentlyWatched">
                    <MovieRow title="Recently Watched" movies={this.props.movies} />
                </div>
                <div class="TrendingMovies">
                    <MovieRow title="Trending Movies" movies={this.props.movies} />
                </div>
                <div class="TrendingTV">
                    <MovieRow title="Trending TV Shows" movies={this.props.movies} />
                </div>
            </div>
        )
    }
}
 