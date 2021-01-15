import React from 'react';
import "./TinderCards.css"

class GenreFilter extends React.Component {

    genreChange = (e) => {
    this.props.changeGenreFilter(e.target.value)
    }

    languageChange = (e) => {
    this.props.changeLanguageFilter(e.target.value)
    }

    mediaChange = (e) => {
    this.props.changeMediaFilter(e.target.value)
    }

    render () {
    return (
        <nav className="filters">
        <h4>Genre:</h4>
        <select id="movieFilter" value={this.props.genreFilter} onChange={this.genreChange} >
            <option value="All">All</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
        </select>

        <h4>Language:</h4>
        <select id="movieFilter" value={this.props.languageFilter} onChange={this.languageChange} >
            <option value="English">English</option>
            <option value="Korean">Korean</option>
            <option value="Spanish">Spanish</option>
        </select>

        <h4>Media:</h4>
        <select id="movieFilter" value={this.props.mediaFilter} onChange={this.mediaChange} >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
        </select>

        {/* <h4>Minimum Year of Release</h4>
        <select id="movieFilter" value={this.props.movieFilter} onChange={this.handleChange} >
            <option value="None">None</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
        </select>
        

        <h4>Minimum IMDB Rating</h4>
        <select id="movieFilter" value={this.props.movieFilter} onChange={this.handleChange} >
            <option value="None">None</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </select>

        <h4>Award Winning</h4>
        <select id="movieFilter" value={this.props.movieFilter} onChange={this.handleChange} >
            <option value="Yes">Yes</option>
            <option value="N/A">No</option>
        </select> */}
        </nav>

    );}

};

export default GenreFilter;