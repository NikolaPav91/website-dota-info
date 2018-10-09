import React from 'react';

const TeamContainer= ({teamInfo})=> {
  let picturesrc=teamInfo.logo;
  let name= teamInfo.name;
  let tag= teamInfo.tag;
  if (picturesrc===null) {
    picturesrc="no-image-icon.png"
  }
  if (!name) {name="?"};
  if (!tag) {tag="?"};
  return (
  <div className="Team-container">
    <div className="Team-top-container">
      <img src={picturesrc} className="Teamlogo"></img>
      <p><span className="Team-textlabels">Name:</span> <span className="Team-name-block">{name}</span> </p>
      <p><span className="Team-textlabels">Tag:</span> {tag} </p>
    </div>
    <div className="Team-bottom-container">
      <p><span className="Team-textlabels">Wins: </span>{teamInfo.wins}</p>
      <p><span className="Team-textlabels">Losses: </span>{teamInfo.losses}</p>
      <p><span className="Team-textlabels"> EloRating: </span>{teamInfo.eloRating} </p>
      <div className= "Rank-container">
        <span>Rank:</span>
        <img className="Rank-symbol" src="images.png"></img>

        <span className="Rank-number">{teamInfo.rank}. </span>
      </div>
    </div>

 </div>
)
}

export default TeamContainer
