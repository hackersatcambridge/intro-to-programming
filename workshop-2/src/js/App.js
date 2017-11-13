import React, { Component } from 'react'
import '../styles/App.css'
import Snek from './Snek.js'

class App extends Component {
  render() {    
    return <div className="App">
      <div className="App_header">
        <h1>Hackers at Cambridge JavaScript Playground</h1>
      </div>
      <div className="App_content">
        <div className="App_container">
          <Snek/>
        </div>     
      </div>
    </div>
  }
}

export default App;
