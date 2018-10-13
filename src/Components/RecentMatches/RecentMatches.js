import React from 'react';
import './RecentMatches.css';
import classNames from 'classnames';

class RecentMatches extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latestMatches:[],
      direTags:[]
    }
  }

  componentDidMount() {
    let bla;
    this.setState({
      loaderActive: true,
    });
    fetch('https://api.opendota.com/api/proMatches')
    .then(response=> response.json())
    .then(response=>
      response
      .filter(item=>(item.leagueid===10332 || item.leagueid===10269))
      .map((item,index)=>{return {id: item["match_id"]
    }})
    )
    .then(response=>
      response
      .map((item)=>
        fetch('https://api.opendota.com/api/matches/'+ item.id)
        .then(response=> response.json())

    )

    )
    .then(async response=> await Promise.all(response)
    )
    .then(response=> this.setState({
      latestMatches: response,
    }))

  }
    render() {
      let matches= this.state.latestMatches;
      let showmatches= matches.map((item,index)=> {
        let resultcontainerclass=classNames({
          'Result-container': true,
          'Even-row': index%2===0,
          'Uneven-row': index % 2 ===1,
        })
        let result= "1 : 0";
        if (item["radiant_win"]===false) {
          result="0 : 1"
        }
        let radiantname= "Name unknown"
        if  (item["radiant_team"]===undefined){ radiantname="Tag Unknown" } else {radiantname=item["radiant_team"].tag}
        let direname;
        if  (item["dire_team"]===undefined){ direname="Tag Unknown" } else {direname=item["dire_team"].tag}
        if (!radiantname) {
          radiantname=item["radiant_team"].name
        }
        if (!direname) {
          direname=item["dire_team"].name
        }

        return (
          <div className={resultcontainerclass}>{direname} {result} {radiantname}</div>
        )
      }
    )
      return (
        <div id="recent-matches-container">
          {showmatches}
          {this.state.direTags}
        </div>
    )
  }
}
export default RecentMatches
