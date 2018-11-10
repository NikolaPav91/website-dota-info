import React from 'react';

export default class TeamsPagePageNumbers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPageNumbers: [1,2,3,4,5],
    }
  }

    render() {
      let currentpagenumbers=[1,2,3,4,5];
      if (this.props.maxPages) {
        if (this.props.currentPage<4) {
          currentpagenumbers=[1,2,3,4,5]
        } else {
        if (this.props.currentPage>this.props.maxPages-4) {
          currentpagenumbers=[this.props.maxPages-4,this.props.maxPages-3,this.props.maxPages-2,
            this.props.maxPages-1,this.props.maxPages]
        } else {   currentpagenumbers= [this.props.currentPage-2, this.props.currentPage-1,
          this.props.currentPage, this.props.currentPage+1, this.props.currentPage+2]}
        }
      }

      let showpagenumbers= currentpagenumbers.map(item=> {
        if (item===this.props.currentPage) {
          return (
            <li className="Current-page-number">{item}, </li>
          )
        }
        else return (
          <li onClick={()=>this.props.setCurrentPage(item)}>{item},</li>
        )
      })

      let previousbtn;
      if (this.props.currentPage>1) {
        previousbtn= <li onClick={()=> this.props.setCurrentPage(this.props.currentPage -1)}> Previous</li>
      }

      let nextbtn;
      if (this.props.currentPage< this.props.maxPages) {
        nextbtn= <li onClick={()=> this.props.setCurrentPage(this.props.currentPage +1)}> Next </li>
      }

      let firstbtn;
      if (this.props.currentPage> 3) {
        firstbtn= <li id="teams-page-button-first" onClick={()=> this.props.setCurrentPage(1)}> First</li>
      }

      let lastbtn;
      if (this.props.currentPage< this.props.maxPages-2) {
        lastbtn= <li id="teams-page-button-last" onClick={()=> this.props.setCurrentPage(this.props.maxPages)}> Last</li>
      }


      let optionsarray=[];
      for (let i = 1; i <= this.props.maxPages; i++) {
        optionsarray.push(i);
      }
      let showoptions= optionsarray.map(item=> {
        return (
        <option value={item}>{item}</option>)
      })
      console.log(this.props.currentPage)





      return (
        <div id="teams-page-number-list-container">
          <select className="custom-select" onChange={(event)=>this.props.setCurrentPage(Number(event.target.value))}>
            {showoptions}
          </select>
          <ul>
            {firstbtn}
            {previousbtn}
            {showpagenumbers}
            {nextbtn}
            {lastbtn}
          </ul>
        </div>
    )
  }
}
