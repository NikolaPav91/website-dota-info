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
    // let heroinfodivs = document.querySelectorAll('.Hero-detail-container');
    // for (let heroinfodiv of heroinfodivs) {
    //   if (heroinfodiv !== null) {
    //   if (heroinfodiv.getBoundingClientRect().left < this.state.contentCoords.left) {
    //     heroinfodiv.dataset.lala=this.state.contentCoords.left;
    //     heroinfodiv.dataset.trala=heroinfodiv.getBoundingClientRect().left;
    //     heroinfodiv.style.left= '0px';
    //     heroinfodiv.style.webkitTransform= '';
    //     heroinfodiv.style.transform= 'translateX(0%)';
    //   } else {heroinfodiv.dataset.lala=this.state.contentCoords.left;
    //   heroinfodiv.dataset.trala=heroinfodiv.getBoundingClientRect().left;}
    // }
    // }
    let heroobj=JSON.parse(heroes);
    let toggleVisibility= (visibility)=>{!visibility}
    let showheroes= this.props.heroGroup.map((item)=>{
      let herourl;
      if (item.id==121) {herourl=""} else {herourl= heroobj.find(hero=> hero.id==item.id)["url_small_portrait"]}
      let herodetailclass=classNames({
        'Hero-detail-container': true,
        'Display-block': item.id==this.props.visibleHeroDetailsId,
      })
        // if (item.id==this.props.visibleHeroDetailsId) {
        //   this.setState({
        //     visibleId: item.id,
        //   })
        // }
        // if (this.state.visibleId) {
        //   let heroinfodiv = document.querySelector('.Display-block');
        //   if (heroinfodiv) {
        //     if (heroinfodiv.getBoundingClientRect().left < this.state.contentCoords.left) {
        //           heroinfodiv.style.left= '0px';
        //           heroinfodiv.style.transform= 'translateX(0%)';
        //     }
        //   }
        //
        // }
      return (
      <HeroPictureContainer
        herourl={herourl}
        setVisibeHeroDetails={()=>this.props.setVisibeHeroDetails(item.id)}
        heroInfoClass={herodetailclass}
        roles={item.roles}
        contentCoords={this.state.contentCoords}

      />

      )
    })
    return (
      <div className="Hero-group-container"> {showheroes} </div>
    )
  }


}



export default HeroeGroupContainer
