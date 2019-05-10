import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import classNames from 'classnames';
import TeamInfoBox from './TeamInfoBox/TeamInfoBox';
import './TeamIdPage.css';
import TeamPlayersBox from './TeamPlayersBox/TeamPlayersBox';
import MostPlayedHeroesBox from '../MostPlayedHeroesBox/MostPlayedHeroesBox';
import TeamIdLatestMatchesBox from './TeamIdLatestMatches/TeamIdLatestMatches';

class TeamIdPage extends React.PureComponent {
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
      this.props.routerprops.match.params.teamId +"/players")
      .then(response=> response.json())
      .then(response =>
       response
        .filter(item=> item["is_current_team_member"]===true)
      )
    )
  }

  getHeroes() {
    return (
      fetch('https://api.opendota.com/api/teams/'+ this.props.routerprops.match.params.teamId +'/heroes')
      .then(response=> response.json())
      .then(response=> response
        .filter(item=> item["hero_id"]!=="121")
        .slice(0,6)) //121 is missing in my database
    )
  }

  getTeaminfo() {
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
        .then(response=> response.find(item=> item["team_id"]==this.props.routerprops.match.params.teamId))
        //didn't use === because item["team_id"] is a number, but routerprops.match.params.teamId is string
        .catch(response=> this.props.setProTeams('Something went wrong, please try again later') )
      )

    } else {
      return (
        this.props.proTeams.find(item=> item["team_id"]==this.props.routerprops.match.params.teamId)
        //didn't use === because item["team_id"] is a number, but routerprops.match.params.teamId is string
      )
    }
  }

  getMatches() {
    return (
      fetch('https://api.opendota.com/api/teams/' + this.props.routerprops.match.params.teamId +  '/matches')
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
      let improvedmatches= matches.map(item=> {
        let opposingteam= this.props.proTeams.find(findteam=>findteam["team_id"]===item["opposing_team_id"]);
        if (opposingteam===undefined) {
          item["opposing_team_tag"]='No Tag'
        } else {
          item["opposing_team_tag"]= opposingteam.tag; }
        if (((opposingteam !==undefined) && (item["opposing_team_logo"]===null))) {
          item["opposing_team_logo"]= opposingteam["logo_url"];
        }
        return ( item );
      } );
      this.setState({
        mostPlayedHeroes: heroes,
        currentMembers: players,
        teamInfo: teaminfo,
        latestMatches: improvedmatches,}); return [players,teaminfo,heroes,improvedmatches]})
    .then(([players,teaminfo,heroes,matches])=>
       [players.map(item=>
        fetch('https://api.opendota.com/api/players/' + item["account_id"])
        .then(response=>response.json())
      ),teaminfo,heroes,matches]
    )
    .then(async ([players,teaminfo,heroes,matches])=> [await Promise.all(players),teaminfo,heroes,matches])
    .then(([players,teaminfo,heroes,matches])=> {this.setState({
      loaderActive: false,
      memberBonusInfo: players,
      });
    })
    .catch(response => this.setState({loaderActive: false, errorMsg: "Something went wrong, please try again later."}))
  }

  render() {
    let loader;
    if (this.state.loaderActive) {loader=<Loader className='Loader'></Loader>}

    if (this.state.errorMsg) return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div className="All-content-container Green-background">
          <div className="Error-message Big" id="error-page-teamId">
            <p>Something went wrong, please try again later.</p>
            <p>(Maximum of 60 calls per minute to opendota api probably exceeded)</p>
          </div>
        </div>
      </div>)

      if (this.state.teamInfo===undefined) return (
        <div className="All-content-container">
          <header className="header-picture1"></header>
          <div className="All-content-container Green-background">
            <div className="Error-message Big" id="error-page-teamId">
              <p>This team page does not exist.</p>
            </div>
          </div>
        </div>)



    let teaminfo= this.state.teamInfo;
    let name= teaminfo.name;
    let tag= teaminfo.tag;
    if (!name) {name="?"};
    if (!tag) {tag="?"};
    let content01class= classNames({
      'Page-teamId-content01': !this.state.loaderActive,
      'Display-none': this.state.loaderActive
    })


    return  (


      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div className="All-content-container Green-background">
          {loader}
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
            <MostPlayedHeroesBox
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
