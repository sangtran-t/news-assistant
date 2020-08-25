import React, { Component } from 'react';

import './styles/assistant.style.css';
import assistantlogo from '../images/assistant.svg';
import viewdetail from '../images/viewdetails.png';
import Popup from './popup.component';
class Assistant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            displayInput: false,
            sayWhat: 'Wellcome !',
            chooseArticle: null,
            context: null,
            question: "",
            answer: null,
            audioAnswer: null,
            speeching: false,
            speechLoaded: true,
            showPopup: false,
            score: 0,
            loading: false
        };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    toggleInput = () => {
        this.setState({
            displayInput: !this.state.displayInput,
            answer: null,
            question: "",
        });
    }

    audioEndedHandle = () => {
        // console.log('Audio Ended')
        this.setState({
            audioAnswer: null,
            speeching: false,
            speechLoaded:true
        });
    }

    audioPlayHandle = () => {
        // console.log('Audio Playing');
        this.setState({
            speeching:true
        })
    }

    convertText2Speech = async (textString) => {
        const URL = process.env.REACT_APP_MRC_BOT_ENDPOINT+"/speech?text="+textString;
        await fetch(URL, {method: 'POST'})
            .then(res => res.json())
            .then(
                async (result) => {
                    // console.log(result);
                    await this.setState({
                        speechLoaded: true,
                        audioAnswer: (
                            <audio autobuffer="autobuffer" autoPlay onEnded={this.audioEndedHandle} onPlaying={this.audioPlayHandle}>
                                <source src={"data:audio/wav;base64," + result['audioContent']} />
                            </audio>),
                    })
                },
                async (error) => {
                    this.setState({
                        audioElem: null,
                        speechLoaded: true,
                        error
                    })
                }
            )
    }

    clickSend = async () => {
        this.setState({
            answer:null,
            audioAnswer: null,
            isLoaded: false,
            speechLoaded: false,
            loading:true
        });
        var { activeArticle, currentPlaying }=this.props.data;
        // console.log('Reading article...' + activeArticle);
        // console.log('Playing article...' + currentPlaying);

        // var choosed = currentPlaying ? currentPlaying : activeArticle;
        await this.setState({
            chooseArticle: currentPlaying ? currentPlaying : activeArticle
        })
        // console.log("Choosed " + this.state.chooseArticle);

        if (this.state.chooseArticle && this.state.question) {
            // console.log("Fetching of " + this.state.chooseArticle);
            // await fetch(process.env.REACT_APP_BE_API_ENDPOINT+"/contents?id=" + this.state.chooseArticle)
            await fetch(process.env.REACT_APP_MRC_BOT_ENDPOINT + "/relevant?q=" + this.state.question)
                .then(res => res.json())
                .then(
                    async (result) => {
                        // console.log(result);
                        result['score'] > 0.5 ?
                            this.setState({
                                isLoaded: true,
                                score: result['score'],
                                context: result['contents']
                            }) : (
                            await fetch(process.env.REACT_APP_BE_API_ENDPOINT + "/contents?id=" + this.state.chooseArticle)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        this.setState({
                                            score:0,
                                            isLoaded: true,
                                            context: result['paragraphs_clear']
                                        })
                                    },
                                    (error) => {
                                        this.setState({
                                            score:0,
                                            isLoaded: true,
                                            error
                                        })
                                    }
                                )
                            )
                    },
                    (error) => {
                        this.setState({
                            score:0,
                            isLoaded: true,
                            error
                        })
                    }
                )
        
            await fetch(process.env.REACT_APP_MRC_BOT_ENDPOINT + "/predict", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ctx: this.state.context, q: this.state.question })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            loading: false,
                            answer: result,
                        })
                    },
                    (error) => {
                        this.setState({
                            answer:null,
                            isLoaded: true,
                            loading: false,
                            error
                        })
                    }
                )
        
            // console.table(this.state);
            
            this.state.answer ? this.convertText2Speech('Câu trả lời bạn cần tìm là: ' + this.state.answer['answer'] + '.')
                : this.convertText2Speech('Rất xin lỗi, hiện tại hệ thống không thể đáp ứng yêu cầu của bạn.')
        } else {
            this.setState({
                isLoaded: true,
            })
            this.convertText2Speech('Vui lòng chọn bài báo và đặt câu hỏi.')
        }
    }
    
    getHighlightedText(text, highlight, score) {
        const escapeRegExp = (string) => {
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
        };
        const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, 'gi'));
        return(
            <span>
                {parts.map((part, i) =>
                    <span key={i} style={part === highlight && i < 2 ?
                        { fontWeight: 'bold', backgroundColor: 'aqua', borderRadius: '5px' } : {}}>
                        {part}
                    </span>)
                }
                <p style={{ fontWeight: 'bold', marginBottom: '0px' }}>Score: <span style={{ color: 'green' }}>{score}</span></p>
            </span>
        );
    }

    render() {
        return (
            <div id="assistant">
                <div id="dynamic">
                    {this.state.displayInput ? (
                        <div id="question-answer">
                        <div className="sendmessage">
                            {(this.state.speeching) ? (
                                <div id="bars">
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                </div>
                            ) : (this.state.speechLoaded) ? (
                                <svg style={{visibility: this.state.question ? 'visible' : 'hidden' }} onClick={this.clickSend} height="32px" width="32px" viewBox="0 0 24 24">
                                    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fillRule="evenodd" stroke="none"></path>
                                    </svg>
                                ) : (
                                        <svg id="speech-loading" xmlns="http://www.w3.org/2000/svg" version="1.0" width="32px" height="32px" viewBox="0 0 128 128">
                                            <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" /><g>
                                                <circle cx="16" cy="64" r="16" fill="#000000" fillOpacity="1" />
                                                <circle cx="16" cy="64" r="14.344" fill="#000000" fillOpacity="1" transform="rotate(45 64 64)" />
                                                <circle cx="16" cy="64" r="12.531" fill="#000000" fillOpacity="1" transform="rotate(90 64 64)" />
                                                <circle cx="16" cy="64" r="10.75" fill="#000000" fillOpacity="1" transform="rotate(135 64 64)" />
                                                <circle cx="16" cy="64" r="10.063" fill="#000000" fillOpacity="1" transform="rotate(180 64 64)" />
                                                <circle cx="16" cy="64" r="8.063" fill="#000000" fillOpacity="1" transform="rotate(225 64 64)" />
                                                <circle cx="16" cy="64" r="6.438" fill="#000000" fillOpacity="1" transform="rotate(270 64 64)" />
                                                <circle cx="16" cy="64" r="5.375" fill="#000000" fillOpacity="1" transform="rotate(315 64 64)" />
                                                <animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite">
                                                </animateTransform>
                                            </g>
                                        </svg>)}
                            <input autoFocus value={this.state.question} onChange={event => {
                                this.setState({
                                    question: event.target.value,
                                })
                                }} placeholder="Nhập câu hỏi...">
                            </input>
                            {this.state.audioAnswer}
                        </div>
                        <div id="answerbox">
                            <div id="answerbox-inner">
                                    <textarea rows="4" readOnly placeholder={this.state.loading ? "" : "Nội dung câu trả lời"}
                                        value={this.state.answer ? "Trả lời:\n" + this.state.answer['answer'] : ""} />
                                    {this.state.loading ? <ul className="drops blue">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul> : null}
                            </div>
                            <img src={viewdetail} alt="ViewDetail" onClick={this.togglePopup.bind(this)}
                                style={{visibility: this.state.answer ? 'visible' : 'hidden' }}  />
                            {this.state.showPopup ?
                                <Popup contents={this.state.context ?
                                    this.getHighlightedText(this.state.context, this.state.answer['answer'], this.state.score) : "Không có nội dung!"}
                                closePopup={this.togglePopup.bind(this)}/> : null
                            }
                        </div>
                    </div>)
                        : <div id="sayhello"><p>{this.state.sayWhat}</p></div>}
                </div>
                <img src={assistantlogo} alt="Assistant" onClick={this.toggleInput}/>
                
            </div>
        );
    }
}

export default Assistant;