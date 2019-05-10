import React from 'react';
import { Link } from 'react-router-dom';

const RecentStories= ({recentNews})=> {
  const copyOfNews = recentNews.slice();
  let lastsixstories=copyOfNews.reverse().slice(0,6);
  let showstories= lastsixstories.map((item)=> {
    let storyteaser= item.teaser.slice(0,200);
    let storyteaserend='...'
    if (storyteaser.endsWith('.')===true) {
      storyteaserend='..'
    }
    return (
    <Link to={'/News/'+ item.id}
      className="Recentstory-container"
      key={item.id + "recent_story"}
      >

        <img src={item.picturesrc} alt={""} className="Recentstory-picture"></img>
        <div className="Recentstory-title">{item.title}</div>
        <p className="Recentstory-teaser" dangerouslySetInnerHTML={{__html: storyteaser + storyteaserend}}></p>

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
