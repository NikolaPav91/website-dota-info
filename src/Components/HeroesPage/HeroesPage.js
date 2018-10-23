import React from 'react';
import { connect } from 'react-redux';

class HeroesPage extends React.PureComponent {

  componentDidMount() {
      this.props.setActiveIndex(3);
    }

  render() {
    return (
      <p className="App-intro">
              This is the Heroes page.
            </p>
    )
  }
}


export default HeroesPage
