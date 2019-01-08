import React from 'react';
import { Tweet } from 'react-twitter-widgets';
import './NewsIdPage.css';
import RecentMatchesContainer from '../RecentMatches/RecentMatches';
import YouTube from 'react-youtube';

export default class NewsIdPage extends React.PureComponent {
    render() {
    let story=this.props.currentNews.find((item)=> item.id===this.props.routerprops.match.params.newsId);
    let storyshow= story.text.map((item)=> {
      if (item.startsWith("tweetId='")===true){
        return (
        <Tweet tweetId={item.slice(9,-1)}
      /> )};
      if (item.startsWith("Youtube-id='")===true) {
        return (
          <div className="YT-container-newsid">
            <YouTube
              videoId={item.slice(12,-1)}
              className="YT-newsid"
            />
          </div>
        )}
        if (item.startsWith("QUOTEDIV:'")) {
          return(
            <div className="Quote-container">
              <i className="fas fa-quote-right Quote-icon-newsid"></i> <div className="Story-text-container" dangerouslySetInnerHTML={{__html: item.slice(10,-1)}}></div>
            </div>
          )
        } else {
        return (
          <div className="Story-text-container" dangerouslySetInnerHTML={{__html: item}}></div>
      )}
    })

    return (
      <div className= "All-content-container Green-background">
        <div id="newsid-content01" className="Content-width">
          <div className="News-id-story">
            <h1 className="Story-title-newsid">{story.title}</h1>
            <img className="Title-picture-newsid" src={story.picturesrc} alt=""></img>
              {storyshow}
          </div>
          <RecentMatchesContainer containerId="newsid-recent-matches-container"/>
        </div>
      </div>
    )
  }
}
