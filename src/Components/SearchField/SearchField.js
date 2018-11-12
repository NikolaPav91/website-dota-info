import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SearchField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      proPlayers: null,
      errorMessage: null,
    }
  }

  resetResults(event) {
      document.getElementById('search-input').value='';
    event.stopPropagation();
    this.setState({
      searchResult: null,
    })
  }

  getTeams(string) {

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

  getProPlayers(string) {
    if (this.state.proPlayers===null) { return (
      fetch('https://api.opendota.com/api/proPlayers')
      .then(response=>response.json())
    )} else {
      return this.state.proPlayers
    }
  }

  getSearchResult(string) {
      if (!string) {this.setState({
          searchResult: null,
          errorMessage: null,
        }); return
      }

      Promise.all([this.getTeams(string), this.getProPlayers(string)])
      .then(([teams,players])=> {
        if (this.state.proPlayers===null) {
          let improvedplayersobj= players.map(item=> {
            let playerteam= teams.find(team=> team["team_id"]==item["team_id"] );
            if (playerteam===undefined) {
              item["team_logo"]= '';
              } else {
              item["team_logo"]= playerteam["logo_url"];
            } return item
          } );

          this.setState({
            proPlayers: improvedplayersobj,
          });
          console.log('seting pro players:' + JSON.stringify(improvedplayersobj));

          return [teams,improvedplayersobj]
        } else return [teams, this.state.proPlayers]

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
          searchResult: mergedarrays.slice(0,6),
        })
      })
      // .catch(response=> this.setState({
      //   errorMessage: "something went wrong with the search",
      // }))
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
      let results;
      let showresults;
      if (this.state.searchResult) {
        results= this.state.searchResult.map(item=> {
          let itemisplayer= item["account_id"];
          if(itemisplayer)  {
            let playerpictureurl=item["team_logo"];
            if (playerpictureurl==="") {playerpictureurl="/single-person-icon.png"}
            return (
              <Link
                onClick={(e)=> this.resetResults(e)}
                className="Search-result-link"
                to={'/Player/'+ item["account_id"] }>
                <div className="Search-result-item"><img src={playerpictureurl}></img>{item.name}</div>
              </Link>
            )
          } else {
            let teampictureurl= item["logo_url"];
            if (teampictureurl===null) {teampictureurl="/group-of-people-icon.png"}
            return (

              <Link
                onClick={(e)=> this.resetResults(e)}
                className="Search-result-link"
                to={'/Teams/'+ item["team_id"] }>
                <div className="Search-result-item"><img src={teampictureurl}></img>{item.name}</div>
              </Link>
            )
          }
        });
        showresults=<div className="Search-all-results-container">{results}</div>
      }
      if (this.state.errorMessage!== null) {showresults=<div className="Search-all-results-container">{this.state.errorMessage}</div>}

      return (
        <div id="search-container" > <input id="search-input"
          onChange={(event)=>this.getSearchResult(event.target.value)}
          onFocus={(event)=>this.getSearchResult(event.target.value)}
          type="text" placeholder="Search.."></input>
        <button type="submit"><i className="fa fa-search"></i></button>
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
  }
}

const mapStateToProps=(state)=> {
  return {
    proTeams: state.proTeams,
  }
}

const SearchFieldContainer= connect(mapStateToProps, mapDispatchToProps)(SearchField);

export default SearchFieldContainer
