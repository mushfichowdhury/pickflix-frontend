import React from 'react';
import Modal from 'react-modal';
import "./Profile.css"
import "./Modal.css"


class LikedMovies extends React.Component {
    state = {
        modal: false
    }

    openModal = () => {
        this.setState({
            modal: true
        })
    }

    closeModal = () => {
        this.setState({
            modal: false
        })
    }

    deleteHandler = () => {
        fetch(`http://localhost:3000/liked_movies/${this.props.movieObj.id}`, {
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            this.props.deleteLikedMovie(this.props.movieObj.id)
        })
    }

    render() {
    let {poster, title, genre} = this.props.movieObj.movie
    return (
    <div className="flexthis" >
        <li>
            <div 
            style={{ backgroundImage: `url(${poster})` }}
            className="pickedcard" >
            </div>
            <div className="button center">
                <button className="likedmoviebutton" onClick={this.openModal} >More Info</button>
                    <Modal
                        isOpen={this.state.modal}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                        <div className="grid-container">
                            <div className="ModalPoster">
                                <div
                                    style={{ backgroundImage: `url(${this.props.movieObj.movie.poster})` }}
                                    className="modalcard" ></div>

                            </div>
                            <div className="ModalTitle">
                                <h3>Title</h3>
                                {this.props.movieObj.movie.title}

                            </div>
                            <div className="ModalPlot">
                                <h3>Genre</h3>
                                {this.props.movieObj.movie.genre}
                                <br></br>
                                <br></br>
                                <h3>Plot</h3>
                                {this.props.movieObj.movie.plot}
                                <br></br>
                                <br></br>
                                <h3>Actors</h3>
                                {this.props.movieObj.movie.actors}
                                <br></br>
                                <br></br>
                                <h3>Director</h3>
                                {this.props.movieObj.movie.director}
                                <br></br>
                                <br></br>
                                <br></br>
                                <button>Watched?</button>
                            </div>
                            {/* <div className="ModalActors">
                               
                            </div> */}
                        </div>
                    </Modal>
                {/* <ModalComponent 
                    movie={this.props.movieObj.movie}
                    isOpen={this.state.modal}
                    onRequestClose={this.closeModal}
                    /> */}
                <div className="divider"/>
                <button className="likedmoviebutton" onClick={this.deleteHandler}>Delete Movie</button>
            </div>
        </li>
    </div>
    )}

};

export default LikedMovies;