import React from 'react';


const TeamInfoBox= ({teamInfo})=> {
  let picturesrc=teamInfo.logo;

  if (picturesrc===null) {
    picturesrc="no-image-icon.png"
  }

  return (
  <div className="Team-container-teamId-page">
    <div className="Team-left-container-teamId-page">
      <img src={picturesrc} className="Teamlogo-teamId-page"></img>
    </div>
    <div className="Team-right-container-teamId-page">
      <p><span className= "Team-textlabels-teamId-page">Rank: </span>{teamInfo.rank}</p>
      <p><span className="Team-textlabels-teamId-page">Wins: </span>{teamInfo.wins}</p>
      <p><span className="Team-textlabels-teamId-page">Losses: </span>{teamInfo.losses}</p>
      <p><span className="Team-textlabels-teamId-page"> EloRating: </span>{teamInfo.eloRating} </p>
      <p><span className="Team-textlabels-teamId-page">Last match played: </span>{teamInfo.lastMatchTime}</p>
    </div>
 </div>
)
}

export default TeamInfoBox
