import React from 'react';
import Script from 'react-load-script';
import { Tweet } from 'react-twitter-widgets';
import './NewsIdPage.css'
export default class NewsIdPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,
    }
  }



    render() {
      document.querySelector('#twitterscript').onload=()=> {console.log('twitterscript loaded')};
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
      <div className= "All-content-container">
      <div className="News-id-content">
      <div>{story.title}</div>

        {storyshow}
      </div>

    </div>
    )
  }
}
