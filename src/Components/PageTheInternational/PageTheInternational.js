import React from 'react';
import { connect } from 'react-redux';
import './PageTheInternational.css';
import MenuBarContainer from '../MenuBar/MenuBar';

class PageTheInternational extends React.PureComponent {


  render() {
    let currenturl= this.props.routerprops.location.pathname;
    return (
        <div className="All-content-container">
          <div id="international-header-bg">
            <div id="international-header-logo">

            </div>
          </div>
          <div id="international-navibar-bg">
            <div id="international-navibar-content">
            <MenuBarContainer
              menuButtons={["Overview", "Standings", "Media", "Teams"]}
              currentURL={currenturl}
              subLink="The International/"
            />
          </div>

          </div>
          <div id="international-content-bg01">
            
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

const PageTheInternationalContainer= connect(null, mapDispatchToProps)(PageTheInternational);
export default PageTheInternationalContainer
