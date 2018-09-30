import React from 'react';
import { connect } from 'react-redux';

class NewsPage extends React.Component {

  componentDidMount() {
      this.props.setActiveIndex(1);
    }

  render() {
    return (
      <p className="App-intro">
              This is the News page.
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

const NewsPageContainer= connect(null, mapDispatchToProps)(NewsPage);

export default NewsPageContainer
