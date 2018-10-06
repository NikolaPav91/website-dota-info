import React from 'react';
import Script from 'react-load-script';
import { Tweet } from 'react-twitter-widgets';

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
          <div dangerouslySetInnerHTML={{__html: item}}></div>
      )}
    })
    let storyHTML=(<div dangerouslySetInnerHTML={{__html: story.text}}></div>)
    return (
      <div>
      <div>
        <Tweet tweetId='1047573506865549313'
        />
      <div>{story.title}</div>
      <iframe className="NewsId-video"
        src="https://www.youtube-nocookie.com/embed/v7TkQNLKaHg?rel=0"
        allowfullscreen="true"></iframe>
        {storyshow}
      </div>

    </div>
    )
  }
}
