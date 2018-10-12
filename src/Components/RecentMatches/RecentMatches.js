import React from 'react';

class RecentMatches extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latestMatches:[],
    }
  }

  componentDidMount() {
    this.setState({
      loaderActive: true,
    });
    fetch('https://api.opendota.com/api/proMatches')
    .then(response=> {console.log(response.status); return response})
    .then(response=> response.json())
    .then(response=>
      response
      .slice(0,10)
      .map((item,index)=>{return {id: item["match_id"], startTime:item["start_time"],
      radiantTeamId:item["radiant_team_id"], radiantTeamName: item["radiant_name"],
      direTeamId: item["dirte_team_id"], direTeamName: item["dire_name"], radiantWin: item["radiant_win"],
    }})
    )
    .then(response=> this.setState({
      latestMatches: response,
      loaderActive: false,
    }))

  }
    render() {
      let matches= this.state.latestMatches;
      let showmatches= matches.map((item,index)=> {
        let result= "1 : 0";
        if (item.radiantWin===false) {
          result="0 : 1"
        }
        let radiantname= item.radiantTeamName;
        let direname= item.direTeamName;
        if (radiantname===null) {
          radiantname="Name Unknown"
        }
        if (direname===null) {
          direname="Name Unknown"
        }

        return (
          <div className="Result-container">{direname} {result} {radiantname}</div>
        )
      }
    )
      return (
        <div id="recent-matches-container">
          {showmatches}
        </div>
    )
  }
}
export default RecentMatches
