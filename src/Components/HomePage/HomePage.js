import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  componentDidMount() {
      this.props.setActiveIndex(0);
    }

  render() {
    return (
      <div className="content-container-home">
      <header className="header-picture1"></header>
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
