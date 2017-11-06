import React, { Component } from 'react'

class ToDo extends Component {
  /*This is required in order to locally save the To-Dos we will be working with
    It's going to happen automatically, it's sort of an initialization (if you will)
    Don't worry too much about it, google `constructors` if you'd like to know more */
  constructor(props) {
    super(props)
    this.state = {
      toDosLocal: []
    }
  }
  // =========================================================================

  // You will be implementing and tweaking with these functions

  showToDos(){
    alert("Not implemented yet!");
    //TODO: use your toDoList, imported from `./data.js
    // in conjuction with `showToDo(content)` 

    // Your code goes here

  }

  removeToDo(id){
    alert("Not implemented yet!");
    //TODO: remove the To-Do item with a matching id to the input one
    // You're working with the local To-Dos, these are held carefully
    // we're getting them with `getLocalTodos` helper function
    var toDos = this.getLocalTodos();

    // Your code goes here
    
    // After we're done performing the removing on toDos, 
    // we can go ahead and update the local To-Dos  
    this.updateLocalTodos(toDos);
  }

  completedToDo(id){
    alert("Not implemented yet!");
    //TODO: mark ToDo item with a matching id to the input one as completed 
    //Hint: At this point your local ToDos should already be objects
    var toDos = this.getLocalTodos();
    
    // Your code goes here
    
    this.updateLocalTodos(toDos);
  }

  addTodoItem(value){    
    alert("Not implemented yet!");
    //TODO: add a To-Do Item to our locally saved To-Dos
    //We already know `showToDo` takes whatever `content` you give it and showes it into local To-Dos
    //Why not make use of it?
  }

  renderDescription () {
    return "To-Do List Maker";
  }   
  // =========================================================================
  
  // Helper functions
  showToDo(content){  
    var toDosNew = this.state.toDosLocal;
    toDosNew.push(content);   
    this.setState({toDosLocal: toDosNew});
  }

  // Adds a To-Do Item to the web-content to abstract away these complications 
  showTodoItem(toDo){
    return <div className="todo-item" onClick={()=>this.completedToDo(toDo.id)}>
      <div>{toDo.value}</div>
      <button onClick={()=>this.removeToDo(toDo.id)}/>
    </div>
  }
  // Takes as an input an array of To-Dos and overwrites the locally saved ones
  updateToDos(toDoList){
    this.setState({toDosLocal: toDoList});
  }
  // Returns an array containing locally saved To-Dos 
  getLocalTodos(){
    return this.state.toDosLocal;
  }
  // =========================================================================

  // Add any additional helper functions here 
 
  // =========================================================================

  // This is where the magical appearing on the screen happens. 
  // Don't be taken aback by all the notations, it's nothing to write home about!

  render() {    
    return <div className="ToDo"> 
      <div className="title">{this.renderDescription()}</div>
      <div id="todo-container">
        <button className="Button" onClick={()=>this.showToDos()}>Show Saved ToDos</button>
        {this.state.toDosLocal.map((toDo,i) => toDo.value !== undefined? 
          this.showTodoItem(toDo) : 
          <div key={i}>{toDo}</div>)}
      </div>       
    </div> 
  }
}

export default ToDo;
