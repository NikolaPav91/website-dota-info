import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import classNames from 'classnames';
import TeamContainer from '../TeamContainer/TeamContainer';
import TeamInfoBox from './TeamInfoBox/TeamInfoBox';
import './TeamIdPage.css';
import Countries from './counties-api.js';
import TeamPlayersBox from './TeamPlayersBox/TeamPlayersBox';

class TeamIdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMembers:[],
      teamInfo:{},
      errorMsg: null,
      memberBonusInfo:null,
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

  getPlayersAndTeaminfo() {
    return Promise.all([this.getPlayers(), this.getTeaminfo()])
  }

  componentDidMount() {
    this.setState({
      loaderActive: true,
    });
    this.getPlayersAndTeaminfo()
    .then(([players,teaminfo])=> {
      this.setState({
        currentMembers: players,
        teamInfo: teaminfo }); return [players,teaminfo]})
    .then(([players,teaminfo])=>
       [players.map(item=>
        fetch('https://api.opendota.com/api/players/' + item["account_id"])
        .then(response=>response.json())
      ),teaminfo]
    )
    .then(async ([players,teaminfo])=> [await Promise.all(players),teaminfo]
    )

    .then( ([players,teaminfo])=> {this.setState({
      loaderActive: false,
      memberBonusInfo: players,
      });
    })
    .catch(response => this.setState({loaderActive: false, errorMsg: "Something went wrong, try again"}))
  }

  render() {
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


    // let currentmembers= this.state.currentMembers;
    //
    // let showmembers= currentmembers.map((item,index)=> {
    //   let estimatemmr= "";
    //   let flagurl;
    //   let countryname;
    //   if (this.state.memberBonusInfo !== null) {
    //     estimatemmr=this.state.memberBonusInfo[index]["mmr_estimate"].estimate;
    //     let countries=JSON.parse(Countries);
    //     let country= countries.find(item=> item.alpha2Code===this.state.memberBonusInfo[index].profile.loccountrycode )
    //     if (country===undefined) {
    //       flagurl="/no-image-icon.png"; countryname="unknown"} else {
    //       flagurl= country.flag; countryname=country.name}
    //   }
    //
    //   return (
    //     <div className="Player-info-container">
    //       <img className="Player-flag TeamId-page" src={flagurl}></img> {countryname}
    //        <div className="Player-name"> {item.name}{estimatemmr} </div>
    //      </div>
    //   )
    // })
    //
    // if (currentmembers.length===0 && !this.state.loaderActive) {showmembers= <div> No players found</div>
    // }


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
              loaderActive={this.state.loaderActive}
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
