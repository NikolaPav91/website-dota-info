import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import classNames from 'classnames';
import TeamContainer from '../TeamContainer/TeamContainer';
import TeamInfoBox from './TeamInfoBox/TeamInfoBox';
import './TeamIdPage.css';
import TeamPlayersBox from './TeamPlayersBox/TeamPlayersBox';
import TeamIdHeroesBox from './TeamIdHeroesBox/TeamIdHeroesBox';
import TeamIdLatestMatchesBox from './TeamIdLatestMatches/TeamIdLatestMatches';

class TeamIdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMembers:[],
      teamInfo:{},
      errorMsg: null,
      memberBonusInfo:null,
      mostPlayedHeroes: [],
      latestMatches:[],
    }
  }

  getPlayers() {
    return (
      fetch('https://api.opendota.com/api/teams/' +
      this.props.match.params.teamId +"/players")
      // sa render this.props.propsName(bla).match.params.teamId
      // .then(response=> {console.log(response.status); return response})
      .then(response=> response.json())
      .then(response =>
       response
        .filter(item=> item["is_current_team_member"]===true)

      )
    )
  }

  getHeroes() {
    return (
      fetch('https://api.opendota.com/api/teams/'+ this.props.match.params.teamId +'/heroes')
      .then(response=> response.json())
      .then(response=> response.slice(0,6))
    )
  }

  getTeaminfo() {
    if(this.props.proTeams===null || this.props.proTeams==='Something went wrong, pls try later'){
      return (
        fetch('https://api.opendota.com/api/teams')
        .then(response=> response.json())

        .then(response =>
         response
          .slice(0,16)
          .map((item,index)=> {return {id: item["team_id"], name: item.name, tag: item.tag,
          logo: item["logo_url"],eloRating: item.rating, wins: item.wins, losses: item.losses,
          rank: index + 1 +".", lastMatchTime: item["last_match_time"] }}))
        .then(response=>  {this.props.setProTeams(response); return response})
        .then(response=> response.find(item=> item.id==this.props.match.params.teamId))
      )

    } else {
      return (
        this.props.proTeams.find(item=> item.id==this.props.match.params.teamId)
      )
    }
  }

  getMatches() {
    return (
      fetch('https://api.opendota.com/api/teams/' + this.props.match.params.teamId +  '/matches')
      .then(response=> response.json())
      .then(response=> response.slice(0,15))
    )
  }

  getPlayersAndTeaminfo() {
    return Promise.all([this.getPlayers(), this.getTeaminfo(), this.getHeroes(), this.getMatches()])
  }

  componentDidMount() {
    this.setState({
      loaderActive: true,
    });
    this.getPlayersAndTeaminfo()
    .then(([players,teaminfo,heroes,matches])=> {
      this.setState({
        mostPlayedHeroes: heroes,
        currentMembers: players,
        teamInfo: teaminfo,
        latestMatches: matches,}); return [players,teaminfo,heroes,matches]})
    .then(([players,teaminfo,heroes,matches])=>
       [players.map(item=>
        fetch('https://api.opendota.com/api/players/' + item["account_id"])
        .then(response=>response.json())
      ),teaminfo,heroes,matches]
    )
    .then(async ([players,teaminfo,heroes,matches])=> [await Promise.all(players),teaminfo,heroes,matches]
    )

    .then( ([players,teaminfo,heroes,matches])=> {this.setState({
      loaderActive: false,
      memberBonusInfo: players,
      });
    })
    .catch(response => this.setState({loaderActive: false, errorMsg: "Something went wrong, try again"}))
  }

  render() {
    console.log('matches:' + JSON.stringify(this.state.recentMatches))
    let loaderclass= classNames({
      'Loader': this.state.loaderActive,
      'Display-none': !this.state.loaderActive
    })

    if (this.state.errorMsg) return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div id="page-teamId-allbg">
        <div id="error-page-teamId">{this.state.errorMsg}</div>
        <Loader className={loaderclass}></Loader></div>
      </div>)



    let teaminfo= this.state.teamInfo;
    let name= teaminfo.name;
    let tag= teaminfo.tag;
    if (!name) {name="?"};
    if (!tag) {tag="?"};
    let content01class= classNames({
      'page-teamId-content01': !this.state.loaderActive,
      'Display-none': this.state.loaderActive
    })


    return  (


      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div id="page-teamId-allbg">
          <Loader className={loaderclass}></Loader>
          <div className={content01class}>
          <div className="Content-left-container">
            <h1>{name} ({tag})</h1>
            <TeamInfoBox teamInfo={teaminfo}/>
            <h3 className="Team-players-box-header">Current Players</h3>
            <TeamPlayersBox
              currentMembers={this.state.currentMembers}
              memberBonusInfo={this.state.memberBonusInfo}
            />
            <h3 className="Team-players-box-header">Most Played Heroes:</h3>
            <TeamIdHeroesBox
              mostPlayedHeroes={this.state.mostPlayedHeroes}
            />
          </div>
          <div className="Content-right-container">
            <h3 className="Latest-matches-box-header">Latest Games:</h3>
            <TeamIdLatestMatchesBox
              latestMatches={this.state.latestMatches}
            />
          </div>
        </div>
        </div>
      </div>
    );
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

const TeamIdPageContainer= connect(mapStateToProps, mapDispatchToProps)(TeamIdPage);

export default TeamIdPageContainer
