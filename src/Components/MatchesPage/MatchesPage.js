import React from 'react';
import { connect } from 'react-redux';

class MatchesPage extends React.Component {

  componentDidMount() {
      this.props.setActiveIndex(3);
    }

  render() {
    return (
      <p className="App-intro">
              This is the Matches page.
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

const MatchesPageContainer= connect(null, mapDispatchToProps)(MatchesPage);

export default MatchesPageContainer
