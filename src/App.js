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
    return (
      <div className="App">
        <header id="app-header">
          <div id="header-top-container">
            <div id="logo-container">
              NEKI "LOGO"
            </div>
            <div id='login-container'>
              Link za "fake" login
            </div>
          </div>
          <div id="header-bottom-container">
            <div id="menu-bar">
              <MenuBarContainer
                menuButtons={["Home", "News", "Teams", "Matches", "Player Rankings"]}
              />
            </div>
            <div id="search-container"> <input type="text" placeholder="Search.."></input>
            <button type="submit"><i class="fa fa-search"></i></button></div>
          </div>
        </header>
        <div id="header-content-separator"></div>
        <div id="content-container">

        <ContentContainers />
        </div>
      </div>
    );
  }
}

export default App;
