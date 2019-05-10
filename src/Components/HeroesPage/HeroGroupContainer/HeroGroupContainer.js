import React from 'react';
import classNames from 'classnames';
import heroes from '../../MyDatabase/HeroPictures-json';
import HeroPictureContainer from './HeroPictureContainer';



class HeroeGroupContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleHeroDetailsId: null,
    }
  }


  render() {
    let heroobj=JSON.parse(heroes);
    let emptyheroobject={};
    let showheroes= this.props.heroGroup.map((item)=>{
      if (item.id>120) { return null} // in case new heroes are available in the api
      let heropictureinfo= heroobj.find(hero=> hero.id===item.id)
      console.log(heropictureinfo);
      let isbigpic=item.id===this.props.visibleHeroDetailsId


      return (
      <HeroPictureContainer
        heroPictureInfo={heropictureinfo}
        setVisibleHeroDetails={(item)=>this.props.setVisibleHeroDetails(item)}
        isShowingBigHeroPic={isbigpic}
        heroInfo={item}
        key={item.id}

      />

      )
    })
    let herogroupheaderclass= classNames({
      "Hero-group-header": true,
    }, this.props.mainAttribute)
    return (
      <div className="Hero-group-container">
        <div className={herogroupheaderclass}>{this.props.mainAttribute.toUpperCase()}</div>
        <div className="All-hero-pictures-container"
           onMouseLeave={()=>this.props.setVisibleHeroDetails(emptyheroobject)}>{showheroes} </div>
       </div>
    )
  }


}



export default HeroeGroupContainer
