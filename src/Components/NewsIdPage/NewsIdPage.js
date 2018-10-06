import React from 'react';
import Script from 'react-load-script';

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
    let storyHTML=(<div dangerouslySetInnerHTML={{__html: story.text}}></div>)
    return (
      <div>
      <div>
      <div>{story.title}</div>
      <iframe className="NewsId-video"
        src="https://www.youtube-nocookie.com/embed/v7TkQNLKaHg?rel=0"
        allowfullscreen="true"></iframe>
        {storyHTML}
      </div>

    </div>
    )
  }
}
