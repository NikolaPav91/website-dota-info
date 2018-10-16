import React, { Component } from 'react';
import './App.css';
import MenuBarContainer from './Components/MenuBar/MenuBar';
import { Switch, Route } from 'react-router-dom';
import TeamsPageContainer from './Components/TeamsPage/TeamsPage';
import HomePageContainer from './Components/HomePage/HomePage';
import NewsPageContainer from './Components/NewsPage/NewsPage';
import MatchesPageContainer from './Components/MatchesPage/MatchesPage';
import PlayerRankingPageContainer from './Components/PlayerRankingPage/PlayerRankingPage';
import TeamIdPage from './Components/TeamIdPage/TeamIdPage';
import ContentContainers from './ContentContainers';
class App extends Component {
  render() {
    let currenturl= this.props.location.pathname;
    if (currenturl==="/") {currenturl="/About"}
    return (
      <div className="App">
        <div id="navi-bar-bg">
          <div id="navi-bar-container">
            <MenuBarContainer
              menuButtons={["About", "News", "Teams", "The International"]}
              currentURL={currenturl}
              subLink=""
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
