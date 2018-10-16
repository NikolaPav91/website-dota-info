import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default class MenuBarLink extends React.Component {

  render() {
    let theclass=this.props.className;
    let menulinkclass= classNames({
      [theclass]: true,
      'Active-menulink': this.props.active,
    })

    let location=this.props.text;
    if (location==="The International") {location="The International/Overview"}

    return(
      <Link
        className={menulinkclass}
        to={'/'+this.props.subLink+location}>
        {this.props.text}
      </Link>
    )
  }
}
