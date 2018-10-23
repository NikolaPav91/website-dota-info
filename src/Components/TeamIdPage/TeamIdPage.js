import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import classNames from 'classnames';

class TeamIdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMembers:[],
      teamInfo:{},
      errorMsg: null,
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
      .filter(item=> item["is_current_team_member"]===true))
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
          .map((item,index)=> {return {id: item["team_id"], name: item.name, tag: item.tag, logo: item["logo_url"],
           eloRating: item.rating, wins: item.wins, losses: item.losses, rank: index + 1, }}))
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
    .then(([players, teaminfo])=> {
      this.setState({
        loaderActive: false,
        currentMembers: players,
        teamInfo: teaminfo }); return [players,teaminfo]})
    .catch(response => {this.setState({
      errorMsg:"Something went wrong, please try again later",
      loaderActive: false}); return response})
  }

  render() {
    let loaderclass= classNames({
      'Loader': this.state.loaderActive,
      'Display-none': !this.state.loaderActive
    })
    let currentmembers= this.state.currentMembers;
    let showmembers= currentmembers.map((item)=> {
      return (
        <div className="Player-info-container">
           {item.name} </div>
      )
    }
  )
    if (currentmembers.length===0 && !this.state.loaderActive) {showmembers= <div> No players found</div>
    }
    if (this.state.errorMsg) return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div>{this.state.errorMsg}</div>
        <Loader className={loaderclass}></Loader></div>)
    return  (


      <div className="All-content-container">
        <header className="header-picture1"></header>
        <Loader className={loaderclass}></Loader>
        <div className="Team-info-container">
          {this.state.teamInfo.name}, {this.state.teamInfo.tag}
        </div>
        {showmembers}
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
