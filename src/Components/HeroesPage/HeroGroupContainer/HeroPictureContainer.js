import React from 'react';

class HeroPictureContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      containerPositionCorected: false,
    }
  }
    // ({herourl, setVisibeHeroDetails, heroInfoClass, roles, contentCoordsLeft})

  render() {
    let heroinfodiv = document.querySelector('.Display-block');
    if (this.props.heroInfoClass.includes("Display-block") && heroinfodiv!==null) {
      let heroinfocoords=heroinfodiv.getBoundingClientRect();
      if (heroinfocoords.left < this.props.contentCoords.left) {
            if (heroinfocoords.left -40 + heroinfocoords.width/2< this.props.contentCoords.left ) {
              heroinfodiv.style.transform= 'translateX(0%)';
              heroinfodiv.style.left= '0px';
            } else {heroinfodiv.style.transform= 'translateX(0%)';
            heroinfodiv.style.left= '-60px';}
      }

      if (heroinfocoords.right> this.props.contentCoords.right) {
          if (heroinfocoords.right + 50 - heroinfocoords.width/2 > this.props.contentCoords.right) {
            heroinfodiv.style.transform= 'translateX(-100%)';
            heroinfodiv.style.left= '100%';
          } else {
            heroinfodiv.style.transform= 'translateX(-100%)';
            heroinfodiv.style.left= '120px';
          }

      }
    }
    if (this.props.heroInfoClass.includes("Display-block")) {
      this.setState({
        containerPositionCorected: true,
      })
    }
    return (
      <div className="Hero-picture-container-heropage">
        <img src={this.props.herourl} onClick={()=>this.props.setVisibeHeroDetails()}></img>
        <div className={this.props.heroInfoClass}>{this.props.roles}</div>
      </div>
    )
  }
}

export default HeroPictureContainer
