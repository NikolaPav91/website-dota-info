import React from 'react';
import './RecentMatches.css';
import classNames from 'classnames';
import Loader from '../Loader/Loader';
import { connect } from 'react-redux';

class RecentMatchez extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latestMatches:[],
      loaderActive: true,
    }
  }

  groupIntoMatches(matches) {
      let matchesid=matches.map(item=> item["series_id"]);
      let uniqueids=matchesid.filter((item,index,self)=> (index==self.indexOf(item) ));
      let uniquematches= uniqueids.map(item=> matches.filter(matchitem=> matchitem["series_id"]==item));
      return uniquematches
  }

  getLatestRelevantMatches() {
    return (
      fetch('https://api.opendota.com/api/proMatches')
      .then(response=> response.json())
      .then(response=>
        response
        .filter(item=>((item.leagueid===10288 || item.leagueid===10132 || item.leagueid===10296) &&
                        (item["series_id"]!==0) && (item["radiant_team_id"]!==0) && (item["dire_team_id"]!==0)
                ))
      )
      .then(response=> this.groupIntoMatches(response))
      .then(response=> response
      )
    )
  }

  getProTeams() {
    if(this.props.proTeams===null || this.props.proTeams==='Something went wrong, pls try later'){
      return (
        fetch('https://api.opendota.com/api/teams')
        .then(response=> response.json())

        .then(response =>
         response
          .map((item,index)=> { item.rank= index + 1 + ".";
            return item
          } )
        )
        .then(response=>  {this.props.setProTeams(response); return response})
      )
    } else {
      return (
        this.props.proTeams
      )
    }
  }

  getTeamsAndMatches() {
    Promise.all([this.getProTeams(), this.getLatestRelevantMatches()])
    .then(([teams,matches])=> {
        this.setState({
          latestMatches: matches,
          loaderActive: false,
        })
      }
    )
    .catch(response=> this.setState({
      loaderActive: false,
      latestMatches: "Error"
    }))
  }


  componentDidMount() {
    this.getTeamsAndMatches();

  }
    render() {
      let loaderclass= classNames({
        'Loader': this.state.loaderActive,
        'Display-none': !this.state.loaderActive
      })
      let matches= this.state.latestMatches;
      let showmatches;
      if (this.state.latestMatches==="Error") {
        showmatches=
          <div className="Error-message" id="Error-recent-matches">
            <p>Something went wrong, please try again later.</p>
            <p>(Maximum of 60 calls per minute to opendota api probably exceeded)</p>
          </div>
      } else {
        console.log(matches);
      showmatches= matches.map((item,index)=> {
        let resultcontainerclass=classNames({
          'Result-container': true,
          'Even-row': index%2===1,
          'Uneven-row': index % 2 ===0,
          'First-two': Math.ceil(index/2)%2===1,
          'Second-two': Math.ceil(index/2)%2===0,

        })
        let radiantidfirstgame= item[0]["radiant_team_id"];
        let direidfirstgame= item[0]["dire_team_id"]
        let radiantwins=0
        let direwins=0
        item.forEach(game=> {
          if (((radiantidfirstgame===game["radiant_team_id"]) && (game["radiant_win"]===true)) ||
              ((radiantidfirstgame!==game["radiant_team_id"]) && (game["radiant_win"]===false)) ) {
            radiantwins=radiantwins+1;
          } else {
            direwins=direwins+1;
          }
        })
        let result= `${radiantwins} : ${direwins}`;


        let radiantteamobj= this.props.proTeams.find(item=> item["team_id"]===radiantidfirstgame);
        let radiantlogosrc, radianttag;
        if (radiantteamobj!==undefined) {
          radiantlogosrc= radiantteamobj["logo_url"];

          radianttag=radiantteamobj.tag;
          if (!radianttag) { radianttag=radiantteamobj.name } //in case item[0]["radiant_team"].tag key is not a adequate value.
        } else {
          radianttag=item[0]["radiant_name"]
          if (!radianttag) { radianttag= "??"}
        }
        if(!radiantlogosrc) { radiantlogosrc="/no-image-icon.png" }


        let direteamobj= this.props.proTeams.find(item=> item["team_id"]===direidfirstgame);
        let direlogosrc, diretag;
        if (direteamobj!==undefined) {
          direlogosrc=direteamobj["logo_url"];
          diretag=direteamobj.tag;
          if (!diretag) { diretag=direteamobj.name}
        } else {
          diretag=item[0]["dire_name"]
          if (!diretag) { diretag= "??"}
        }
        if (!direlogosrc) {direlogosrc="/no-image-icon.png"}

        return (
          <div className={resultcontainerclass}>
            <div className="Result-radiant-team"><img className="Result-teamlogo" src={radiantlogosrc}></img> <span>{radianttag}</span> </div>
          <span>{result}</span>
            <div className="Result-dire-team"><span>{diretag}</span> <img className="Result-teamlogo" src={direlogosrc}></img> </div>
        </div>
        )
      }
    )
  }


      return (
        <div id={this.props.containerId}>
          <span>Latest games:</span>
        <div className="Recent-matches-inner-container">

          <Loader className={loaderclass}></Loader>
          {showmatches}
        </div>
      </div>
    )
  }
}


const mapStateToProps= (state) => {
  return {
    proTeams: state.proTeams,
  }
}
const mapDispatchToProps= (dispatch)=> {
  return {

    setProTeams: (teams) => {
      dispatch({
        type: 'SET_PRO_TEAMS',
        teamList: teams,
      });
    },
  }
}

const RecentMatches= connect(mapStateToProps, mapDispatchToProps)(RecentMatchez);

export default RecentMatches
