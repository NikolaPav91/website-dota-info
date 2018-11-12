import React from 'react';
import { connect } from 'react-redux';
import './PlayerIdPage.css';
import TeamIdHeroesBox from '../TeamIdPage/TeamIdHeroesBox/TeamIdHeroesBox';
import TeammatesBox from './TeammatesBox/TeammatesBox';
import Countries from '../MyDatabase/countries-json';
import Loader from '../Loader/Loader';
import classNames from 'classnames';

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

  getPlayerTeamInfo(){
    return (
    fetch('https://api.opendota.com/api/proPlayers')
    .then(response=>response.json())
    .then(response=>
      response
      .find(item => item["account_id"]==this.props.routerprops.match.params.playerId)["team_id"]
    )
    .then( response=> {
      if(response)

      {
        let teamid=  response;
        if(this.props.proTeams===null || this.props.proTeams==='Something went wrong, pls try later'){
          return (
            fetch('https://api.opendota.com/api/teams/' + teamid)
            .then(response=> response.json())
            .catch(response=> '?')
          )
        } else {
          let teaminfo=this.props.proTeams.find(item=> item["team_id"]==teamid);
          if(teaminfo===undefined)
            return (
              '?'
            )
          return teaminfo
          }
        }



        else {
          return "?"
        }
      }


      )
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
      .then(response=>response.slice(0,8))
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
          errorMessage: 'Something went wrong, please try again.',
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
            <div id="error-msg-playerid">{this.state.errorMessage}</div>
          </div>
        </div>
      )

    }




    console.log('playedwith: '+ JSON.stringify(this.state.mostGamesPlayedWith))
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
    teamlogo=<img className="Team-logo-playerid" title={this.state.playerTeamInformation.name} src={this.state.playerTeamInformation["logo_url"]}></img> ;
    teamname=this.state.playerTeamInformation.name;
  }

    return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div className="All-content-container Green-background">
          <div className='Content-width' id="content-playerid">



            <div id="playerid-content01">

              <div className="Player-info-container-playerid">
                <div className="Player-name-and-picture-playerid">
                  <h1 className="Player-name-playerid">
                    {playername} {teamlogo} {country}
                  </h1>
                  <img className="Player-picture-playerid" title="no player picture" src="/no-image-icon.png"></img>

                </div>

                 <div className="Player-info-right-container-playerid">
                   <div><span className="Player-info-labels-playerid">Team:</span> {teamname} </div>
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
                <TeamIdHeroesBox
                  mostPlayedHeroes={this.state.mostPlayedHeroes}
                  pageName='player page'
                />
              </div>
              <div>
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

const PlayerIdPageContainer= connect(mapStateToProps, mapDispatchToProps)(PlayerIdPage);

export default PlayerIdPageContainer
