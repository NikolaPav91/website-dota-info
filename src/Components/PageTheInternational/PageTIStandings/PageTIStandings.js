import React from 'react';
import classNames from 'classnames';
import './PageTIStandings.css';
import { Link } from 'react-router-dom';

class PageTIStandings extends React.PureComponent {


  render() {
    let teamstandings= this.props.teams.sort((a,b)=> a.place - b.place).map((item,index)=> {
      let placementcontainerclass=classNames({
        'Placement-row-container': true,
        'Even-row': index%2===0,
        'Uneven-row': index % 2 ===1,
      })
      return (
        <tr key={item.id} className={placementcontainerclass}>
          <td className="Col-1">{item.place}.</td>
          <td className="Col-2">
            <Link
            to={'/Teams/'+ item.id }> <img src={item.logo}></img>{item.teamname}</Link></td>
          <td className="Col-3">{item.prizeMoneyUsd}$</td>
          <td className="Col-4">{item.prizeMoneyEur}</td></tr>
      )
    })
    return (
      <div className="All-content-container" id="international-standings-bg01">

        <div id="international-standings-content01">
          <table id="international-standings-table">
            <thead>
              <tr>
                <td className="Col-1">Place</td>
                <td className="Col-2">Team</td>
                <td className="Col-3">Prize Money(USD)</td>
                <td className="Col-3">Prize Money(EUR)</td></tr>
            </thead>
            <tbody>{teamstandings}</tbody>
          </table>

        </div>

      </div>
    )
  }
}

export default PageTIStandings
