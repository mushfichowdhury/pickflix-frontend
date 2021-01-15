import React from 'react';
import Modal from 'react-modal'
import './Modal.css'

class ModalComponent extends React.Component {
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
    render(){
        return (
            <Modal
                isOpen={this.state.modal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div class="grid-container">
                    <div class="ModalPoster">
                        <div
                            style={{ backgroundImage: `url(${this.props.movie.poster})` }}
                            className="modalcard" ></div>

                    </div>
                    <div class="ModalTitle">
                        <h1>{this.props.movie.title}</h1>

                    </div>
                    <div class="ModalPlot">
                        {this.props.movie.plot}

                    </div>
                </div>
            </Modal>
        )
    }
    

};

export default Modal;




