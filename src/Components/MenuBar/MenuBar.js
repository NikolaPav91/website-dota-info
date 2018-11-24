import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import MenuBarLink from '../MenuBarLink/MenuBarLink';
import { connect } from 'react-redux';

class MenuBar extends React.Component {
  render(){
    let menubarbuttons= this.props.menuButtons;
    return(
      <div className="Menu-bar">
        {menubarbuttons.map((item, index)=>{
          return <MenuBarLink
            text={item}
            active= {this.props.currentURL.startsWith("/" +this.props.subLink+ item)}
            subLink={this.props.subLink}
            className={this.props.className}
            key={this.props.subLink + item}
          />
        }
      )}
      </div>
    )
  }
}


export default MenuBar
