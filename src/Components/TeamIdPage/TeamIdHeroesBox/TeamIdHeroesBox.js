import React from 'react';
import classNames from 'classnames';
import heroes from '../../MyDatabase/HeroPictures-json';

const TeamIdHeroesBox= ({mostPlayedHeroes, pageName})=> {
  let heroesobj=JSON.parse(heroes);
  let showheroes= mostPlayedHeroes.map((item,index)=> {
    let herocontainerclass= classNames({
      'Hero-container-teamid': true,
      'Uneven-row': index%2===0,
    })
    let heroobj=heroesobj.find(heroitem=> heroitem.id==item["hero_id"]);  // i dont use === because hetoitem.id is string
    let heropicurl=heroobj["url_small_portrait"];
    let heroname=heroobj["localized_name"];
    let gamesplayed=item["games_played"];
    let gameswon=item.wins;
    if (pageName==='player page') {
      gamesplayed=item.games;
      gameswon=item.win;
    }

    return (
      <div key={item["hero_id"]} className={herocontainerclass}>
        <div className="Hero-name">
          <span className="Hero-info-label-teamid">Hero:</span>
          <div><img className="Hero-picture-teamid" src={heropicurl}></img> {heroname} </div> </div>
        <div className="Hero-games-played-teamid">
           <span className="Hero-info-label-teamid">Games played:</span> {gamesplayed}
         </div>
         <div className="Hero-wins-teamid"><span className="Hero-info-label-teamid">Wins:</span> {gameswon} ({Math.round(gameswon/gamesplayed*1000)/10}%)</div>
       </div>
    )
  })

  if (mostPlayedHeroes.length===0) return <div className="No-heroes-box"> No heroes found</div>
  else {
    return <div className="Most-played-heroes-box">{showheroes}</div>
  }
}

export default TeamIdHeroesBox
