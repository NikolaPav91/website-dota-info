import React from 'react';
import MenuBarLink from '../MenuBarLink/MenuBarLink';

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
