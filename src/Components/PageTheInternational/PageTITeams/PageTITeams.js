import React from 'react';
import './PageTITeams.css';
import TeamsTI from './TeamsTI/TeamsTI';

class PageTITeams extends React.PureComponent {


  render() {
    return (
      <div className="All-content-container">
        <div id="international-teams-bg01">
          <h2> THE TEAMS </h2>
        </div>
        <div id="international-teams-bg02">
          <div id="international-teams-content02">
            <TeamsTI teams={this.props.teams}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PageTITeams
