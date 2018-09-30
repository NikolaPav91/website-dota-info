import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
    this.props.bla.match.params.teamId +"/players")
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
        <div> {item.name} </div>
      )
    }
  )
    return  (


      <div>  <Loader className={loaderclass}></Loader> {showmembers}</div>
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
