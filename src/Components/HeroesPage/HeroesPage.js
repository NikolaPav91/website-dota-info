import React from 'react';
import HeroeGroupContainer from './HeroGroupContainer/HeroGroupContainer';
import './HeroesPage.css';

class HeroesPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allHeroes:[],
      visibleHeroDetailsId: null,
    }
  }

  updateContentCoord() {
    let contentpos=document.getElementById('hero-page-content01').getBoundingClientRect();
    this.setState({
      contentCoords: contentpos,
    });
  }


  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions);
  // }

  componentDidMount() {
    // this.updateContentCoord();
    // window.addEventListener("resize", ()=>this.updateContentCoord());

      fetch('https://api.opendota.com/api/heroes')
      .then(response=>response.json())
      .then(response=> this.setState({
        allHeroes: response,
      }))
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
    const strHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="str");
    const agiHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="agi");
    const intHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="int");


    return (
      <div className="All-content-container">
        <div id="hero-page-bg01">
          <div id="hero-page-content01">
            <HeroeGroupContainer
              setVisibeHeroDetails={(id)=> this.setVisibeHeroDetails(id)}
              visibleHeroDetailsId={this.state.visibleHeroDetailsId}
              heroGroup={strHeroes} />
            <HeroeGroupContainer
              setVisibeHeroDetails={(id)=> this.setVisibeHeroDetails(id)}
              visibleHeroDetailsId={this.state.visibleHeroDetailsId}
              heroGroup={agiHeroes} />
            <HeroeGroupContainer
              setVisibeHeroDetails={(id)=> this.setVisibeHeroDetails(id)}
              visibleHeroDetailsId={this.state.visibleHeroDetailsId}
              heroGroup={intHeroes} />
          </div>
        </div>
      </div>
    )
  }
}


export default HeroesPage
