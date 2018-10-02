import React from 'react';
import MenuBarLink from '../MenuBarLink/MenuBarLink';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import classNames from 'classnames';

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
      let picturesrc=item.logo;
      let name= item.name;
      let tag= item.tag;
      if (picturesrc===null) {
        picturesrc="no-image-icon.png"
      }
      if (!name) {name="?"};
      if (!tag) {tag="?"};
       return (
         <Link
           to={'/Teams/'+ item.id }
           className="Team-link">
      <div className="Team-container">
        <div className="Team-top-container">
          <img src={picturesrc} className="Teamlogo"></img>
          <p><span className="Team-textlabels">Name:</span> <span className="Team-name-block">{name}</span> </p>
          <p><span className="Team-textlabels">Tag:</span> {tag} </p>
        </div>
        <div className="Team-bottom-container">
          <p><span className="Team-textlabels">Wins: </span>{item.wins}</p>
          <p><span className="Team-textlabels">Losses: </span>{item.losses}</p>
          <p><span className="Team-textlabels"> EloRating: </span>{item.eloRating} </p>
          <div className= "Rank-container">
            <span>Rank:</span>
            <img className="Rank-symbol" src="images.png"></img>

            <span className="Rank-number">{item.rank}. </span>
          </div>
        </div>

     </div>
   </Link>
   ) })
    return (
      <div className= "content-container-home">
        <header className="header-picture1"></header>
      <div id="content-teams">
        <Loader className={loaderclass}></Loader>
        {showtopteams}
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
