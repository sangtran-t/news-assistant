import React, { Component } from 'react';

import './App.css';
import ArticlesContainer from "./components/articlescontainer.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      nameLegend:"GIỚI THIỆU",
      error: null,
      isLoaded: false,
      contents: "TRẦN THANH SANG"
    };
  }

  fetchContents = (articleId) => {
    this.setState({
      contents: (
        <div id="content-loading">
          <svg xmlns = "http://www.w3.org/2000/svg" width="100" height="100" version = "1.0" viewBox = "-30 -30 200 200" >
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
            </animateTransform></g>
          </svg>
        </div>
          )
    })
    fetch("http://localhost:1337/contents?id="+articleId)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
              isLoaded: true,
              contents: result['paragraphs_clear'],
              nameLegend:"NỘI DUNG BÀI ĐỌC"
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            contents: (<div>Error: {error.message}</div>)
          })
        }
      )
  }

  render() {
    return (
      <div className="App">
        <div className="main-container" >
          <div className="section left" >
            <fieldset>  
              <legend>DANH SÁCH BÀI VIẾT</legend>
              <div className="contents">
                <ArticlesContainer data={{ fetchContents: this.fetchContents.bind(this) }} />
              </div>
            </fieldset>
          </div>
          <div className="section right">
            <fieldset>
              <legend>{this.state.nameLegend}</legend>
              <div className="detail-contents">
                {this.state.contents}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
