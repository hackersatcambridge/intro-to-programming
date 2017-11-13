import React, { Component } from 'react'

class Snek extends Component {  
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }

  /* How the state will be started initially */
  getInitialState(){
    const initialState = {
      playMatrix: [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
      ],
      snake: [],
      currentDirection: 'up',
      isGameActive: false,
    }
    return initialState;
  }

  //====================================================================
  // ALL FUNCTIONS YOU SHOULD BE FIDDLING WITH ARE HERE
  
  startGame()
  {
    alert("Started playing!");
    
    // ------------------------------------------

    // [Your code goes here]

    // ------------------------------------------
  }
  
  isPlaying(playing){
    this.setState({isGameActive: playing})
  }

  // Initialises snake to a chosen position on the game matrix
  initializeSnake()
  {
    // ------------------------------------------

    // [Your code goes here]

    // ------------------------------------------
  }

  // Restarts the snake to a random position with only 1 cell as its body
  // It does so with the help of the already implemented `initSnake()` function
  restartGame(){    
    alert('`restartGame` is not implemented yet!');
    // ------------------------------------------

    // [Your code goes here]

    // ------------------------------------------
  }

  moveSnake(timer)
  {
    // ------------------------------------------
    // Ready-made functionality to get you started and provide an example

    // Get the locally saved array of snake positions
    var localSnake = this.getLocalSnake();
    // The head of the snake is the last element in our position array
    var headSnake = localSnake[localSnake.length-1];
    
    // Get the row and column indexes at which the snake head lies
    var rowHeadSnake = headSnake.row;
    var colHeadSnake = headSnake.col;

    // Get our snake's current direction
    var currentDirection = this.getCurrentDirection();

    if (currentDirection == 'up')
    {
      rowHeadSnake--;
      // Loop around
      if(rowHeadSnake < 0){
        rowHeadSnake += 8;
      }
    }
    // ------------------------------------------

    // [Your code goes here]

    // ------------------------------------------

    // Construct our snake's new head position
    var headPosition = {
      row: rowHeadSnake,
      col: colHeadSnake
    }

    // Place it at the end of our snake positions array
    localSnake.push(headPosition);
    // Eliminate the tail of the snake (otherwise it would eventually fill up all positions)
    // .shift() eliminates the first element of an array 
    localSnake.shift();

    this.setSnake(localSnake);
  }

  addFood()
  {
    alert('`addFood` is not implemented yet!');
    // ------------------------------------------

    // [Your code goes here]

    // ------------------------------------------
  }
  
  actOnKeyPresses(thisSnek){
    // Makes a `listener` that is connected to any kind of kew press action 
    // i.e if listens for a KEYDOWN. What happens at this keydown is an action(=EVENT)
    // that you perform. Our listener gives you the corresponding event to inspect 
    // and decide what you want to do based on any of its features 
    document.addEventListener('keydown', function(event) {
      if(event.keyCode == 37) {
        //alert('Left was pressed');
        thisSnek.updateSnakeDirection('left');
      }
      // ------------------------------------------

      // [Your code goes here]

      // ------------------------------------------
    });  
  }

  //====================================================================
  // ALL HELPER FUNCTIONS ARE DOWN HERE

  // Takes as input an array of positions occupied by the snake 
  // Updates the locally stored snake to the new positions
  // The order is: last value is the head of the snakes
  setSnake(newSnake)
  {
    var localPlayMatrix = this.state.playMatrix;

    for (var row = 0; row < 8; row++)
      for (var col = 0; col < 8; col++)
        if (localPlayMatrix[row][col] == 1)
          localPlayMatrix[row][col] = 0;
    
    for (var i = 0; i < newSnake.length; i++){
      localPlayMatrix[ newSnake[i].row ] [ newSnake[i].col ] = 1;
    }
    
    this.updateSnakeBody(newSnake);
  } 
  
  addFoodToMatrix(foodPosition){
    this.state.playMatrix[foodPosition.row][foodPosition.col] = 2;
  }

  // Creates a timer which is going to periodically call moveSnake,
  // according to a timeInterval input
  createSnakeTimer(snakeObject,timeInterval){
    var timer = new this.Timer(function(){snakeObject.moveSnake(timer)}, timeInterval);
    return timer;
  }

  // Resets the state to what it was initially 
  resetInitialState(){    
    this.setState(this.getInitialState());
  }
  
  clearPlayMatrix()
  {
    var localPlayMatrix = this.state.playMatrix;
    for (var row = 0; row < 8; row++)
    {
      for (var col = 0; col < 8; col++)
      {
        localPlayMatrix[row][col] = 0;
      }
    }
  }

  // Returns the current direction of the snake 
  getCurrentDirection(){
    return this.state.currentDirection;
  }

  // Returns the stored snake, an array of `position` objects
  // position = {row:..,col:...}
  getLocalSnake(){
    return this.state.snake;
  }

  // Returns the stored play matrix value at (row,col) position
  getLocalPlayMatrixValue(row, col){
    return this.state.playMatrix[row][col];
  }
  
  // Updates the snake array with the values in newSnake array
  updateSnakeBody(newSnake){    
    this.setState({snake: newSnake});
  }

  // Updates the current direction of the snake 
  updateSnakeDirection(newDirection){
    this.setState({currentDirection: newDirection});
  }
  
  // Draws out the play matrix on the screen with the help of some web-magic 
  // It uses web styling for that 
  // (.css stuff in ./workshop-2/src/styles/Snek.css if you're curious)
  drawSnakeGame(){
    function getCellClass(cell){
      switch(cell){
        case 0: return 'cell_0';
        case 1: return 'cell_1';
        case 2: return 'cell_2';
        default: return 'cell_0';
      }
    }

    return <div className="Snek_Matrix">
      {this.state.playMatrix.map(row => <div className="Snek_Matrix_Row" >
        {row.map(cell => <div className={"Snek_Matrix_Cell " + getCellClass(cell)}/>)}
        </div>)} 
        <br/>
        <button className="Button" onClick={()=>this.restartGame()}>Restart</button>
    </div>
  }

  renderSnakeGame(){
    if(this.state.isGameActive)
      return this.drawSnakeGame()
    else 
      return <button className="Button" onClick={()=>this.startGame()}>Start</button>
  }
  
  renderDescription() {
    return "A simple Snek Game";
  }

  render() {
    return (
      <div className="Snek">
        <div className="Snek_Title">{this.renderDescription()}</div>
        {this.renderSnakeGame()}        
      </div>
      
    );
  }

  // A Timer Object to make life easier
  Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    // stop the timer
    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
  }

}

export default Snek;
