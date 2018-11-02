import React from 'react';
import HeroeGroupContainer from './HeroGroupContainer/HeroGroupContainer';
import './HeroesPage.css';

class HeroesPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allHeroes:[],
      visibleHeroDetails: {},
    }
  }

  updateContentCoord() {
    let contentpos=document.getElementById('hero-page-content01').getBoundingClientRect();
    this.setState({
      contentCoords: contentpos,
    });
  }


  componentDidMount() {

      fetch('https://api.opendota.com/api/heroes')
      .then(response=>response.json())
      .then(response=> this.setState({
        allHeroes: response,
      }))
    }

  setVisibeHeroDetails(item) {
    let newhero;
    if (item===this.state.visibleHeroDetails) {
      this.setState({
        visibleHeroDetails: {},
      })
    } else {
      this.setState({
        visibleHeroDetails: item,
      })
    }
  }

  render() {
    const strHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="str");
    const agiHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="agi");
    const intHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="int");


    return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div style={{width:"400px"}}>
          <div>Name: {this.state.visibleHeroDetails["localized_name"]}</div>
          <div>Roles: {this.state.visibleHeroDetails.roles}</div>
      </div>
        <div id="hero-page-bg01">
          <div id="hero-page-content01">
            <HeroeGroupContainer
              setVisibeHeroDetails={(item)=> this.setVisibeHeroDetails(item)}
              visibleHeroDetailsId={this.state.visibleHeroDetails.id}
              heroGroup={strHeroes}
              mainAttribute='Strength'
             />
            <HeroeGroupContainer
              setVisibeHeroDetails={(item)=> this.setVisibeHeroDetails(item)}
              visibleHeroDetailsId={this.state.visibleHeroDetails.id}
              heroGroup={agiHeroes}
              mainAttribute='Agility'
            />
            <HeroeGroupContainer
              setVisibeHeroDetails={(item)=> this.setVisibeHeroDetails(item)}
              visibleHeroDetailsId={this.state.visibleHeroDetails.id}
              heroGroup={intHeroes}
              mainAttribute='Intelligence'
            />
          </div>
        </div>
      </div>
    )
  }
}


export default HeroesPage
