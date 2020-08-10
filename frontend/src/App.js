import React, { Component } from 'react';

import './App.css';
import ArticlesContainer from './components/articlescontainer.component';
import Assistant from './components/assistant.component';
import Navigation from './components/topbar.component';

import automaticcontrast from './images/automatic-contrast.svg';
import database from './images/database.svg';
import setting from './images/setting.svg';
import online from './images/online.svg';
import rating from "./images/rating.svg";
import address from './images/address.svg';
import info from './images/info.svg';
import uit from './images/uit.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      nameLegend:"GIỚI THIỆU",
      error: null,
      isLoaded: false,
      contents:
        <div id="intro-container">
          <img src={uit} width="100%" alt="UIT"/>
          <p><b>DEMO ĐỌC HIỂU TỰ ĐỘNG TRÊN VĂN BẢN TIN TỨC SỨC KHỎE TIẾNG VIỆT</b></p>
          <div id="intro">
            <fieldset>
              <legend>Sinh viên thực hiện</legend>
              <div className="row-intro">
                <p>TRẦN THANH SANG - 16521784</p>
                <p>HUỲNH VĂN TÍN - 16521827</p>
              </div>
            </fieldset>
            <fieldset>
              <legend>Giảng viên hướng dẫn</legend>
              <div className="row-intro">
              <p>ThS. NGUYỄN VĂN KIỆT</p>
              <p>TS. NGUYỄN LƯU THÙY NGÂN</p>
            </div>
            </fieldset>
          </div>
        </div>,
      activeArticle: null,
      currentPlaying:null
    };
  }

  getArticleCurrentPlaying = (articleId) => {
    // console.log("Current playing "+articleId);
    this.setState({
      currentPlaying: articleId,
    })
  }

  fetchContents = (articleId, state) => {
    if (state) {
      this.setState({
        contents: (
          <div id="content-loading">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" version="1.0" viewBox="-30 -30 200 200" >
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
    fetch(process.env.REACT_APP_BE_API_ENDPOINT + "/contents?id=" + articleId)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            contents: result["paragraphs_clear"],
            nameLegend: "NỘI DUNG BÀI ĐỌC",
            activeArticle: articleId,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            contents: <div>Error: {error.message}</div>,
          });
        }
      );
    }
    else {
      this.setState({
        activeArticle: null,
        contents: (
          <div id="intro-container">
            <img src={uit} width="100%" alt="UIT" />
            <p>
              <b>
                DEMO ĐỌC HIỂU TỰ ĐỘNG TRÊN VĂN BẢN TIN TỨC SỨC KHỎE TIẾNG VIỆT
              </b>
            </p>
            <div id="intro">
              <fieldset>
                <legend>Sinh viên thực hiện</legend>
                <div className="row-intro">
                  <p>TRẦN THANH SANG - 16521784</p>
                  <p>HUỲNH VĂN TÍN - 16521827</p>
                </div>
              </fieldset>
              <fieldset>
                <legend>Giảng viên hướng dẫn</legend>
                <div className="row-intro">
                  <p>ThS. NGUYỄN VĂN KIỆT</p>
                  <p>TS. NGUYỄN LƯU THÙY NGÂN</p>
                </div>
              </fieldset>
            </div>
          </div>
        ),
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Navigation/>
        <div className="main-container" >
          <div className="section menubar">
            <div className="top" >
              <div className="menu-icons setting">
                  <img src={setting} alt="Setting"/>
              </div>
              <div className="menu-icons online">
                  <img src={online} alt="Online"/>
              </div>
              <div className="menu-icons database">
                  <img src={database} alt="Database"/>
              </div>
              <div className="menu-icons rating">
                  <img src={rating} alt="Rating"/>
              </div>
              <div className="menu-icons address">
                  <img src={address} alt="Address"/>
              </div>
              <div className="menu-icons info">
                <img src={info} alt="Info"/>
              </div>
            </div>
            <div className = "bottom">
              <div className="menu-icons automaticcontrast">
                  <img src={automaticcontrast} alt="automatic-contrast"/>
              </div>
            </div>
          </div>
          <div className="section left" >
            <fieldset>  
              <legend>DANH SÁCH BÀI VIẾT</legend>
              <div className="contents">
                < ArticlesContainer data = {
                  {
                    fetchContents: this.fetchContents.bind(this),
                    getArticleCurrentPlaying:this.getArticleCurrentPlaying.bind(this)
                  }
                }
                />
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
            <Assistant data={
              {
                activeArticle: this.state.activeArticle,
                currentPlaying: this.state.currentPlaying
              }
            } />
          </div>
        </div>
        <div className="copyright">
          <span>Made with</span> 
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heartbeat" className="svg-inline--fa fa-heartbeat fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#e00" d="M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z"></path></svg>
          <span>ISE-UIT</span> 
        </div>
      </div>
    );
  }
}
export default App;
