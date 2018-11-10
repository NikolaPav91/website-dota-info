import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import './PageTIMedia.css';
import YouTube from 'react-youtube';

class PageTIMedia extends React.PureComponent {

  render() {
    return (
      <div className="All-content-container" id="international-media-allbg">
        <div className="YT-container">
        <YouTube
          videoId="videoseries?list=PLxkyNsoBqOdBZElEzwP2B9HX3rsVuFz47&v=LpqIj5PtSjY"
          className="YT-home"
          opts= {
            {width: "100%",
            height: '637px',}
          }
        />
      </div>
        <div id="international-media-bg01">
          <div id="international-media-content01">
            <div id="twitter-feed">
              <h3>TWITTER</h3>
              <Timeline
                 dataSource={{
                   sourceType: 'profile',
                   screenName: 'dota2',
                 }}
                 options={{
                   username: 'dota2',
                   height: '1600',
                   width:'450',
                   chrome: 'noscrollbar transparent noheader',
                   theme: 'dark',

                 }}
               />
            </div>
            <div id="instagram-feed">
              <h3>INSTAGRAM</h3>
              <iframe src="http://snapwidget.com/p/widget/?id=IKDEYwHqYk&amp;t=941" title="Instagram Widget"
               allowtransparency="true" frameborder="0" scrolling="yes"
              style={{border: "none", overflow:"hidden", width:"480px", height:"1566px"}}></iframe>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageTIMedia
