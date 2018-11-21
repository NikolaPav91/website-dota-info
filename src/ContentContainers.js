import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TeamsPageContainer from './Components/TeamsPage/TeamsPage';
import HomePage from './Components/HomePage/HomePage';
import NewsPage from './Components/NewsPage/NewsPage';
import HeroesPage from './Components/HeroesPage/HeroesPage';
import PageTheInternational from './Components/PageTheInternational/PageTheInternational';
import TeamIdPageContainer from './Components/TeamIdPage/TeamIdPage';
import News from './Components/MyDatabase/News-objects';
import NewsIdPage from './Components/NewsIdPage/NewsIdPage';
import PlayerIdPageContainer from './Components/PlayerIdPage/PlayerIdPage';
import SearchResultsPageContainer from './Components/SearchResultsPage/SearchResultsPage';


const ContentContainers= ()=> (
  <Switch>
    <Route exact path='/' render={(props) => <HomePage />}
    />
    <Route exact path='/About' render={(props) => <HomePage />}
    />
    <Route exact path='/News' render={(props) => <NewsPage />}
    />
    <Route exact path='/Teams' render={(props) => <TeamsPageContainer />}
    />
    <Route exact path='/Heroes' render={(props) => <HeroesPage />}
    />
    <Route path='/The International' render={(props) => <PageTheInternational routerprops={props} />}
    />

    <Route exact path='/News/:newsId' render={(props) => <NewsIdPage key={props.match.params.newsId} currentNews={News} routerprops={props}/>}
    />
    <Route exact path='/Teams/:teamId' render= {(props)=> <TeamIdPageContainer key={props.match.params.teamId} routerprops={props}/>}
    />
    <Route exact path='/Player/:playerId' render= {(props)=> <PlayerIdPageContainer key={props.match.params.playerId} routerprops={props}/>}
    />
    <Route exact path='/Search/:searchWord' render= {(props)=> <SearchResultsPageContainer key={props.match.params.searchWord} routerprops={props}/>}
    />



  </Switch>
)
export default ContentContainers
