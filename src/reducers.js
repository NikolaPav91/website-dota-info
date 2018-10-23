import { combineReducers } from 'redux';

const proTeams= (state=null, action)=> {
  switch (action.type) {
    case 'SET_PRO_TEAMS':
      return action.teamList;
    default:
      return state
  }
}

const visitingTeamId= (state=null, action) => {
  switch (action.type) {
    case 'SET_VISITING_TEAM_ID':
      return action.teamid;
    default:
      return state
  }
}

const reducers= combineReducers({proTeams, visitingTeamId})
export default reducers
