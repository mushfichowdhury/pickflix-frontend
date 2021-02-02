import React, { Component } from 'react'
import Row from './Row'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Welcome {this.props.currentUser.name}</h1>
                <Row title="Netflix Originals" movies={this.props.movies} />
                <Row title="Trending" movies={this.props.movies} />
                <Row title="Comedy" movies={this.props.movies}/>

            </div>
        )
    }
}
 