import React from 'react';
import { connect } from 'react-redux';


class PlayerRankingPage extends React.Component {

  componentDidMount() {
      this.props.setActiveIndex(4);
    }

  render() {

    return (
      <p className="App-intro">
              This is the Player Ranking page.
            </p>
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

const PlayerRankingPageContainer= connect(null, mapDispatchToProps)(PlayerRankingPage);

export default PlayerRankingPageContainer
