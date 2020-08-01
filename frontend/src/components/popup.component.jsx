import React, { Component } from 'react';
import './styles/popup.style.css';
import cancel from '../images/cancel.svg';

class Popup extends Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div>{this.props.contents}</div>
                    <img src={cancel} onClick={this.props.closePopup} alt="Close"/>
                </div>
            </div>
        );
    }
}

export default Popup;