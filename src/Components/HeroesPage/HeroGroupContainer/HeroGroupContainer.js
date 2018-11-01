import React from 'react';
import heroes from '../../MyDatabase/HeroPictures-json';
import classNames from 'classnames';



class HeroeGroupContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleHeroDetailsId: null,
    }
  }

  setVisibeHeroDetails(id) {
    let newid;
    if (id===this.state.visibleHeroDetailsId) {
      this.setState({
        visibleHeroDetailsId: null,
      })
    } else {
    this.setState({
      visibleHeroDetailsId: id,
    })
  }
  }
  render() {
    let heroobj=JSON.parse(heroes);
    let toggleVisibility= (visibility)=>{!visibility}
    let showheroes= this.props.heroGroup.map((item)=>{
      let herourl;
      if (item.id==121) {herourl=""} else {herourl= heroobj.find(hero=> hero.id==item.id)["url_small_portrait"]}
      let herodetailclass=classNames({
        'Hero-detail-container': true,
        'Display-none': item.id!==this.state.visibleHeroDetailsId,
      })
      return (
        <div>
          <img src={herourl} onClick={()=>this.setVisibeHeroDetails(item.id)}
            ></img><div className={herodetailclass}>{item.roles}</div>

        </div>
      )
    })
    return (
      <div> {showheroes} </div>
    )
  }


}



export default HeroeGroupContainer
