import React from 'react';
import classNames from 'classnames';
import heroes from '../../MyDatabase/HeroPictures-json';

const TeamIdHeroesBox= ({mostPlayedHeroes})=> {
  let heroesobj=JSON.parse(heroes);
  let showheroes= mostPlayedHeroes.map((item,index)=> {
    let herocontainerclass= classNames({
      'Hero-container-teamid': true,
      'Uneven-row': index%2===0,
    })

    let heropicurl=heroesobj.find(heroitem=> heroitem.id===item["hero_id"])["url_small_portrait"];

    return (
      <div className={herocontainerclass}>
        <div className="Hero-name">
          <span className="Hero-info-label-teamid">Hero:</span>
          <div><img className="Hero-picture-teamid" src={heropicurl}></img> {item["localized_name"]} </div> </div>
        <div className="Hero-games-played-teamid">
           <span className="Hero-info-label-teamid">Games played:</span> {item["games_played"]}
         </div>
         <div className="Hero-wins-teamid"><span className="Hero-info-label-teamid">Wins:</span> {item.wins}</div>
       </div>
    )
  })

  if (mostPlayedHeroes.length===0) return <div className="Team-no-heroes-box"> No heroes found</div>
  else {
    return <div className="Team-with-players-box">{showheroes}</div>
  }
}

export default TeamIdHeroesBox
