import React, { Component } from 'react';

import './styles/contents.style.css';
import reading from '../images/reading.png'

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showedContent:false,
            isLoaded: false,
            contents: null,
        }
    }
    render() {
        return (
            <div className="content" role="button" onClick={async () => {
                await this.setState({
                    showedContent: !this.state.showedContent,
                });
                this.props.data.fetchContents(this.state.showedContent ? this.props.data.article.id : null, this.state.showedContent);
            }}>
                <div className="tootip">
                    <img className="read" src={reading} alt="Reading" />
                    <span className="tooltiptext">Reading</span>
                </div>
            </div>
        );
    }
}

export default Contents;