import React from 'react';
import './RecentMatches.css';
import classNames from 'classnames';
import Loader from '../Loader/Loader';

class RecentMatches extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latestMatches:[],
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
      .filter(item=>(item.leagueid===10332 || item.leagueid===10269 || item.leagueid===10145))
      .slice(0,32 )
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
      loaderActive: false,
      latestMatches: response,
    }))

  }
    render() {
      let loaderclass= classNames({
        'Loader': this.state.loaderActive,
        'Display-none': !this.state.loaderActive
      })
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
        let radiantname= "??"
        let radiantlogosrc="no-image-icon.png"
        if  (item["radiant_team"]){radiantname=item["radiant_team"].tag; radiantlogosrc=item["radiant_team"]["logo_url"]}
        let direname= "??"
        let direlogosrc="no-image-icon.png";
        if  (item["dire_team"]){direname=item["dire_team"].tag; direlogosrc=item["dire_team"]["logo_url"]}
        if (!radiantname) {
          radiantname=item["radiant_team"].name
        }
        if (!direname) {
          direname=item["dire_team"].name
        }



        return (
          <div className={resultcontainerclass}>
            <div className="Result-radiant-team"><img className="Result-teamlogo" src={radiantlogosrc}></img> <span>{radiantname}</span> </div>
          {result}
            <div className="Result-dire-team"><span>{direname}</span> <img className="Result-teamlogo" src={direlogosrc}></img> </div>
        </div>
        )
      }
    )
      return (
        <div id="recent-matches-container">
          <Loader className={loaderclass}></Loader>
          {showmatches}
        </div>
    )
  }
}
export default RecentMatches
