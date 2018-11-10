import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const TeammateBox=({teamMates})=> {
    let teammates;
    if (teamMates.length>0) {teammates=teamMates.map( (item,index) => {
      let teammatecontainerclass= classNames({
        'Teammates-container-playerid': true,
        'Uneven-row': index%2===0,
      })
      let player,gamesplayed,wins,winrate;
      if (item) {
        player=item.name;
        gamesplayed=item.games;
        wins=item.win;
        winrate=Math.round(item.win/item.games*1000)/10
      }

      // <div className="Teammate-container-playerid">
      //   <div>{item.name}</div>
      //   <div>{item.games}</div>
      //   <div>{Math.round(item.win/item.games*1000)/10 }%</div>
      // </div>

      return (
        <Link to={'/Player/' + item["account_id"]} className={teammatecontainerclass}>
          <div className="Teammate-name-playerid">
            <span className="Teammate-info-label">Player:</span>
            <div> {player} </div> </div>
          <div className="Teammate-games-played">
             <span className="Teammate-info-label">Games played:</span> {gamesplayed}
           </div>
           <div className="Teammate-wins"><span className="Teammate-info-label">Wins:</span> {wins} ({winrate}%)</div>
         </Link>
      )
    })}

    return (
      <div id="teammates-container"> {teammates}</div>
    )
}


export default TeammateBox
