import React, { Component } from 'react';

import './App.css';
import ArticlesContainer from "./components/articlescontainer.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  

  render() {
    return (
      <div className="App">
        <div className="main-container" >
          <div className="section left" >
            <fieldset>
              <legend>Danh sách</legend>
              <div className="contents">
                <ArticlesContainer />
              </div>
            </fieldset>
          </div>
          <div className="section right">
            <fieldset>
              <legend>About</legend>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
