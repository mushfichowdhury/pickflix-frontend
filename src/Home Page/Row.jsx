import React, { Component } from 'react'
import './Row.css'

export default class Row extends Component {
    render() {
        const base_img_url = "https://image.tmdb.org/t/p/original/"
        return (
            <div className="row">
                <h2>{this.props.title}</h2>
                {this.props.movies.map(movie => (
                    <img
                        key={movie["id"]}
                        className="poster"
                        src={`${base_img_url}${movie["poster"]}`}
                        alt="Poster"
                    />
                ))}
            </div>
        )
    }
}
