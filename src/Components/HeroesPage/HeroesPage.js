import React from 'react';
import HeroeGroupContainer from './HeroGroupContainer/HeroGroupContainer';
import './HeroesPage.css';
import Loader from '../Loader/Loader';
import classNames from 'classnames';

class HeroesPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allHeroes:[],
      visibleHeroDetails: {},
      loaderActive: true,
      heroInfoPosition: 'relative',
      windowSize: null,
    }
    this.scrollHandler = this.scrollHandler.bind(this)
    this.resizeHandler = this.resizeHandler.bind(this)
  }

  resizeHandler() {
    if (window.matchMedia("(max-width: 730px)").matches) {
      if (this.state.windowSize==='big') {
        this.setState({
          windowSize:'small'
        })
        if (document.querySelector('.Hero-info-container').getBoundingClientRect().top<-5) {
          this.setState({
            heroInfoPosition: 'fixed'
          })
        } else {
          this.setState({
            heroInfoPosition: 'relative'
          })
        }
        window.addEventListener("scroll", this.scrollHandler)
      } else return;
    } else {
      if (this.state.windowSize==='small') {
        this.setState({
          heroInfoPosition: 'relative',
          windowSize: 'big',
        });
        window.removeEventListener('scroll', this.scrollHandler)
      } else return;
    }
  }
  scrollHandler() {
    if (document.querySelector('.Hero-info-container').getBoundingClientRect().top<-5) {
      this.setState({
        heroInfoPosition: 'fixed'
      })
    };
    if (document.querySelector('.Hero-info-container').getBoundingClientRect().top+1<document.getElementById('hero-info-wrapper').getBoundingClientRect().top) {
      this.setState({
        heroInfoPosition: 'relative',
      })
    }
  }


  adaptHeroInfoPositionToScreenSize() {
    // if (this.state.allHeroes==="Error") return
      if (window.matchMedia("(max-width: 730px)").matches) {
        this.setState({
          windowSize:'small'
        });
        if (document.querySelector('.Hero-info-container').getBoundingClientRect().top<-5) {
          this.setState({
            heroInfoPosition: 'fixed'
          })
        };
        window.addEventListener("scroll", this.scrollHandler)
      } else {
        this.setState({
          windowSize: 'big',
        })
      }
      window.addEventListener("resize", this.resizeHandler);
  }


  componentDidMount() {
    fetch('https://api.opendota.com/api/heroes')
    .then(response=>response.json())
    .then(response=> this.setState({
      allHeroes: response,
      loaderActive: false,
    }))
    .then( response=> this.adaptHeroInfoPositionToScreenSize()

    )
    .catch(response=> this.setState({
      allHeroes: "Error",
      loaderActive: false,
    }))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
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
          <div className="All-content-container  Green-background">
            <div id="hero-page-bg01">
              <div className="Error-message Big" id="error-message-heroes">
                <p>Something went wrong, please try again later.</p>
                <p>(Maximum of 60 calls per minute to opendota api probably exceeded)</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.loaderActive) {
      return (
        <div className="All-content-container">
          <header className="header-picture1"></header>
          <div className="All-content-container  Green-background">
            <div id="hero-page-bg01">
              <Loader className="Loader"/>
            </div>
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

  let heroinfoclass= classNames({
    'Position-fixed': this.state.heroInfoPosition==='fixed',
    'Position-relative': this.state.heroInfoPosition==='relative',
    'Hero-info-container': true,
  })

    return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div className="All-content-container Green-background">
          <div id="hero-page-content01">
            <div id="hero-info-wrapper">
            <div className={heroinfoclass}>
              <div id="hero-name-container-heropage"> {heroname}</div>
              {herorolesdiv}
            </div>
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
