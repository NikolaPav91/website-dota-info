import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TeamsPageContainer from './Components/TeamsPage/TeamsPage';
import HomePageContainer from './Components/HomePage/HomePage';
import NewsPageContainer from './Components/NewsPage/NewsPage';
import MatchesPageContainer from './Components/MatchesPage/MatchesPage';
import PageTheInternationalContainer from './Components/PageTheInternational/PageTheInternational';
import TeamIdPage from './Components/TeamIdPage/TeamIdPage';
import News from './Components/NewsPage/News';
import NewsIdPage from './Components/NewsIdPage/NewsIdPage';


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
    <Route path='/The International' render={(props) => <PageTheInternationalContainer routerprops={props} />}
    />


    {/* <Route exact path='/Teams/:teamId'  render={(props) => <TeamIdPage bla={props}/>}
    /> */}
    <Route exact path='/Teams/:teamId' component= {TeamIdPage}
    />
    <Route exact path='/News/:newsId' render={(props) => <NewsIdPage currentNews={News} routerprops={props}/>}
    />



  </Switch>
)
export default ContentContainers
