import React, { Component } from 'react';

import './styles/article.style.css';

class Article extends Component{
    constructor() {
        super();
        this.state = {
            id: "",
            image: "",
            title: "",
            description: "",
            textContent: "",
            audioContent: "",
        }
    }
    render() {
        return (
            <div className="article">
                Article
            </div>
        );
    }
}

export default Article;

