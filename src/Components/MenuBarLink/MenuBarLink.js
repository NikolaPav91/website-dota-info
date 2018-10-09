import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default class MenuBarLink extends React.Component {

  render() {
    let menulinkclass= classNames({
      'Menu-link': true,
      'Active-menulink': this.props.active,
    })

    return(
      <Link
        className={menulinkclass}
        to={'/'+ this.props.text}>
        {this.props.text}
      </Link>
    )
  }
}
