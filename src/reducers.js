import { combineReducers } from 'redux';

const proTeams= (state=null, action)=> {
  switch (action.type) {
    case 'SET_PRO_TEAMS':
      return action.teamList;
    default:
      return state
  }
}


const proPlayers= (state= null, action) => {
  switch(action.type) {
    case 'SET_PRO_PLAYERS':
     return action.playerList;
    default:
      return state
  }
}
const reducers= combineReducers({proTeams, proPlayers})
export default reducers
