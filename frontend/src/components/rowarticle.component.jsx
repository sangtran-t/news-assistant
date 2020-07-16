import React from 'react';

import Article from './article.component';
import Content from './contents.component';
import Audio from './audio.component';

import './styles/rowarticle.style.css'

const RawArticle = (article) => {
    return (
        <div className="row-article">
            <Article {...article}/>
            <Audio {...article}/>
            <Content {...article}/>
        </div>
    )
}

export default RawArticle;