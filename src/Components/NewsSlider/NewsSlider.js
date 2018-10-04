import React from 'react';
import News from './News';
import './NewsSlider.css';
import classNames from 'classnames';



export default class NewsSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentNews: News,
      showingStoryIndex: 0,
      buttonClick: false,
    }
    let intervalId;
  }

  onSliderButtonClick(index) {

    clearInterval(this.intervalId);
    this.setState({
      showingStoryIndex: index,
      buttonClick: true,
    });
    if (document.querySelector('.Story-showing')) {document.querySelector('.Story-showing').style.transition="none";}
    if (document.querySelector('.Story-removing')){document.querySelector('.Story-removing').style.transition="none";}
  }

  sliderOnTimeChange() {
    let nextstoryindex= this.state.showingStoryIndex+1;
    if (this.state.currentNews.length=== nextstoryindex) {
      nextstoryindex= 0
    }
    this.setState({
      showingStoryIndex: nextstoryindex,
    })
  }
  componentDidMount() {

    this.intervalId = setInterval(()=>this.sliderOnTimeChange(), 3000);
  }

  render() {
    let currentnews=this.state.currentNews;
    let shownews=currentnews.map((item,index)=> {
      return (
      <li
        className= { classNames({
          'Sliderstory': true,
          'Next-story': ((index===this.state.showingStoryIndex+1) || (index===this.state.showingStoryIndex-currentnews.length +1)) && !this.state.buttonClick,
          'Story-showing': index===this.state.showingStoryIndex,
          'Story-removing': ((index===this.state.showingStoryIndex-1) || (index===this.state.showingStoryIndex + currentnews.length -1 )) && !this.state.buttonClick,
          })}
        storyIndex={index} >

        <img className="Sliderstory-picture" src={item.picturesrc}></img>
        <div className="Sliderstory-info-container">
          <div className="Sliderstory-info-content">
            {item.title}
          </div>
        </div>
      </li>
    )})
    let numberofbuttons= currentnews.length;
    let sliderbuttons= currentnews.map((item, index)=>{
      return (
        <div className="Sliderbuttons"
          style={{width: 1100/numberofbuttons -2 +"px"}}
          onClick={()=>this.onSliderButtonClick(index)}
          sliderIndex={index}> {index}</div>
      )
    })
    return (
      <div id="content-news01">
      <ul id="slider">
        {shownews}
      </ul>
      <div id="slider-navigation">
        {sliderbuttons}
      </div>
    </div>
    )
  }
}
