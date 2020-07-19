import React, { Component } from 'react';
import './styles/assistant.style.css';
import assistantlogo from '../images/assistant.svg';

class Assistant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            displayInput: false,
            sayWhat: 'Chào Mừng!!!',
            chooseArticle: null,
            context: null,
            question: ""
        };
    }

    toggleInput = () => {
        this.setState({
            displayInput: !this.state.displayInput,
        })
    }

    clickSend = async () => {
        var { activeArticle, currentPlaying }=this.props.data;
        console.log('Reading article...' + activeArticle);
        console.log('Playing article...' + currentPlaying);

        // var choosed = currentPlaying ? currentPlaying : activeArticle;
        await this.setState({
            chooseArticle: currentPlaying ? currentPlaying : activeArticle
        })
        console.log("Choosed " + this.state.chooseArticle);

        if (this.state.chooseArticle) {
            console.log("Fetching of " + this.state.chooseArticle);
            await fetch("http://localhost:1337/contents?id=" + this.state.chooseArticle)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            isLoaded: true,
                            context: result['paragraphs_clear']
                        })
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    }
                )
        }
        
        console.table(this.state);
    }



    render() {
        return (
            <div id="assistant">
                <div id="dynamic">
                    {this.state.displayInput ?
                        <div className="sendmessage ">
                            <svg onClick={this.clickSend} height="32px" width="32px" viewBox="0 0 24 24">
                                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fillRule="evenodd" stroke="none"></path>
                            </svg>
                            <input value={this.state.question} onChange={event => {
                                this.setState({
                                    question: event.target.value,
                                })
                            }} placeholder="Nhập câu hỏi..."></input>
                        </div>
                        : <div id="sayhello"><p>{this.state.sayWhat}</p></div>}
                </div>
                <img src={assistantlogo} alt="Assistant" onClick={this.toggleInput}/>
            </div>
        );
    }
}

export default Assistant;