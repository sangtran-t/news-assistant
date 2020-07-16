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
            contents: "",
            audio: "",
        }
    }
    render() {
        return (
            <div className="article" id={this.props.id}>
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan="2" width="15%">
                                <div className="image"><img src={this.props.image} alt=""/></div>
                            </td>
                            <td>
                                <div className="title">{this.props.title}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="description">{this.props.description}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Article;

