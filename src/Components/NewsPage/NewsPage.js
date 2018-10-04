import React from 'react';
import { connect } from 'react-redux';
import News from './News';
import NewsSlider from '../NewsSlider/NewsSlider';
import './NewsPage.css';

class NewsPage extends React.PureComponent {

  componentDidMount() {
      this.props.setActiveIndex(1);
    }

  render() {
    return (
      <div className="All-content-container">
        <div id="news-container-bg01">

            <NewsSlider currentNews={News}
            />
        </div>
        <div className="testdiv" id="testdiv1"></div>
        <div className="testdiv" id="testdiv2"></div>
        <div className="testdiv" id="testdiv3"></div>
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
