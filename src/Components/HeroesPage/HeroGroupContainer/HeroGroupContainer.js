import React from 'react';
import heroes from '../../MyDatabase/HeroPictures-json';
import classNames from 'classnames';
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
      if (item.id==121) { return }
        let heropictureinfo= heroobj.find(hero=> hero.id==item.id)
        let isbigpic=item.id==this.props.visibleHeroDetailsId

      return (
      <HeroPictureContainer
        heroPictureInfo={heropictureinfo}
        setVisibleHeroDetails={(item)=>this.props.setVisibleHeroDetails(item)}
        isShowingBigHeroPic={isbigpic}
        heroInfo={item}

      />

      )
    })
    return (
      <div className="Hero-group-container">
        <div className={"Hero-group-header" +" " + this.props.mainAttribute}>{this.props.mainAttribute.toUpperCase()}</div>
        <div className="All-hero-pictures-container"
           onMouseLeave={()=>this.props.setVisibleHeroDetails(emptyheroobject)}>{showheroes} </div>
       </div>
    )
  }


}



export default HeroeGroupContainer
