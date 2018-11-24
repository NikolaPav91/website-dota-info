import React, { Component } from 'react';
import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import { Switch, Route } from 'react-router-dom';
import ContentContainers from './ContentContainers';
import SearchFieldContainer from './Components/SearchField/SearchField';

class App extends Component {
  render() {
    let currenturl= this.props.location.pathname;
    if (currenturl==="/") {currenturl="/About"}
    return (
      <div className="App">
        <div id="navi-bar-bg">
          <div id="navi-bar-container">
            <MenuBar
              menuButtons={["About", "News", "Teams", "The International", "Heroes"]}
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
              THE FOOTER
          </div>

        </div>

      </div>
    );
  }
}

export default App;
