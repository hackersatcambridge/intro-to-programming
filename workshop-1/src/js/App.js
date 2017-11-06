import React, { Component } from 'react'
import '../styles/App.css'
import Playground from './Playground.js'
import ToDo from './ToDo.js'
import Snek from './Snek.js'
import Transfer from './Transfer.js'

class App extends Component {
  //Initial view is Playground  
  constructor(props) {
    super(props)
    this.state = {
      renderedComponent: "Playground"
    }
  }
  
  //Upadate state according to button press
  setRenderedComponent(componentName){
    this.setState({renderedComponent: componentName})
  }
  
  //Render appropriate component accordingly 
  renderComponent(componentName){
    switch(componentName){
        case "ToDo": return <ToDo/>
        case "Snek": return <Snek/>
        case "Transfer": return <Transfer/>
        case "Playground": return <Playground/>
      default: return <Playground/>
    }
    
  }
  render() {
    
    return <div className="App">
      <div className="App_header">
        <h2>Welcome to Hackers at Cambridge JavaScript Playground</h2>
      </div>
      <div className="App_content">
        <div className="App_container">
          {this.renderComponent(this.state.renderedComponent)}
        </div>
        <div className="App_buttons">
          <button className="app_button"
            onClick={()=>this.setRenderedComponent("ToDo")}>ToDo List</button>
          <button className="app_button"
            onClick={()=>this.setRenderedComponent("Snek")}>Snek Game</button>
          <button className="app_button"
            onClick={()=>this.setRenderedComponent("Transfer")}>Transfer Skills</button>
          <button className="app_button"
            onClick={()=>this.setRenderedComponent("Playground")}>Back to Playground</button>
        </div>        
      </div>
    </div>
  }
}

export default App;