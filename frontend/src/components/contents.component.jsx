import React, { Component } from 'react';

import './styles/contents.style.css';
import reading from '../images/reading.png'

class Contents extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    onClick = () => console.log('clicked');
    render() {
        return (
            <div className="content" role="button" onClick={this.onClick}>
                <img className="read" src={reading} alt="Reading" />
            </div>
        );
    }
}

export default Contents;