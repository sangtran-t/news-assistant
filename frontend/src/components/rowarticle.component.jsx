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
            
        }
    }
    render() {
        return (
            <div className="row-article">
                <Article {...this.props.data.article}/>
                <Audio data={
                    {
                        article: this.props.data.article,
                        getArticleCurrentPlaying: this.props.data.getArticleCurrentPlaying
                    }} />
                <Content data={{ article: this.props.data.article, fetchContents: this.props.data.fetchContents}}/>
            </div>
        )
    }
}

export default RawArticle;