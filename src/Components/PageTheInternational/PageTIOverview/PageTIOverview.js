import React from 'react';
import './PageTIOverview.css';
import WatchingOptions from './WatchingOptions/WatchingOptions';

class PageTIOverview extends React.PureComponent {


  render() {
    return (
      <div className="All-content-container">
      <div id="international-overview-bg01">
        <div id="international-overview-content01">
          <div className="Overview-box" id="overview-box1">
            <p>MAIN EVENT	</p>
            <h2>AUGUST 20-25, 2018</h2>
            <p>ROGERS ARENA IN VANCOUVER, BC</p>
          </div>
          <div className="Overview-box" id="overview-box2">
            <p>PRIZE POOL	</p>
            <h2>$25,532,177</h2>
            <p>CURRENT TOTAL</p>
          </div>
        </div>
      </div>
      <div id="international-overview-bg02">
        <div id="international-overview-content02">
          <h2> HOW TO WATCH</h2>
          <div id="watching-options">
            <WatchingOptions />
          </div>
        </div>

      </div>
      <div id="international-overview-bg03">
        <div id="international-overview-content03">
          <h1> PRIZE POOL <span>$25,532,177</span></h1>
          <p>The International 2018 is the concluding tournament of the Dota Pro Circuit and the eighth
            annual edition of The International. The tournament will be held on Canadian soil for the first time,
            as it moves to the Rogers Arena in Vancouver, Canada. For the first time, a point system based on official
            sponsored Majors and Minors were used to determine invites to The International.</p>
        </div>
      </div>
      <div id="international-overview-bg04">
        <div id="international-overview-content04">
          <div id="battlepass-logo"></div>
          <div id="battlepass-info">
            <p>25% of the proceeds of all Battle Pass sales go directly to The International prize pool.</p>
          </div>

        </div>
      </div>
    </div>
    )
  }
}

export default PageTIOverview
