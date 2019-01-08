import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import TeamContainer from './TeamContainer/TeamContainer';
import TeamsPagePageNumbers from './TeamsPagePageNumber/TeamsPagePageNumbers';
import './TeamsPage.css';

class TeamsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      maxPages: null,
      currentPage: 1,
      loaderActive: true,
    }
  }



  componentDidMount() {
    if(this.props.proTeams===null || this.props.proTeams==='Something went wrong, please try again later'){
      fetch('https://api.opendota.com/api/teams')
      .then(response=> response.json())
      .then(response =>
       response
        .map((item,index)=> { item.rank= index + 1 + ".";
          return item
        } )
      )
      .then(response=>  {this.props.setProTeams(response); this.setState({
        loaderActive: false,
        maxPages: Math.ceil(response.length/16),
      })})
      .catch(response=> { this.props.setProTeams('Something went wrong, please try again later'); this.setState({
        loaderActive: false,
      })});
    }

    if (this.props.proTeams!==null && this.props.proTeams!=='Something went wrong, please try again later') {
      let maxpages=Math.ceil(this.props.proTeams.length/16);
      this.setState({maxPages: maxpages, loaderActive: false, })
    }


  }

  setCurrentPage(n) {
    this.setState({
      currentPage: n,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.proTeams!== prevProps.proTeams) {
      let maxpages=Math.ceil(this.props.proTeams.length/16);
      this.setState({maxPages: maxpages })}
  }
  render(){
    if (this.state.loaderActive) {
      return (
        <div className= "All-content-container">
          <header className="header-picture1"></header>
          <div className="All-content-container Green-background">
            <Loader className='Loader'></Loader>
          </div>
        </div>
      )
    }

    if (this.props.proTeams==='Something went wrong, please try again later') {
      return (
        <div className= "All-content-container">
          <header className="header-picture1"></header>
          <div className="All-content-container Green-background">
            <div className="Error-message Big" id="error-message-teams">
              <p>Something went wrong, please try again later.</p>
              <p>(Maximum of 60 calls per minute to opendota api probably exceeded)</p>
            </div>
          </div>
        </div>
      )
    }

    let showtopteams= this.props.proTeams.slice((this.state.currentPage-1)*16, this.state.currentPage*16)
      .map((item,index)=> {
       return (
         <Link
           key= {item["team_id"] + "container"}
           to={'/Teams/'+ item["team_id"] }
           className="Team-link">

           <TeamContainer
             teamInfo={item}
           />
         </Link>
       )
     });



    return (
      <div className= "All-content-container">
        <header className="header-picture1"></header>
        <div className="All-content-container Green-background">
          <div className='Content-container'>
            <div id="content-teams">
              {showtopteams}
            </div>
            <div id="teams-page-number-navi-box">
            <TeamsPagePageNumbers
              currentPage={this.state.currentPage}
              setCurrentPage={(n)=> this.setCurrentPage(n)}
              maxPages={this.state.maxPages}
              containerId={"teams-page-number-navi-container"}
            />
          </div>

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
