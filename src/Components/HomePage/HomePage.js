import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

class HomePage extends React.Component {
  componentDidMount() {
      this.props.setActiveIndex(0);
    }

  render() {
    return (
      <div className="content-container-home">
      <header className="header-picture1"></header>
      <div id="home-container-bg01" className="Container-bg">
        <div id="home-inner-bg01">
        <div className="Content-container-home" id="content-container-home01">
          <div id="content-home01">
          <h2>The most-played game on Steam.</h2>
        </div>
        </div>
      </div>
      </div>
      <div id="home-container-bg02" className="Container-bg"></div>
      <div id="home-container-bg03" className="Container-bg"></div>

      <YouTube
        videoId="SmnqsdeHFT0"
      />
      <p className="App-intro">
              This is the Home page.
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

const HomePageContainer= connect(null, mapDispatchToProps)(HomePage);

export default HomePageContainer
