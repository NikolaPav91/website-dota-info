import React from 'react';
import News from './News';
import './NewsSlider.css'



export default class NewsSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentNews: News,
    }
  }

  render() {
    let currentnews=this.state.currentNews;
    let shownews=currentnews.map((item,index)=> {
      return (
      <div className="Sliderstory">
        <img className="Sliderstory-picture" src={item.picturesrc}></img>
        <div className="Sliderstory-info-container">
          <div className="Sliderstory-info-content">
            {item.title}
          </div>
        </div>
      </div>
    )})
    return (
      <div id="slider">
        {shownews}
      </div>
    )
  }
}
