import React, { Component } from 'react';
import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import { Switch, Route } from 'react-router-dom';
import ContentContainers from './ContentContainers';
import SearchFieldContainer from './Components/SearchField/SearchField';

class App extends Component {
  render() {
    let currenturl= this.props.location.pathname;
    if (currenturl==="/") {currenturl="/Home"}
    return (
      <div className="App">
        <div id="navi-bar-bg">
          <div id="navi-bar-container">
            <MenuBar
              menuButtons={["Home", "News", "Teams", "The International", "Heroes"]}
              currentURL={currenturl}
              subLink=""
              className="Menu-link All-pages"
            />
            <SearchFieldContainer />

          </div>
        </div>
        <ContentContainers />

        <div id="footer">
          <div id="footer-content">
            <p>This website is for demonstration purposes only.</p>
            <p>The data on it is mainly based on the OpenDota API
            which is not complete, <span>always fast or up to date.</span></p>
            <p> You can contact me on: nikolapav991@gmail.com </p>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
