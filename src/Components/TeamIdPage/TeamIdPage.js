import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import classNames from 'classnames';

class TeamIdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMembers:[],
    }
  }

  componentDidMount() {
    this.setState({
      loaderActive: true,
    })
    fetch('https://api.opendota.com/api/teams/' +
    this.props.match.params.teamId +"/players")
    // sa render this.props.propsName(bla).match.params.teamId
    .then(response=> {console.log(response.status); return response})
    .then(response=> response.json())
    .then(response =>
     response
      .filter(item=> item["is_current_team_member"]===true))
    .then(response=> this.setState({loaderActive: false, currentMembers: response}
    ))
    .catch(alert);
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
    return  (


      <div className="All-content-container">
        <header className="header-picture1"></header>
        <Loader className={loaderclass}></Loader>
        <div className="Team-info-container">
          
        </div>
        {showmembers}
      </div>
    );
  }
}


const mapStateToProps= (state) => {
  return {
    teamId: state.visitingTeamId,
  }
}

const TeamIdPageContainer= connect(mapStateToProps, null)(TeamIdPage);

export default TeamIdPage
