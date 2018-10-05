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
    this.setState({
      loaderActive: true,
    })
    fetch('https://api.opendota.com/api/teams')
    .then(response=> {console.log(response.status); return response})
    .then(response=> response.json())

    .then(response =>
     response
      .slice(0,16)
      .map((item,index)=> {return {id: item["team_id"], name: item.name, tag: item.tag, logo: item["logo_url"],
       eloRating: item.rating, wins: item.wins, losses: item.losses, rank: index + 1, }}))
    .then(response=> this.setState({loaderActive: false, topSixteen: response}))
    .catch(alert);
    this.props.setActiveIndex(2);
  }

  render(){
    let loaderclass= classNames({
      'Loader': this.state.loaderActive,
      'Display-none': !this.state.loaderActive
    })

    let topteams= this.state.topSixteen;
    let showtopteams= topteams.map((item)=> {
       return (
         <Link
           to={'/Teams/'+ item.id }
           className="Team-link">

           <TeamContainer
             teamInfo={item}
           />
         </Link>
   ) })
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

    setActiveIndex: (index) => {
      dispatch({
        type: 'CHANGE_ACTIVE_INDEX',
        index: index,
      });
    },
  }
}

const TeamsPageContainer= connect(null, mapDispatchToProps)(TeamsPage);

export default TeamsPageContainer
