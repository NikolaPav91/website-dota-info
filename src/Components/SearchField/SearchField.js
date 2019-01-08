import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Redirect } from 'react-router';

class SearchField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      errorMessage: null,
      selectedResultIndex: 0,
      redirectTo:false,

    }
  }
  goToSearchPage() {
    if (document.getElementById('search-input').value!=='') {
      this.setState({
        redirectTo: '/Search/'+ document.getElementById('search-input').value.toLowerCase(),
      })
    }

  }
  changeHighlightedResult(event) {
    if ((this.state.searchResult===null) || (this.state.searchResult.length===0)) {
      return
    }
    if (event.keyCode===13) { //on Enter key
      if ((Array.isArray(this.state.searchResult)) && (this.state.searchResult.length>0)) {
        if (this.state.selectedResultIndex===0) { //if there are no highlighted results redirect to search result page
          this.setState({
            redirectTo: '/Search/'+ event.target.value.toLowerCase(),
          })
        } else { //redirect to highlighted player or team page
          let selectedobj=this.state.searchResult[this.state.selectedResultIndex-1];
          if (selectedobj["account_id"]) {
            if (window.location.pathname==='/Player/'+ selectedobj["account_id"]) {
              return
            }
            window.location.pathname='/Player/'+ selectedobj["account_id"]
          } else {
            if (  window.location.pathname==='/Teams/'+ selectedobj["team_id"]) {
              return
            }
            this.setState({
              redirectTo: '/Teams/'+ selectedobj["team_id"]
            })
          }
        }
      }
    }
    if (event.keyCode===27) { //escape
      this.setState({
        selectedResultIndex: 0,
        searchResult: null,
      });
      event.target.blur();
    }
    if (event.keyCode===38) { //up arrow
      event.preventDefault();
      if (this.state.selectedResultIndex<= 1) {
        this.setState({
          selectedResultIndex: this.state.searchResult.length,
        })
      } else {
      this.setState({
        selectedResultIndex: this.state.selectedResultIndex -1,
      });
    }
    }

    if (event.keyCode===40) { //down arrow
      event.preventDefault();
      if (this.state.selectedResultIndex=== this.state.searchResult.length) {
        this.setState({
          selectedResultIndex: 1,
        })
      } else {
        this.setState({
          selectedResultIndex: this.state.selectedResultIndex +1,
        });
      }

    }
  }

  resetResults(event) {
      document.getElementById('search-input').value='';
    event.stopPropagation();
    this.setState({
      searchResult: null,
      selectedResultIndex: 0,
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
        .then(response=> {
          if (this.props.proPlayers!== null) {
            return this.props.proPlayers
          } else {
            return response
          }
        })
    )} else {
      return this.props.proPlayers
    }
  }

  getSearchResult(string) {
      this.setState({
        searchString: string,
      })
      if (string=== "" ) {
        this.setState({
          searchResult: null,
          errorMessage: null,
          selectedResultIndex: 0,
        }); return
      }
      Promise.all([this.getTeams(), this.getProPlayers()])
      .then(([teams,players])=> {
        if (this.props.proPlayers===null) {
          let improvedplayersobj= players.map(item=> {
            let playerteam= teams.find(team=> team["team_id"]===item["team_id"] );
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
          return (item.name.toLowerCase().includes(this.searchInput.value.toLowerCase()) )
        } );
        let filteredteams= teams.filter(item=>
          item.name.toLowerCase().includes(this.searchInput.value.toLowerCase()) || item.tag.toLowerCase().includes(this.searchInput.value.toLowerCase())
        );
        return [filteredteams, filteredplayers]
      })
      .then(([teams,players])=>{
        let mergedarrays= teams.concat(players);
        mergedarrays.sort( (a,b)=> {
          if (a.name.toLowerCase().startsWith(this.searchInput.value.toLowerCase())) return -2;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0
        })
        if (this.state.searchString==="") { //fixing the bug when it's sometimes showing "random" results when deleting all search text
          this.setState({
            searchResult: null,
            errorMessage: null,
            selectedResultIndex: 0,
          });
        } else {
          this.setState({
            searchResult: mergedarrays.slice(0,6),
            selectedResultIndex: 0,
          })
        }
      })
      .catch(response=> this.setState({
        errorMessage: "Something went wrong with the search.",
      }))
  }

  componentDidUpdate() {
    if(this.state.searchResult!== null) {
      document.querySelector('.App').onclick= (event)=> {
        if (document.getElementById('search-container').contains(event.target)) return
        this.setState({
          searchResult: null,
        })
      }
    }
  }

    render() {
      if(this.state.redirectTo!==false) {
        this.setState({
          searchResult: null,
          errorMessage: null,
          selectedResultIndex: 0,
          redirectTo:false,
        })
        return (
          <Redirect to={this.state.redirectTo}/>
        )
      }

      let resultscontainerclass= classNames({
        'Search-all-results-container': true,
        'Not-transparent': window.location.pathname.startsWith('/News'),
      })

      let results;
      let showresults;
      if (this.state.searchResult) {
        results= this.state.searchResult.map((item,index)=> {
          let searchresultclass= classNames({
            'Search-result-link': true,
            'Selected': index===this.state.selectedResultIndex-1,
          })
          let itemisplayer= item["account_id"];
          if(itemisplayer)  {
            let playerpictureurl=item["team_logo"];
            if (playerpictureurl==="") {playerpictureurl="/single-person-icon.png"}
            return (
              <Link
                key={"player" + item["account_id"]}
                onClick={(e)=> this.resetResults(e)}
                className={searchresultclass}
                to={'/Player/'+ item["account_id"] }>
                <div className="Search-result-item">
                  <img src={playerpictureurl} alt=""
                    onError={(e)=>{e.target.onerror = null; e.target.src="/single-person-icon.png";}}>
                  </img>
                  {item.name}
                </div>
              </Link>
            )
          } else {
            let teampictureurl= item["logo_url"];
            if (teampictureurl===null) {teampictureurl="/group-of-people-icon.png"}
            return (

              <Link
                key={'Team'+ item["team_id"]}
                onClick={(e)=> this.resetResults(e)}
                className={searchresultclass}
                to={'/Teams/'+ item["team_id"] }>
                <div className="Search-result-item"><img src={teampictureurl} alt=""
                 onError={(e)=>{e.target.onerror = null; e.target.src="/group-of-people-icon.png"}} //its not working (not existing img is blinking) but on teampage same code for same img is working (team shazam, nr72)
                 ></img>{item.name}</div>
              </Link>
            )
          }
        });
        showresults=<div className={resultscontainerclass}>{results}</div>
      }
      if (this.state.errorMessage!== null) {showresults=
        <div className={resultscontainerclass}>
          <div className="Error-message" id="search-result-error-message">
            <p>Something went wrong, please try again later.</p>
            <p>(Maximum of 60 calls per minute to opendota api probably exceeded)</p>
          </div>
        </div>}
      if (Array.isArray(this.state.searchResult) && this.state.searchResult.length===0) {
        showresults= <div className={resultscontainerclass}>Nothing found</div>
      }

      return (
        <div id="search-container" > <input id="search-input"
          ref={input => this.searchInput = input}
          onChange={(event)=>this.getSearchResult(event.target.value.toLowerCase())}
          onFocus={(event)=>this.getSearchResult(event.target.value.toLowerCase())}
          onKeyDown={(event)=>this.changeHighlightedResult(event)}
          type="text" placeholder="Search.."
          autoComplete="off"></input>
        <button onClick={()=>this.goToSearchPage()} type="submit"><i className="fa fa-search"></i></button>
        {showresults}
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
    setProPlayers: (players) => {
      dispatch ({
        type: 'SET_PRO_PLAYERS',
        playerList: players,
      })
    },
  }
}

const mapStateToProps=(state)=> {
  return {
    proTeams: state.proTeams,
    proPlayers: state.proPlayers,
  }
}

const SearchFieldContainer= connect(mapStateToProps, mapDispatchToProps)(SearchField);

export default SearchFieldContainer
