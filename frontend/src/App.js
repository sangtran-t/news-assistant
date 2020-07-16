import React from 'react';

import './App.css';
import ArticlesContainer from "./components/articlescontainer.component";

function App() {
  return (
    <div className="App">
      <div className="main-container" >
        <div className = "section left" >
          <fieldset>
            <legend>Danh sách</legend>
            <div className="contents">
              <ArticlesContainer/>
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

export default App;
