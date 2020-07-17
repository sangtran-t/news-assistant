import React, { Component } from 'react';

import './styles/contents.style.css';
import reading from '../images/reading.png'

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            contents: null,
        }
    }
    onClick = () => {
        fetch("http://localhost:1337/contents?id=" + this.props.id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.table(result);
                    // this.setState({
                    //     isLoaded: true,
                    //     content: result['paragraphs_clear']
                    // })
                },
                (error) => {
                    console.table(error);
                }
            )
    }
    render() {
        return (
            <div className="content" role="button" onClick={this.onClick}>
                <div className="tootip-read">
                    <img className="read" src={reading} alt="Reading" />
                    <span className="tooltiptext">Reading</span>
                </div>
            </div>
        );
    }
}

export default Contents;