import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import './PageTIMedia.css';
import YouTube from 'react-youtube';

class PageTIMedia extends React.PureComponent {

  render() {
    return (
      <div className="All-content-container">

          <div className="YT-container-ti-media">
            <YouTube
              videoId="videoseries?list=PLxkyNsoBqOdBZElEzwP2B9HX3rsVuFz47&v=LpqIj5PtSjY"
              className="YT-ti-media"
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
                   width:'100%',
                   chrome: 'transparent noheader',
                   theme: 'dark',

                 }}
               />
            </div>
            <div id="instagram-feed-container">
              <h3>INSTAGRAM</h3>
              <iframe src="http://snapwidget.com/p/widget/?id=IKDEYwHqYk&amp;t=941" title="Instagram Widget"
               allowtransparency="true" frameborder="0" scrolling="yes"
               className="Instagram-feed"></iframe>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageTIMedia
