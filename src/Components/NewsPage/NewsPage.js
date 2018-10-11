import React from 'react';
import { connect } from 'react-redux';
import News from './News';
import NewsSlider from '../NewsSlider/NewsSlider';
import './NewsPage.css';
import RecentStories from '../RecentStories/RecentStories'

class NewsPage extends React.PureComponent {

  componentDidMount() {
      this.props.setActiveIndex(1);
    }

  render() {
    return (
      <div className="All-content-container">
        <div id="news-container-bg01">

            <NewsSlider sliderNews={News.slice(-4).reverse()}
            />
        </div>
        <div className="" id="news-container-bg02">
          <div id="content-news02">


              <RecentStories recentNews={News}/>
            <div id="recent-matches-container">

            </div>
          </div>
        </div>
        <p className="App-intro">
              This is the News page.
        </p>
      </div>
    )
  }
}

const mapDispatchToProps= (dispatch)=> {
  return {

    setActiveIndex: (index) => {
      dispatch({
        type: 'CHANGE_ACTIVE_INDEX',
        index: index,
      });
    },
  }
}

const NewsPageContainer= connect(null, mapDispatchToProps)(NewsPage);

export default NewsPageContainer
