import React, { Component } from 'react';

import Article from './article.component';
import Content from './contents.component';
import Audio from './audio.component';

import './styles/rowarticle.style.css'

// const RawArticle = (article, callback) => {
//     return (
//         <div className="row-article">
//             <Article {...article}/>
//             <Audio {...article}/>
//             <Content {...article}/>
//         </div>
//     )
// }

class RawArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            article:this.props.data.article
        }
    }
    render() {
        return (
            <div className="row-article">
                <Article {...this.state.article}/>
                <Audio {...this.state.article}/>
                <Content data={{ article: this.state.article, callback: this.props.data.callback}}/>
            </div>
        )
    }
}

export default RawArticle;