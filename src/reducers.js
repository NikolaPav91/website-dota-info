import { combineReducers } from 'redux';

const activeIndex= (state=0, action)=> {
  switch (action.type) {
    case 'CHANGE_ACTIVE_INDEX':
      return action.index;
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

const reducers= combineReducers({activeIndex, visitingTeamId})
export default reducers
