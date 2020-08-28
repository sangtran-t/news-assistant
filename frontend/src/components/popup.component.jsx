import React, { Component } from 'react';
import './styles/popup.style.css';
import cancel from '../images/cancel.svg';

class Popup extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div>{this.props.contents}</div>
                    {this.props.showCloseBtn ? 
                        <img src={cancel} onClick={this.props.closePopup} alt="Close"/> : null}
                </div>
            </div>
        );
    }
}

export default Popup;