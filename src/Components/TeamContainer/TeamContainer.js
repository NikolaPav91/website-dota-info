import React from 'react';
import './TeamContainer.css'

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
  <div className="Team-container-teams-page">
    <div className="Team-top-container-teams-page">
      <img src={picturesrc} className="Teamlogo-teams-page"></img>
      <p><span className="Team-textlabels-teams-page">Name:</span> <span className="Team-name-block-teams-page">{name}</span> </p>
      <p><span className="Team-textlabels-teams-page">Tag:</span> {tag} </p>
    </div>
    <div className="Team-bottom-container-teams-page">
      <p><span className="Team-textlabels-teams-page">Wins: </span>{teamInfo.wins}</p>
      <p><span className="Team-textlabels-teams-page">Losses: </span>{teamInfo.losses}</p>
      <p><span className="Team-textlabels-teams-page"> EloRating: </span>{teamInfo.eloRating} </p>
      <div className= "Rank-container-teams-page">
        <span>Rank:</span>
        <img className="Rank-symbol-teams-page" src="/images.png"></img>

        <span className="Rank-number-teams-page">{teamInfo.rank}. </span>
      </div>
    </div>

 </div>
)
}

export default TeamContainer
