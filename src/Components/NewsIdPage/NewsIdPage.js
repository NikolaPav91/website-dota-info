import React from 'react';
import Script from 'react-load-script';
import Loader from '../Loader/Loader';

export default class NewsIdPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }

  handleScriptError() {
    this.setState({ scriptError: true })
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }

  render() {
    let story=this.props.currentNews.find((item)=> item.id===this.props.routerprops.match.params.newsId);
    let storyHTML;
    if (!this.scriptLoaded) {storyHTML=(<Loader className="Loader"></Loader>)} else {storyHTML=(<div dangerouslySetInnerHTML={{__html: story.text}}></div>)}
    return (
      <div>
      <Script
      attributes={{charset:'utf-8', async: '',}}
      url="https://platform.twitter.com/widgets.js"
      onCreate={this.handleScriptCreate.bind(this)}
      onError={this.handleScriptError.bind(this)}
      onLoad={this.handleScriptLoad.bind(this)}
    />
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
