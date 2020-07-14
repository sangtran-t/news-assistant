import React, { Component } from 'react';
import './styles/audio.style.css';
import speaking from '../images/speaking.png';

class Audio extends Component {
    constructor() {
        super();
        this.state = {
            play: false,
        }
    }
    render() {
        return (
            <div className="audiobox" >
                <img className="audio" src={speaking} alt="Speaking"/>
            </div>
        );
    }
}

export default Audio;