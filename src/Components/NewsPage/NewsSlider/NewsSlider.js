import React from 'react';
import './NewsSlider.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom'



export default class NewsSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
    let stories= document.querySelectorAll('.Sliderstory');
    for (let story of stories) {
      story.style.transition="none";
    }
  }

  sliderOnTimeChange() {
    let nextstoryindex= this.state.showingStoryIndex+1;
    if (this.props.sliderNews.length=== nextstoryindex) {
      nextstoryindex= 0
    }
    this.setState({
      showingStoryIndex: nextstoryindex,
    })
  }
  componentDidMount() {

    this.intervalId = setInterval(()=>this.sliderOnTimeChange(), 4500);
  }

  render() {
    let slidernews=this.props.sliderNews;
    let shownews=slidernews.map((item,index)=> {
      let slidertext= item.teaser.slice(0,200);
      let slidertextend='...'
      if (slidertext.endsWith('.')===true) {
        slidertextend='..'
      }
      let sliderstoryclass= classNames({
        'Sliderstory': true,
        'Next-story': ((index===this.state.showingStoryIndex+1) || (index===this.state.showingStoryIndex-slidernews.length +1)),
        'Story-showing': index===this.state.showingStoryIndex,
        'Story-removing': ((index===this.state.showingStoryIndex-1) || (index===this.state.showingStoryIndex + slidernews.length -1 )),
        })
      return (
        <li className= {sliderstoryclass} storyIndex={index}>
          <img className="Sliderstory-picture" src={item.picturesrc}></img>
          <div className="Sliderstory-info-container">
            <div className="Sliderstory-info-content">
              <h3>{item.title}</h3>

              {/*Finds the first item that is not a twitterwidget  */}
              <p dangerouslySetInnerHTML={{__html: slidertext + slidertextend}}></p>
              <Link
                className='Read-more-button'
                to={'/News/'+ item.id}>
                <div>Read More</div>
              </Link>
            </div>
          </div>
        </li>
      )
    })
    let numberofbuttons= slidernews.length;
    let sliderbuttons= slidernews.map((item, index)=>{
      return (
        <div className={ classNames({
          "Sliderbuttons": true,
          "Active": index===this.state.showingStoryIndex,
        })
        }
          style={{width: 1100/numberofbuttons -2 +"px"}}
          onClick={()=>this.onSliderButtonClick(index)}
          sliderIndex={index}></div>
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
