import React from 'react';
import { connect } from 'react-redux';
import './PlayerIdPage.css';
import MostPlayedHeroesBox from '../MostPlayedHeroesBox/MostPlayedHeroesBox';
import TeammatesBox from './TeammatesBox/TeammatesBox';
import Countries from '../MyDatabase/countries-json';
import Loader from '../Loader/Loader';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class PlayerIdPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      basicPlayerInfo: {},
      playerTeamInformation: {},
      mostGamesPlayedWith: [],
      mostPlayedHeroes: [],
      playerStats: [],
      winAndLossNr:{},
      loaderActive: true,
      errorMessage: null,
    }
  }

  getBasicPlayerInfo() {
    return (
      fetch('https://api.opendota.com/api/players/' + this.props.routerprops.match.params.playerId)
      .then(response=>response.json())
    )
  }

  getWinLoss() {
    return (
      fetch('https://api.opendota.com/api/players/' + this.props.routerprops.match.params.playerId + '/wl')
      .then(response=> response.json())
    )
  }

  getSimpleProPlayers() {
    return (
      fetch('https://api.opendota.com/api/proPlayers')
      .then(response=>response.json())
    )
  }

  getProTeams() {
    if (this.props.proTeams===null || this.props.proTeams==='Something went wrong, please try again later') {
      return (
        fetch('https://api.opendota.com/api/teams/')
        .then(response=> response.json())
        .then(response =>
         response
          .map((item,index)=> { item.rank= index + 1 + ".";
            return item
          } )
        )
        .then(response=> {this.props.setProTeams(response); return response})
      )
    } else {
      return this.props.proTeams
    }
  }

  async getImprovedProPlayers() {

    if (this.props.proPlayers===null) {
      let simpleproplayers= await this.getSimpleProPlayers();
      let proteams= await this.getProTeams();
      let improvedproplayers=simpleproplayers.map(item=> {
        let playerteam= proteams.find(team=> team["team_id"]==item["team_id"] );
        if (playerteam===undefined) {
          item["team_logo"]= '';
          } else {
          item["team_logo"]= playerteam["logo_url"];
        } return item
      } );
      this.props.setProPlayers(improvedproplayers)
      return improvedproplayers
    } else {
      return this.props.proPlayers
    }
  }

  getPlayerTeamInfo() {
    return (
      Promise.all([this.getProTeams(), this.getImprovedProPlayers()])
      .then(([teams,players])=> {
        let teamid= players.find(item => item["account_id"]==this.props.routerprops.match.params.playerId)["team_id"];
        if (teamid==0) {
          return "?"
        } else {
          let teaminfo= teams.find(team=> team["team_id"]==teamid);

          if (teaminfo===undefined) {
            return "?"
          } else {
            return teaminfo
          }
        }
        })
    )
  }

  getMostGamesPlayedWith() {
    return (
      fetch('https://api.opendota.com/api/players/' + this.props.routerprops.match.params.playerId +'/pros')
      .then(response=> response.json())
      .then(response=> response.slice(1,9))
    )
  }
  getMostPlayedHeroes() {
    return (
      fetch('https://api.opendota.com/api/players/' + this.props.routerprops.match.params.playerId + '/heroes')
      .then(response=>response.json())
      .then(response=>
        response
        .filter(item=> item["hero_id"]!=="121")
        .slice(0,8))// 121 is missing in my database
    )
  }

  getPlayerStats() {
    return (
      fetch('https://api.opendota.com/api/players/' + this.props.routerprops.match.params.playerId + '/totals')
      .then(response=>response.json())
    )
  }

  getAllPlayerInfo() {
    return Promise.all([this.getBasicPlayerInfo(), this.getPlayerTeamInfo(), this.getMostGamesPlayedWith(),
      this.getMostPlayedHeroes(), this.getPlayerStats(), this.getWinLoss()])
  }

  componentDidMount() {
    this.getAllPlayerInfo()
      .then(response=> this.setState({
        proPlayerInfo: this.props.proPlayers.find(item=> item["account_id"]=== response[0].profile["account_id"]),
        basicPlayerInfo: response[0],
        playerTeamInformation: response[1],
        mostGamesPlayedWith: response[2],
        mostPlayedHeroes: response[3],
        playerStats: response[4],
        winAndLossNr: response[5],
        loaderActive: false,
      }) )
      .catch(response=>
        this.setState({
          loaderActive: false,
          errorMessage: 'Something went wrong, please try again later.',
        })
      )
  }

  render() {


    if (this.state.loaderActive) {
      return (
        <div className="All-content-container">
          <header className="header-picture1"></header>
          <div className="All-content-container Green-background">
            <Loader className='Loader'></Loader>
          </div>
        </div>

      )
    }


    if (this.state.errorMessage) {
      return (
        <div className="All-content-container">
          <header className="header-picture1"></header>
          <div className="All-content-container Green-background">
            <div id="error-msg-playerid">
              <p>Something went wrong, please try again later.</p>
              <p>(Maximum of 60 calls per minute to opendota api probably exceeded)</p>
            </div>
          </div>
        </div>
      )

    }



    let playername,mmr,country,leaderboardrank;
    let winandloss=this.state.winAndLossNr
    if (this.state.basicPlayerInfo.profile) {
      playername=this.state.basicPlayerInfo.profile.name;
      if(this.state.basicPlayerInfo.profile.loccountrycode) {
        let countryobj=JSON.parse(Countries).find(item=> item.alpha2Code===this.state.basicPlayerInfo.profile.loccountrycode)
        country=<img className="Flag-playerid" title={countryobj.name} src={countryobj.flag}></img>;
      }
    }

    if(this.state.basicPlayerInfo["mmr_estimate"]) { mmr= <div><span className="Player-info-labels-playerid">MMR:</span> {this.state.basicPlayerInfo["mmr_estimate"].estimate} </div>; }
    if(this.state.basicPlayerInfo["leaderboard_rank"]) { leaderboardrank= <div><span className="Player-info-labels-playerid">Leadrboard rank:</span> {this.state.basicPlayerInfo["leaderboard_rank"]}</div> }

    let playerstats, gamesplayed, killsobj, killspergame, deathsobj, deathspergame, assistsobj, assistspergame,
     gpmobj, gpmpergame, lasthitsobj, lasthitspergame, deniesobj, deniespergame, courierkillsobj, courierkillspergame;

    if (this.state.playerStats.length>0) {
    playerstats=this.state.playerStats;
    killsobj= playerstats.find(item=> item.field==="kills");
    gamesplayed= killsobj.n;
    killspergame= Math.round(killsobj.sum/killsobj.n * 10)/10;
    deathsobj=  playerstats.find(item=> item.field==="deaths");
    deathspergame= Math.round(deathsobj.sum/deathsobj.n * 10)/10;
    assistsobj=  playerstats.find(item=> item.field==="assists");
    assistspergame=Math.round( assistsobj.sum/assistsobj.n * 10)/10;
    gpmobj=  playerstats.find(item=> item.field==="gold_per_min");
    gpmpergame= Math.round(gpmobj.sum/gpmobj.n * 10)/10;
    lasthitsobj=  playerstats.find(item=> item.field==="last_hits");
    lasthitspergame= Math.round(lasthitsobj.sum/lasthitsobj.n * 10)/10;
    deniesobj=  playerstats.find(item=> item.field==="denies");
    deniespergame= Math.round(deniesobj.sum/deniesobj.n * 10)/10;
    courierkillsobj=  playerstats.find(item=> item.field==="courier_kills");
    courierkillspergame= Math.round(courierkillsobj.sum/courierkillsobj.n * 100)/100;
  }

  let teamlogo;
  let teamname="?";
  if (this.state.playerTeamInformation!=="?") {
    teamlogo=
      <Link className="Team-logo-link-playerid" to={'/Teams/'+ this.state.playerTeamInformation["team_id"] }>
        <img className="Team-logo-playerid" title={this.state.playerTeamInformation.name}
          onError={(e)=>{e.target.style.display='none'}}
          src={this.state.playerTeamInformation["logo_url"]}></img>
       </Link>;
    teamname=this.state.playerTeamInformation.name;
  } else {
    if (this.state.proPlayerInfo["team_name"]) {
      teamname=this.state.proPlayerInfo["team_name"];
    }
  }
  let teamnamelink;
  if (teamname && this.state.playerTeamInformation["team_id"]) {
    teamnamelink= <Link className="Team-link-playerid" to={'/Teams/'+ this.state.playerTeamInformation["team_id"] }> {teamname}
  </Link>
} else {
  teamnamelink=teamname;
}

    return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div className="All-content-container Green-background">
          <div className='Content-width' id="content-playerid">


            <h1 className="Player-name-playerid">
              {playername} {teamlogo} {country}
            </h1>
            <div id="playerid-content01">

              <div className="Player-info-container-playerid">
                <img className="Player-picture-playerid" title="no player picture" src="/no-image-icon.png"></img>
                <div className="Player-info-right-container-playerid">
                  <div><span className="Player-info-labels-playerid">Team:</span> {teamnamelink} </div>
                    {mmr}
                    {leaderboardrank}
                  <div>
                    <span className="Player-info-labels-playerid">W/L:</span>
                    {winandloss.win}/{winandloss.lose} ({Math.round(winandloss.win/(winandloss.win+winandloss.lose)*1000)/10}%)
                  </div>
                </div>
              </div>

              <div id="player-stats">
                <div><span className="Player-stats-label">Games played:</span> <span>{gamesplayed} </span></div>
                <div><span className="Player-stats-label">Avg kills:</span><span> {killspergame}</span></div>
                <div><span className="Player-stats-label">Avg deaths:</span><span> {deathspergame}</span></div>
                <div><span className="Player-stats-label">Avg assists:</span><span> {assistspergame}</span></div>
                <div><span className="Player-stats-label">Avg lasthits:</span><span> {lasthitspergame}</span></div>
                <div><span className="Player-stats-label">Avg denies:</span><span> {deniespergame}</span></div>
                <div><span className="Player-stats-label">Avg courier kills:</span><span> {courierkillspergame}</span> </div>
              </div>
            </div>
            <div id="playerid-content02">
              <div id="most-played-heroes-playerid">
                <h2 className="Container-label-playerid">Most played heroes:</h2>
                <MostPlayedHeroesBox
                  mostPlayedHeroes={this.state.mostPlayedHeroes}
                  pageName='player page'
                />
              </div>
              <div id="teammates-playerid">
                <h2 className="Container-label-playerid">Most games played with:</h2>
                <TeammatesBox teamMates={this.state.mostGamesPlayedWith}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps= (state) => {
  return {
    proTeams: state.proTeams,
    proPlayers: state.proPlayers
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
    setProPlayers: (players) => {
      dispatch ({
        type: 'SET_PRO_PLAYERS',
        playerList: players,
      })
    }
  }
}

const PlayerIdPageContainer= connect(mapStateToProps, mapDispatchToProps)(PlayerIdPage);

export default PlayerIdPageContainer
