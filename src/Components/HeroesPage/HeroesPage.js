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

  componentDidMount() {
      fetch('https://api.opendota.com/api/heroes')
      .then(response=>response.json())
      .then(response=> this.setState({
        allHeroes: response,
      }))
    }

    setVisibeHeroDetails(id) {
      this.setState({
        visibleHeroDetailsId: id,
      })
    }

  render() {
    const strHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="str");
    const agiHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="agi");
    const intHeroes= this.state.allHeroes.filter(item=>item["primary_attr"]==="int");


    return (
      <div className="All-content-container">
        <div id="hero-page-bg01">
          <div id="hero-page-content01">
            <HeroeGroupContainer  setVisibeHeroDetails={()=> this.setVisibeHeroDetails}
              visibleHeroDetailsId={this.state.visibleHeroDetailsId}
              heroGroup={strHeroes} />
            <HeroeGroupContainer  heroGroup={agiHeroes} />
            <HeroeGroupContainer  heroGroup={intHeroes} />
          </div>
        </div>
      </div>
    )
  }
}


export default HeroesPage
