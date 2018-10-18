import React from 'react';
import teamsarray from './TeamsArray.js'

const TeamsTI= ()=> {
  let showteams=teamsarray.map((item,index)=> {
    const teamlogostyle = {
  backgroundImage: 'url(' + item.logo + ')',
};
    return (
      <div style={teamlogostyle} className="International-team-box">
        <div className="Names-box">
          <p>{item.players[0].nick}{item.players[0].name}</p>
          <p>{item.players[1].nick}{item.players[1].name}</p>
          <p>{item.players[2].nick}{item.players[2].name}</p>
          <p>{item.players[3].nick}{item.players[3].name}</p>
          <p>{item.players[4].nick}{item.players[4].name}</p>
        </div>

      </div>
    )
  })
  return (
    showteams
  )
}

export default TeamsTI
