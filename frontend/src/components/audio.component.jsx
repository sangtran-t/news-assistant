import React, { Component } from 'react';
import './styles/audio.style.css';
import speaking from '../images/speaking.png';

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            audioElem: null
        };
    }

    clickSpeaking = () => {
        if (!this.state.play) {
            console.log('Speaking...');
            fetch("http://localhost:1337/audio?id=" + this.props.id)
                .then((res) => res.json())
                .then((result) => {
                    var encode = "data:audio/wav;base64," + result['audio'];
                    this.setState({
                        play: !this.state.play,
                        audioElem: (
                            <audio id="audio-control" controls="controls"
                                    autobuffer="autobuffer" autoPlay="autoPlay">
                                    <source src={encode} />
                            </audio>
                        ),
                    });
                });
        } else {
            console.log("Turn off speaking!");
            this.setState({
                play: !this.state.play,
                audioElem: null
            })
        }
    }
    render() {
        return (
            <div id = "audio-container" className = "audiobox" >
                <img className="audio" src={speaking} alt="Speaking" onClick={this.clickSpeaking} />
                {this.state.audioElem}
            </div>
        );
    }
}

export default Audio;