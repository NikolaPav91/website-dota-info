import React from 'react';
import MenuBarLink from '../MenuBarLink/MenuBarLink';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import classNames from 'classnames';
import TeamContainer from '../TeamContainer/TeamContainer'

class TeamsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topSixteen:[],
    }
  }



  componentDidMount() {
    if(this.props.proTeams===null || this.props.proTeams==='Something went wrong, pls try later'){
    fetch('https://api.opendota.com/api/teams')
    .then(response=> response.json())

    .then(response =>
     response
      .slice(0,16)
      .map((item,index)=> {return {id: item["team_id"], name: item.name, tag: item.tag, logo: item["logo_url"],
       eloRating: item.rating, wins: item.wins, losses: item.losses, rank: index + 1, }}))
    .then(response=>  this.props.setProTeams(response))
    .catch(response=>this.props.setProTeams('Something went wrong, please try again later')); }
  }

  render(){
    let loaderclass= classNames({
      'Loader': !this.props.proTeams,
      'Display-none': this.props.proTeams
    })
    let topteams= this.props.proTeams;
    if (topteams===null) {topteams=[]}
    let showtopteams;
    if (topteams==='Something went wrong, pls try later') {showtopteams='Something went wrong, pls try later'}
    else {
    showtopteams= topteams.map((item)=> {
       return (
         <Link
           to={'/Teams/'+ item.id }
           className="Team-link">

           <TeamContainer
             teamInfo={item}
           />
         </Link>
       )
     })
   }
    return (
      <div className= "All-content-container">
        <header className="header-picture1"></header>
        <div id="content-teams-container">
      <div id="content-teams">
        <Loader className={loaderclass}></Loader>
        {showtopteams}
      </div>
    </div>
    </div>
    )
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

const mapStateToProps=(state)=> {
  return {
    proTeams: state.proTeams,
  }
}

const TeamsPageContainer= connect(mapStateToProps, mapDispatchToProps)(TeamsPage);

export default TeamsPageContainer
