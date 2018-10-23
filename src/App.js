import React, { Component } from 'react';
import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import { Switch, Route } from 'react-router-dom';
import ContentContainers from './ContentContainers';
class App extends Component {
  render() {
    let currenturl= this.props.location.pathname;
    if (currenturl==="/") {currenturl="/About"}
    return (
      <div className="App">
        <div id="navi-bar-bg">
          <div id="navi-bar-container">
            <MenuBar
              menuButtons={["About", "News", "Teams", "The International"]}
              currentURL={currenturl}
              subLink=""
              className="Menu-link"
            />
            <div id="search-container"> <input type="text" placeholder="Search.."></input>
            <button type="submit"><i className="fa fa-search"></i></button>
            </div>
          </div>
        </div>

        <ContentContainers />

      </div>
    );
  }
}

export default App;
