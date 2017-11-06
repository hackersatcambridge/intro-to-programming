import React, { Component } from 'react'
import '../styles/Playground.css'

class Playground extends Component { 
  // Create your functions here   
  // This is a function as well! The syntax is only slightly different 
  renderDescription () {
    return "This is your Playground, use it as you please";
  }
  // I encourage you to poke around and break stuff ;) 

  // render() is called by higher forces, you can dwell into this later
  // for now, all you need to know if that it is called whenever you make changes
  render() {
    // You can make functions in here as well
    function funnyFunction(funnyInput){
      console.log(funnyInput);
    }


    // Call them in the `return` block
    // You may notice that you call stuff outside of render() with `this.` 
    // and inside the render() just simply without the `this.` in front
    return <div> {this.renderDescription()}
    {funnyFunction("Some input")} 
    </div>    
  }
}

export default Playground;
