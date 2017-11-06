import React, { Component } from 'react'

class Snek extends Component {  
  /*Create your functions here*/
  renderDescription() {
    return "A simple Snake Game";
  }

  render() {
    /*Call them in the return */
    return (
      <div className="Snek">
        <div className="title">{this.renderDescription()}</div>
      </div>
    );
  }
}

export default Snek;
