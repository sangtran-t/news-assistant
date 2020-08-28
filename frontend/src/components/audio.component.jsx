import React, { Component } from 'react';
import './styles/audio.style.css';
import speaking from '../images/speaking.png';

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
          play: false,
          isLoaded: false,
          audioElem: null
        };
    }


    clickSpeaking = () => {
        this.setState({
            audioElem: (
                <svg id="audio-loading" xmlns="http://www.w3.org/2000/svg" version="1.0" width="32px" height="32px" viewBox="0 0 128 128">
                    <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" /><g>
                    <circle cx="16" cy="64" r="16" fill="#000000" fillOpacity="1" />
                    <circle cx="16" cy="64" r="14.344" fill="#000000" fillOpacity="1" transform="rotate(45 64 64)" />
                    <circle cx="16" cy="64" r="12.531" fill="#000000" fillOpacity="1" transform="rotate(90 64 64)" />
                    <circle cx="16" cy="64" r="10.75" fill="#000000" fillOpacity="1" transform="rotate(135 64 64)" />
                    <circle cx="16" cy="64" r="10.063" fill="#000000" fillOpacity="1" transform="rotate(180 64 64)" />
                    <circle cx="16" cy="64" r="8.063" fill="#000000" fillOpacity="1" transform="rotate(225 64 64)" />
                    <circle cx="16" cy="64" r="6.438" fill="#000000" fillOpacity="1" transform="rotate(270 64 64)" />
                    <circle cx="16" cy="64" r="5.375" fill="#000000" fillOpacity="1" transform="rotate(315 64 64)" />
                    <animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite">
                    </animateTransform></g>
                </svg>
            )
        })
        if (!this.state.play) {
            console.log('Speaking...');
            fetch(process.env.REACT_APP_BE_API_ENDPOINT+"/audio?id=" + this.props.data.article.id)
                .then((res) => res.json())
                .then(
                    (result) => {
                        var encode = "data:audio/wav;base64," + result['audio'];
                        this.setState({
                            play: !this.state.play,
                            isLoaded: true,
                            audioElem: (
                                <audio id="audio-control" controls="controls"
                                    autobuffer="autobuffer" autoPlay="autoPlay">
                                    <source src={encode} />
                                </audio>
                            )
                        });
                        this.props.data.getArticleCurrentPlaying(this.props.data.article.id);
                    },
                    (error) => {
                        this.setState({
                            play: !this.state.play,
                            isLoaded: true,
                            error,
                        });
                    }  
                );
        } else {
            console.log("Turn off speaking!");

            this.setState({
            play: !this.state.play,
            isLoaded: false,
            audioElem: null,
            });

            this.props.data.getArticleCurrentPlaying(null);
        }
    }
    render() {
        return (
            <div id="audio-container" className="audiobox" >
                <div className="tootip">
                    <img className="audio" src={speaking} alt="Speaking" onClick={this.clickSpeaking} />
                    <span className="tooltiptext">Speaking</span>
                </div>
                {this.state.audioElem}
            </div>
        );
    }
}

export default Audio;

