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
    render() {
        return (
            <div className="content" role="button" onClick={()=>this.props.data.callback(this.props.data.article.id)}>
                <div className="tootip">
                    <img className="read" src={reading} alt="Reading" />
                    <span className="tooltiptext">Reading</span>
                </div>
            </div>
        );
    }
}

export default Contents;