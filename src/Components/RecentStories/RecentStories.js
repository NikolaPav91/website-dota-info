import React from 'react';
import './RecentStories.css'

const RecentStories= ({recentNews})=> {
  let lastsixstories=recentNews.reverse().slice(0,6);
  let showstories= lastsixstories.map((item)=> {
    let storyteaser= item.text.find(item=>item.startsWith("tweetId='")===false).slice(0,200);
    let storyteaserend='...'
    if (storyteaser.endsWith('.')===true) {
      storyteaserend='..'
    }
    return (
      <div className="Recentstory-container">
        <img src={item.picturesrc} className="Recentstory-picture"></img>
        <div>{item.title}</div>
        <div className="Recentstory-teaser" dangerouslySetInnerHTML={{__html: storyteaser + storyteaserend}}></div>
      </div>
    )
  }
)

  return (
    <div id="recent-stories-container">
      {showstories}
    </div>
  )
}

export default RecentStories
