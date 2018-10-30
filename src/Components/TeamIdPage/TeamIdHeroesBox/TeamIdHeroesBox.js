import React from 'react';
import classNames from 'classnames';

const TeamIdHeroesBox= ({mostPlayedHeroes})=> {

  let showheroes= mostPlayedHeroes.map((item,index)=> {
    let herocontainerclass= classNames({
      'Player-info-container': true,
      'Uneven-row': index%2===0,
    })

    return (
      <div className={herocontainerclass}>
        <div className="Player-name"><span className="Player-info-label TeamId-page">Hero:</span> {item["localized_name"]} </div>
        <div className="Player-country TeamId-page">
           <span className="Player-info-label TeamId-page Country-label">Games played:</span> {item["games_played"]}
         </div>
         <div className="Player-mmr"><span className="Player-info-label TeamId-page">Wins:</span> {item.wins}</div>
       </div>
    )
  })

  if (mostPlayedHeroes.length===0) return <div className="Team-no-heroes-box"> No heroes found</div>
  else {
    return <div className="Team-with-players-box">{showheroes}</div>
  }
}

export default TeamIdHeroesBox
