import React, { Component } from 'react';

import './styles/article.style.css';
import defaulImage from '../images/default.jpg';
class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="article" id={this.props.id}>
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan="2" width="160px">
                                <div className="image"><img className="image" src={this.props.image ? this.props.image : defaulImage} alt=""/></div>
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

