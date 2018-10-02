import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TeamsPageContainer from './Components/TeamsPage/TeamsPage';
import HomePageContainer from './Components/HomePage/HomePage';
import NewsPageContainer from './Components/NewsPage/NewsPage';
import MatchesPageContainer from './Components/MatchesPage/MatchesPage';
import PlayerRankingPageContainer from './Components/PlayerRankingPage/PlayerRankingPage';
import TeamIdPage from './Components/TeamIdPage/TeamIdPage';


const ContentContainers= ()=> (
  <Switch>
    <Route exact path='/' render={(props) => <HomePageContainer />}
    />
    <Route exact path='/About' render={(props) => <HomePageContainer />}
    />
    <Route exact path='/News' render={(props) => <NewsPageContainer />}
    />
    <Route exact path='/Teams' render={(props) => <TeamsPageContainer />}
    />
    <Route exact path='/Matches' render={(props) => <MatchesPageContainer />}
    />
    <Route exact path='/The International' render={(props) => <PlayerRankingPageContainer />}
    />


    <Route exact path='/Teams/:teamId'  render={(props) => <TeamIdPage bla={props}/>}
    />
    <Route exact path='/Teams/:teamId' component= {TeamIdPage}
    />



  </Switch>
)
export default ContentContainers
