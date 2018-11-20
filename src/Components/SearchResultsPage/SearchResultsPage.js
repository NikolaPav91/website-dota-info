import Loader from '../Loader/Loader';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import './SearchResultsPage.css';
import { Link } from 'react-router-dom';
import Countries from '../MyDatabase/countries-json';
import TeamsPagePageNumbers from '../TeamsPage/TeamsPagePageNumber/TeamsPagePageNumbers';


class SearchResultsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      loaderActive: true,
      currentResultPage: 1,
      maxResultPages: null,
      filteredSearchResult: null,
    }
  }

  setCurrentResultPage(n) {
    this.setState({
      currentResultPage: n,
    })
  }
  filterSearch(string) {
    let searchresults=this.state.searchResult;
    let newresults;
    if (string==='players') {
      newresults=searchresults.filter(item=> item["account_id"])// if it has accound_id its a player object
      this.setState({
        filteredSearchResult: newresults,
      })
    }
    if (string==='teams') {
      newresults=searchresults.filter(item=> item.rank)// if it has rank key its a team object
      this.setState({
        filteredSearchResult: newresults,

      })
    }
    if (string==='all'){
      newresults=this.state.searchResult
      this.setState({
        filteredSearchResult: newresults,
      })
    };

    this.setState({
      maxResultPages: Math.ceil(newresults.length/24),
      currentResultPage: 1,
    })
  }

  getTeams() {

    if(this.props.proTeams===null || this.props.proTeams==='Something went wrong, please try again later') { return (
      fetch('https://api.opendota.com/api/teams')
      .then(response=> response.json())
      .then(response =>
       response
        .map((item,index)=> { item.rank= index + 1 + ".";
          return item
        } )
      )
      .then(response=>  {this.props.setProTeams(response); return response})
      .catch(response=> { this.props.setProTeams('Something went wrong, please try again later');})
    )} else {
      return this.props.proTeams
    }
  }

  getProPlayers() {
    if (this.props.proPlayers===null) {
       return (
        fetch('https://api.opendota.com/api/proPlayers')
        .then(response=>response.json())
    )} else {
      return this.props.proPlayers
    }
  }

  getSearchResult(string) {

      Promise.all([this.getTeams(), this.getProPlayers()])
      .then(([teams,players])=> {
        if (this.props.proPlayers===null) {
          let improvedplayersobj= players.map(item=> {
            let playerteam= teams.find(team=> team["team_id"]==item["team_id"] );
            if (playerteam===undefined) {
              item["team_logo"]= '';
              } else {
              item["team_logo"]= playerteam["logo_url"];
            } return item
          } );

          this.props.setProPlayers(improvedplayersobj);

          return [teams,improvedplayersobj]
        } else return [teams, this.props.proPlayers]

      })
      .then(([teams,players])=> {
        let filteredplayers= players.filter(item=> {
          let spacedname= item.name.toLowerCase().replace(/_|-|\./g, " ");
          return (item.name.toLowerCase().includes(string.toLowerCase()) || spacedname.includes(string.toLowerCase()))
        } );
        let filteredteams= teams.filter(item=>
          item.name.toLowerCase().includes(string.toLowerCase()) || item.tag.toLowerCase().includes(string.toLowerCase())
        );
        return [filteredteams, filteredplayers]
      })
      .then(([teams,players])=>{
        let mergedarrays= teams.concat(players);
        mergedarrays.sort( (a,b)=> {
          if (a.name.toLowerCase().startsWith(string)) return -2;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0
        })
        this.setState({
          searchResult: mergedarrays,
          filteredSearchResult: mergedarrays,
          loaderActive: false,
          maxResultPages: Math.ceil(mergedarrays.length/24),
        })
        if (mergedarrays.length==0) {
          this.setState({
            searchResult: "no such players or teams found",
          })
        }
      })
      .catch(response=> this.setState({
        loaderActive: false,
        errorMessage: "something went wrong with the search",
      }))
  }

  componentDidMount() {
    this.getSearchResult(this.props.routerprops.match.params.searchWord);
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
            <div id="error-msg-searchid">{this.state.errorMessage}</div>
          </div>
        </div>
      )
    }

    if ((Array.isArray(this.state.filteredSearchResult)) && (this.state.filteredSearchResult.length===0)) {
      return (
        <div className="All-content-container">
          <header className="header-picture1"></header>
          <div className="All-content-container Green-background">
            <div id="no-results-msg-searchid"> Sorry, nothing matches the search</div>
          </div>
        </div>
      )
    }
    let countriesobj=JSON.parse(Countries);
    let neededresults=this.state.filteredSearchResult.slice((this.state.currentResultPage-1)*24, this.state.currentResultPage*24);
    let showresults= neededresults.map((item,index)=> {
      let itemisplayer= item["account_id"];
      if(itemisplayer)  {
        let playerpictureurl="/single-person-icon.png";
        let countryflag;
        let countryobj= countriesobj.find(countryitem=> countryitem.alpha2Code===item.loccountrycode);
        if (countryobj!== undefined) { countryflag= <img src={countryobj.flag}></img>}

        let playerteam= "no team";
        if(item["team_tag"]) {playerteam=item["team_tag"]}
         else if (item["team_name"]) {
          playerteam=item["team_name"];
        }
        let playerteamlogo;
        if(item["team_logo"]!== "") {
          playerteamlogo= <img onError={(e)=>{e.target.onerror = null; e.target.style.display='none'}}></img>
        }

        return (
          <Link
            className={'Search-result-searchid Player-result'}
            to={'/Player/'+ item["account_id"] }>
            <img src={playerpictureurl}></img>
            <div className="Result-info-searchid">
              <h3>{item.name} {countryflag}</h3>
              <div className="Result-player-teaminfo-container">
                <span className="Result-label">Team:</span>
                <div className="Result-player-teaminfo">{playerteam}{playerteamlogo}</div>
              </div>
            </div>
          </Link>
        )
      } else {
        let teampictureurl= item["logo_url"];
        if (teampictureurl===null) {teampictureurl="/group-of-people-icon.png"}
        return (
          <Link
            className={'Search-result-searchid Team-result'}
            to={'/Teams/'+ item["team_id"] }>
            <img className="Team-logo-searchid" src={teampictureurl}
             onError={(e)=>{e.target.onerror = null; e.target.src="/group-of-people-icon.png"}}
             ></img>
            <div className="Result-info-searchid">
              <h3> {item.name}</h3>
              <div className="Result-team-rank-container">
                <span className="Result-label">Rank:</span>
                <div className="Result-team-rank">{item.rank}</div>
              </div>
            </div>
          </Link>
        )
      }
    }).slice(0,24)


    return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div className="All-content-container Green-background">
          <div className="Content-width" >
            <div id="search-results-page-content">
              <div id="search-results-header-container">
                <h1>Search results:</h1>
                  <form className="Search-filter-form" onChange={(e)=>this.filterSearch(e.target.value)}>
                  <div><input type="radio" name ="search-filter" value="players"></input> Players</div>
                  <div><input type="radio" name ="search-filter" value="teams"></input> Teams</div>
                  <div><input type="radio" name ="search-filter" value="all" defaultChecked></input> All</div>
                  </form>
              </div>
              {showresults}
              <TeamsPagePageNumbers
                currentPage={this.state.currentResultPage}
                setCurrentPage={(n)=> this.setCurrentResultPage(n)}
                maxPages={this.state.maxResultPages}
                containerId={"search-result-number-navi-container"}
              />
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

const SearchResultsPageContainer= connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);

export default SearchResultsPageContainer
