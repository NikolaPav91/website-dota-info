import React from 'react';
import { connect } from 'react-redux';
import News from '../MyDatabase/News-objects.js';
import NewsSlider from '../NewsSlider/NewsSlider';
import './NewsPage.css';
import RecentStories from '../RecentStories/RecentStories';
import RecentMatches from '../RecentMatches/RecentMatches';

class NewsPage extends React.PureComponent {

  render() {
    return (
      <div className="All-content-container" id="page-news-allbg">
        <div id="news-container-bg01">

            <NewsSlider sliderNews={News.slice(-4).reverse()}
            />
        </div>
        <div className="" id="news-container-bg02">
          <div id="content-news02">


              <RecentStories recentNews={News}/>
              <RecentMatches containerId="news-page-recent-matches-container" />
          </div>
        </div>
      </div>
    )
  }
}


export default NewsPage
