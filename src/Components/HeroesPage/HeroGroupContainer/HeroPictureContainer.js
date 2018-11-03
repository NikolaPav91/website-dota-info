import React from 'react';
import classNames from 'classnames';

const HeroPictureContainer=({isShowingBigHeroPic, heroPictureInfo, setVisibleHeroDetails, heroInfo})=> {

    let bigheropicclass= classNames({
      "Hero-big-picture-heropage": true,
      'Block': isShowingBigHeroPic,
    })
    let emptyheroobject={};
    return (
      <div className="Hero-picture-container-heropage">
        <img className="Hero-small-picture-heropage"
          src={heroPictureInfo["url_small_portrait"]}
          onMouseEnter={()=> setVisibleHeroDetails(heroInfo) }
          ></img>


        <img className={bigheropicclass}
          id={heroPictureInfo.name}
          onMouseLeave={()=>  setVisibleHeroDetails(emptyheroobject)}
          src={heroPictureInfo["url_large_portrait"]}></img>

      </div>
    )
}

export default HeroPictureContainer
