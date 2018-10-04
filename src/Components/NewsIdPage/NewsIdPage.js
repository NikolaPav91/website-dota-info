import React from 'react';


export default class NewsIdPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      story: this.props.currentNews.find((item)=> item.id===this.props.routerprops.match.params.newsId)
    }
  }

  render() {
    let story=this.state.story;
    return (
      <div>{this.state.story.title}</div>
    )
  }
}
