import React from 'react';
import { connect } from 'react-redux';
import './PageTheInternational.css';
import MenuBarContainer from '../MenuBar/MenuBar';
import PageTIOverview from './PageTIOverview/PageTIOverview';
import PageTIStandings from './PageTIStandings/PageTIStandings.js';
import PageTITeams from './PageTITeams/PageTITeams';
import PageTIMedia from './PageTIMedia/PageTIMedia';
import { Switch, Route } from 'react-router-dom';
import teamsarray from '../MyDatabase/Teams-objects';

class PageTheInternational extends React.PureComponent {


  render() {
    let currenturl= this.props.routerprops.location.pathname;
    return (
        <div className="All-content-container">
          <div id="international-header-bg">
            <div id="international-header-logo">

            </div>
          </div>
          <div id="international-navibar-bg">
            <div id="international-navibar-content">
            <MenuBarContainer
              menuButtons={["Overview", "Standings", "Media", "Teams"]}
              currentURL={currenturl}
              subLink="The International/"
              className="Menu-link"
            />
          </div>

          </div>
          <div className="All-content-container" id="international-allpages-bg">

          <Switch>
            <Route exact path='/The International/Overview' render={(props) => <PageTIOverview />}
            />

            <Route exact path='/The International/Media' render={(props) => <PageTIMedia />}
            />
            <Route exact path='/The International/Teams' render={(props) => <PageTITeams teams={teamsarray}/>}
            />
            <Route exact path='/The International/Standings' render={(props) => <PageTIStandings teams={teamsarray} />}
            />
          </Switch>
        </div>

        </div>
    )
  }
}

export default PageTheInternational
