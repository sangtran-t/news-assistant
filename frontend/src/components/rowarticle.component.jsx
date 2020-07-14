import React from 'react';

import Article from './article.component';
import Content from './contents.component';
import Audio from './audio.component';

import './styles/rowarticle.style.css'

const RawArticle = () => {
    return (
        <div className="row-article">
            <Article/>
            <Audio/>
            <Content/>
        </div>
    )
}

export default RawArticle;