import React from 'react';
import './RecentStories.css';
import { Link } from 'react-router-dom';

const RecentStories= ({recentNews})=> {
  let lastsixstories=recentNews.reverse().slice(0,6);
  let showstories= lastsixstories.map((item)=> {
    let storyteaser= item.teaser.slice(0,200);
    let storyteaserend='...'
    if (storyteaser.endsWith('.')===true) {
      storyteaserend='..'
    }
    return (
    <Link to={'/News/'+ item.id} className="Recentstory-container">
      <div>
        <img src={item.picturesrc} className="Recentstory-picture"></img>
        <div className="Recentstory-title">{item.title}</div>
        <p className="Recentstory-teaser" dangerouslySetInnerHTML={{__html: storyteaser + storyteaserend}}></p>
      </div>
    </Link>
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
