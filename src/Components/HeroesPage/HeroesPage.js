import React from 'react';
import HeroeGroupContainer from './HeroGroupContainer/HeroGroupContainer';
import './HeroesPage.css';
import Loader from '../Loader/Loader';

class HeroesPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allHeroes:[],
      visibleHeroDetails: {},
      loaderActive: true,
    }
  }


  componentDidMount() {

      fetch('https://api.opendota.com/api/heroes')
      .then(response=>response.json())
      .then(response=> this.setState({
        allHeroes: response,
        loaderActive: false,
      }))
      .catch(response=> this.setState({
        allHeroes: "Error",
        loaderActive: false,
      }))
    }

  setVisibleHeroDetails(item) {
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
    if (this.state.allHeroes==="Error") {
      return (
        <div className="All-content-container">
          <header className="header-picture1"></header>
          <div id="hero-page-bg01">
            <div id="error-message-heroes"> Something went wrong, please try again later</div>
          </div>
        </div>
      )
    }
    if (this.state.loaderActive) {
      return (
        <div className="All-content-container">
          <header className="header-picture1"></header>
          <div id="hero-page-bg01">
            <Loader className="Loader"/>
          </div>
        </div>
      )
    }





    const strHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="str");
    const agiHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="agi");
    const intHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="int");
    let heroname="CHOOSE A HERO";
    let heroroles=[];
    let heroatack="";
    let herorolesdiv;
    if (this.state.visibleHeroDetails["localized_name"] !== undefined) {
      heroname=this.state.visibleHeroDetails["localized_name"].toUpperCase();
      heroroles=this.state.visibleHeroDetails.roles.join(" - ");
      heroatack=this.state.visibleHeroDetails["attack_type"] + " atack - "
      herorolesdiv=<div id="hero-role-container">{heroatack} <span>{heroroles}</span></div>
  }


    return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div className="All-content-container Green-background">
          <div id="hero-page-content01">
            <div id="hero-info-container">
              <div id="hero-name-container-heropage"> {heroname}</div>
              {herorolesdiv}
            </div>
            <div id="all-hero-groups-container">
              <HeroeGroupContainer
                setVisibleHeroDetails={(item)=> this.setVisibleHeroDetails(item)}
                visibleHeroDetailsId={this.state.visibleHeroDetails.id}
                heroGroup={strHeroes}
                mainAttribute='Strength'
               />
              <HeroeGroupContainer
                setVisibleHeroDetails={(item)=> this.setVisibleHeroDetails(item)}
                visibleHeroDetailsId={this.state.visibleHeroDetails.id}
                heroGroup={agiHeroes}
                mainAttribute='Agility'
              />
              <HeroeGroupContainer
                setVisibleHeroDetails={(item)=> this.setVisibleHeroDetails(item)}
                visibleHeroDetailsId={this.state.visibleHeroDetails.id}
                heroGroup={intHeroes}
                mainAttribute='Intelligence'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default HeroesPage
