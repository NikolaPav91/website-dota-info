import React from 'react';

const TeamsTI= ({teams})=> {
  let showteams=teams.map((item,index)=> {
    const teamlogostyle = {
  backgroundImage: 'url(' + item.logo + ')',
};
    return (
      <div className="International-team-container">
      <div style={teamlogostyle} className="International-team-box">
        <div className="Names-box">
          <p><span>{item.players[0].nick}</span> {item.players[0].name}</p>
          <p><span>{item.players[1].nick}</span> {item.players[1].name}</p>
          <p><span>{item.players[2].nick}</span> {item.players[2].name}</p>
          <p><span>{item.players[3].nick}</span> {item.players[3].name}</p>
          <p><span>{item.players[4].nick}</span> {item.players[4].name}</p>
        </div>

      </div>
      <p>{item.teamname}</p>
    </div>
    )
  })
  return (
    showteams
  )
}

export default TeamsTI
