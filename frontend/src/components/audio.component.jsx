import React, { Component } from 'react';
import './styles/audio.style.css';
import speaking from '../images/speaking.png';

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
        };
    }
    clickSpeaking = () => {
        console.log('Speaking...');
        fetch("http://localhost:1337/audio?id=" + this.props.id)
            .then((res) => res.json())
            .then((result) => {
                return (
                '<audio id="audio-control" controls="controls" autobuffer="autobuffer" autoplay="autoplay" >< source src="data:audio/wav;base64,' + result["audio"] +'" /></audio>'
                );
            });
        console.log('Done');
    }
    render() {
        return (
            <div className="audiobox">
                <img className="audio" src={speaking} alt="Speaking" onClick={this.clickSpeaking} />
            </div>
        );
    }
}

export default Audio;