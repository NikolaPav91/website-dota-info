import React from 'react';
import Script from 'react-load-script';
import { Tweet } from 'react-twitter-widgets';
import './NewsIdPage.css';
import RecentMatches from '../RecentMatches/RecentMatches';

export default class NewsIdPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,
    }
  }



    render() {
    let story=this.props.currentNews.find((item)=> item.id===this.props.routerprops.match.params.newsId);
    let storyshow= story.text.map((item)=> {
      if (item.startsWith("tweetId='")===true){
        return (
        <Tweet tweetId={item.slice(9,-1)}
      /> )}
      else {
        return (
          <div className="Story-text-container" dangerouslySetInnerHTML={{__html: item}}></div>
      )}
    })
    let storyHTML=(<div dangerouslySetInnerHTML={{__html: story.text}}></div>)
    return (
      <div className= "Content-allbg">
        <div id="newsid-content01" className="Content-width">
          <div className="News-id-story">
            <h1 className="Story-title-newsid">{story.title}</h1>
            <img className="Title-picture-newsid" src={story.picturesrc}></img>
              {storyshow}
          </div>
          <RecentMatches containerId="newsid-recent-matches-container"/>
        </div>
      </div>
    )
  }
}
