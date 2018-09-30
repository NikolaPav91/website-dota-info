import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import MenuBarLink from '../MenuBarLink/MenuBarLink';
import { connect } from 'react-redux';

class MenuBar extends React.Component {

render(){


  let menubarbuttons= this.props.menuButtons;
  return(
    menubarbuttons.map((item, index)=>{
    // let itemurl= item.replace(" ", "%20");
    return <MenuBarLink
      text={item}
      active= {index===this.props.menuBarActiveIndex}
      // {window.location.href==="http://localhost:3000/"+itemurl}
    />
  }
    //Moze bez dodatne komponente ovako:
    // <Link
    //   className={
    //     classNames({
    //       'Menu-link': true,
    //       'Active-menulink': this.state.activeIndex===index,
    //   })}
    //   onClick={(event) => this.onMenuLinkClick(event,index)}
    //   to={'/'+ item}
    //   active={this.state.activeIndex===index}>
    //     {item}
    // </Link>
    // ili staviti posle map-a a pre returna let linkclass=classNames({})

    )
  )
}
}

const mapStateToProps= (state) => {
  return {
    menuBarActiveIndex: state.activeIndex,
  }
}


const MenuBarContainer= connect(
  mapStateToProps
)(MenuBar)

export default MenuBarContainer
