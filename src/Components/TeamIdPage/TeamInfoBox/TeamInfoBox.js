import React from 'react';


const TeamInfoBox= ({teamInfo})=> {
  function timeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = date + '. ' + month + ' ' + year ;
  return time;
}
  let picturesrc=teamInfo["logo_url"];

  if (picturesrc===null) {
    picturesrc="/no-image-icon.png"
  }

  let lastmatchtime= timeConverter(teamInfo["last_match_time"]);

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
      <p><span className="Team-textlabels-teamId-page">Last match played: </span>{lastmatchtime}</p>
    </div>
 </div>
)
}

export default TeamInfoBox
