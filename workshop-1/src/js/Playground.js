import React, { Component } from 'react'
import '../styles/Playground.css'

class Playground extends Component { 
  // Create your functions here 
  renderDescription () {
    return "This is your Playground, use it as you please"
  }
  // I encourage you to poke around and break stuff ;) 

  // render() is called by higher forces, you can dwell into this later
  // for now, all you need to know if that it is called whenever you make changes
  render() {
    // You can make functions in here as well
    // The syntax is only slightly different 
    function funnyFunction(funnyInput){
      console.log(funnyInput);
    }


    // Call them in the `return` block
    return <div> {this.renderDescription()}
    {funnyFunction("Some input")} 
    </div>    
  }
}

export default Playground;
