import React, { Component } from 'react'

class Todo extends Component {
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

  // Loads the contents of an external, predefined todo list 
  // Adds these existing todos to a local list of todos
  loadTodos(){
    //TODO: use your todoList, imported from `./data.js
    // in conjuction with `addTodo(name)` 

    // Your code goes here
  }

  // Takes a name (as a string) and adds it the local list of todos
  addTodo(name){    
    //TODO: create a new todo object and add it to the local list of todos

    // `storeTodo` takes ANYTHING (some content) and adds it to the local list. 
    // for the beginning, it's taking name as an input, you may want to change that. 

    this.storeTodo(name);
  }

  // Takes an id of a todo and removes it from the local list of todos
  removeTodo(id){
    //TODO: remove the To-Do item with a matching id to the input one
    // You're working with the local To-Dos, these are held carefully
    // we're getting them with `getLocalTodos` helper function
    var toDos = this.getLocalTodos();
    
    // After we're done performing the removing on toDos, 
    // we can go ahead and update the local To-Dos  
    this.updateLocalTodos(toDos);
  }
 
  // Takes an id of a todo and markes it as completed in the local list of todos
  // This will be triggered when you click on a Todo item :) 
  markTodoCompleted(id){
    //TODO: mark ToDo item with a matching id to the input one as completed 
    // Hint: At this point your local ToDos should already be objects
    var toDos = this.getLocalTodos();
    
    // Your code goes here
    
    this.updateLocalTodos(toDos);
  }

  renderDescription () {
    return "To-Do List Maker";
  }   
  // =========================================================================
  
  // Helper functions
  storeTodo(content){  
    var toDosNew = this.state.toDosLocal;
    toDosNew.push(content);   
    this.setState({toDosLocal: toDosNew});
  }

  // Adds a To-Do Item to the web-content to abstract away these complications 
  showTodo(toDo){
    return <div className="Todo_item" onClick={()=>this.markTodoCompleted(toDo.id)}>
      <div className={toDo.completed == true? "Todo_completed" :"Todo_active"}>{toDo.name}</div>
      <button className="Todo_remove" onClick={()=>this.removeTodo(toDo.id)}>X</button>
    </div>
  }
  // Takes as an input an array of To-Dos and overwrites the locally saved ones
  updateLocalTodos(todoList){
    this.setState({toDosLocal: todoList});
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
    return <div className="Todo"> 
      <div className="Todo_title">{this.renderDescription()}</div>
      <div className="Todo_container">
        <button className="Button" onClick={()=>this.loadTodos()}>Show Saved ToDos</button>
        {this.state.toDosLocal.map((toDo,i) => toDo.name !== undefined? 
          this.showTodo(toDo) : 
          <div key={i}>{toDo}</div>)}
      </div>       
    </div> 
  }
}

export default Todo;