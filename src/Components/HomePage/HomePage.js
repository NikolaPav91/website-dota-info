import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

class HomePage extends React.Component {
  componentDidMount() {
      this.props.setActiveIndex(0);
    }

  render() {
    return (
      <div className="All-content-container">
        <header className="header-picture1"></header>
        <div id="home-container-bg01" className="Container-bg">
          <div id="home-inner-bg01" className="Home-inner-bg">
            <div className="Content-container" id="content-container-home01">
              <div id="content-home01">
                <h1>The most-played game on Steam.</h1>
                <p>Every day, millions of players worldwide enter battle as one of
                  over a hundred Dota heroes. And no matter if it's their 10th hour
                  of play or 1,000th, there's always something new to discover.
                   With regular updates that ensure a constant evolution of gameplay,
                   features, and heroes, Dota 2 has truly taken on a life of its own.</p>
              </div>
            </div>
          </div>
        </div>
        <div id="home-container-bg02" className="Container-bg">
          <div id="home-inner-bg02" className="Home-inner-bg">
            <div className="Content-container" id="content-container-home02">
              <div id="content-home02">
                <h1>One Battlefield. Infinite Possibilities.</h1>
                <p>When it comes to diversity of heroes, abilities, and powerful
                  items, Dota boasts an endless array—no two games are the same. Any
                   hero can fill multiple roles, and there's an abundance of items to
                    help meet the needs of each game. Dota doesn't provide limitations
                     on how to play, it empowers you to express your own style..</p>
              </div>
            </div>
          </div>
        </div>
      <div id="home-container-bg03" className="Container-bg">
        <div id="home-inner-bg03" className="Home-inner-bg">
          <div className="Content-container" id="content-container-home03">
            <div id="content-home03">
              <h1>All heroes are free.</h1>
              <p>Competitive balance is Dota's crown jewel, and to ensure everyone
                 is playing on an even field, the core content of the game—like the
                 vast pool of heroes—is available to all players. Fans can collect
                 cosmetics for heroes and fun add-ons for the world they inhabit,
                 but everything you need to play is already included before you join
                 your first match.</p>
            </div>
          </div>
        </div>
      </div>
      <div id="home-container-bg04" className="Container-bg">
        <div className="Content-container">
          <YouTube
            videoId="SmnqsdeHFT0"
            className="YT-home"
            opts= {
              {width: "100%",
              height: '637px',}
            }
          />
        </div>
      </div>


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
