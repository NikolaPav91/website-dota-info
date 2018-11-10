import React from 'react';
import Countries from '../../MyDatabase/countries-json';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const TeamPlayersBox= ({currentMembers, memberBonusInfo})=> {

  let showmembers= currentMembers.map((item,index)=> {
    let membercontainerclass= classNames({
      'Player-info-container': true,
      'Uneven-row': index%2===0,
    })
    let estimatemmr= "";
    let flagurl;
    let countryname;
    if (memberBonusInfo !== null) {
      estimatemmr=memberBonusInfo[index]["mmr_estimate"].estimate;
      let countries=JSON.parse(Countries);
      let country= countries.find(item=> item.alpha2Code===memberBonusInfo[index].profile.loccountrycode )
      if (country===undefined) {
        flagurl="/no-image-icon.png"; countryname="unknown"} else {
        flagurl= country.flag; countryname=country.name}
    }

    return (
      <Link to={'/Player/' + item["account_id"]} className={membercontainerclass}>

        <div className="Player-name"><span className="Player-info-label TeamId-page">Nickname:</span> {item.name} </div>
        <div className="Player-country TeamId-page">
           <span className="Player-info-label TeamId-page Country-label">Country:</span> <img className="Player-flag TeamId-page" src={flagurl}></img> {countryname}
         </div>
         <div className="Player-mmr"><span className="Player-info-label TeamId-page">Esimated MMR:</span> {estimatemmr}</div>

     </Link>
    )
  })

  if (currentMembers.length===0) return <div className="Team-no-players-box"> No players found</div>
  else {
    return <div className="Team-with-players-box">{showmembers}</div>
  }
}

export default TeamPlayersBox
