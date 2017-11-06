import React, { Component } from 'react'

class Transfer extends Component { 
  /*Create your functions here*/
  renderDescription () {
    return "Transfer Knowledge Playground"
  }
  render() {    
    /*Call them in the return */
    return <div className="ToDo"> 
      <div className="title">{this.renderDescription()}</div>    
    </div> 
  }
}

export default Transfer;
