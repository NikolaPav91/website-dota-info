import React from 'react';
import classNames from 'classnames';

class HeroPictureContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      containerPositionCorected: false,
    }
  }

  setVisibeHeroDetails() {
    this.props.setVisibeHeroDetails();



  }

  hideBigHeroPicAndDetails() {
    this.props.setVisibeHeroDetails();
  }

  render() {
    let bigheropicclass= classNames({
      "Hero-big-picture-heropage": true,
      'Display-block': this.props.isBigHeroPic,
    })
    return (
      <div className="Hero-picture-container-heropage">
        <img className="Hero-small-picture-heropage"
          src={this.props.myHeroInfo["url_small_portrait"]}
          onMouseEnter={()=> this.setVisibeHeroDetails() }
          ></img>


        <img className={bigheropicclass}
          id={this.props.myHeroInfo.name}
          onMouseLeave={()=>  this.setVisibeHeroDetails()}
          src={this.props.myHeroInfo["url_large_portrait"]}></img>

      </div>
    )
  }
}

export default HeroPictureContainer
