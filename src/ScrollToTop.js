import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname.startsWith('/The International') &&
    prevProps.location.pathname.startsWith('/The International')) {} else {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    console.log(this.props.location)
    return this.props.children;
  }
}

const ScrollToTopContainer= withRouter(ScrollToTop);
export default ScrollToTopContainer
