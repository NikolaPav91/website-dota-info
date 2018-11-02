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

  updateContentCoord() {
    let contentpos=document.getElementById('hero-page-content01').getBoundingClientRect();
    this.setState({
      contentCoords: contentpos,
    });
  }



  componentDidMount() {
    this.updateContentCoord();
    window.addEventListener("resize", ()=>this.updateContentCoord());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }


  render() {
    let heroobj=JSON.parse(heroes);
    let toggleVisibility= (visibility)=>{!visibility}
    let showheroes= this.props.heroGroup.map((item)=>{
      if (item.id==121) { return }
        let myheroinfo= heroobj.find(hero=> hero.id==item.id)
        let isBig=item.id==this.props.visibleHeroDetailsId

      return (
      <HeroPictureContainer
        myHeroInfo={myheroinfo}
        setVisibeHeroDetails={()=>this.props.setVisibeHeroDetails(item)}
        isBigHeroPic={isBig}
        roles={item.roles}
        contentCoords={this.state.contentCoords}

      />

      )
    })
    return (
      <div className="Hero-group-container">
        <div className={"Hero-group-header" +" " + this.props.mainAttribute}>{this.props.mainAttribute.toUpperCase()}</div>
         <div className="All-hero-pictures-container">{showheroes} </div>
       </div>
    )
  }


}



export default HeroeGroupContainer
