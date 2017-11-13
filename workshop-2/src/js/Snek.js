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
  
  getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  startGame()
  {
    alert("Started playing!");
    this.isPlaying(true);

    this.initializeSnake();
    this.addFood();

    
    // This is very important, we are now saying: OK, `this` is the only
    // relevant Object you care about, and we assign its contents to the 
    // variable thisSnek. We will work with thisSnek whenever we want to perform
    // actions directly on the snek Object 
    var thisSnek = this;    
    var timer = new this.Timer(function(){thisSnek.moveSnake(timer)}, 500);
   
    this.actOnKeyPresses(thisSnek);
    
  }
  
  isPlaying(playing){
    this.setState({isGameActive: playing})
  }

  // Initialises snake to a chosen position on the game matrix
  initializeSnake()
  {
    var startRow = this.getRandomInt(0,8);
    var startColumn = this.getRandomInt(0,8);

    var initialPosition = {
      row: startRow,
      column: startColumn
    }

    this.setSnake([initialPosition]);
  }

  // Takes as input an array of positions occupied by the snake 
  // Updates the locally stored snake to the new positions
  // The order is: last value is the head of the snakes
  setSnake(newSnake)
  {
    var localPlayMatrix = this.getLocalPlayMatrix();

    for (var line = 0; line < 8; line++)
      for (var column = 0; column < 8; column++)
        if (localPlayMatrix[line][column] == 1)
          localPlayMatrix[line][column] = 0;
    
    for (var i = 0; i < newSnake.length; i++){
      localPlayMatrix[ newSnake[i].row ] [ newSnake[i].column ] = 1;
    }
    
    this.updateSnakeBody(newSnake);
  }  

  moveSnake(timer)
  {
    var localSnake = this.getLocalSnake();
    var headSnake = localSnake[localSnake.length-1];
    
    var rowHeadSnake = headSnake.row;
    var columnHeadSnake = headSnake.column;

    var currentDirection = this.getCurrentDirection();

    if (currentDirection == 'up')
    {
      rowHeadSnake --;
      if (rowHeadSnake < 0)
        rowHeadSnake += 8;
    }

    if (currentDirection == 'down')
    {
      rowHeadSnake ++;
      if (rowHeadSnake > 7)
        rowHeadSnake -= 8;
    }

    if (currentDirection == 'left')
    {
      columnHeadSnake--;
      if (columnHeadSnake < 0)
        columnHeadSnake += 8;
    }

    if (currentDirection == 'right')
    {
      columnHeadSnake++;
      if (columnHeadSnake > 7)
        columnHeadSnake -= 8;
    }

    for (var i = 0;i < localSnake.length; i++)
      if ((rowHeadSnake == localSnake[i].row) && (columnHeadSnake == localSnake[i].column))
      {
        timer.stop();
        this.resetInitialState();
        alert("Game over!");
        return;
      }

    var headPosition = {
      row: rowHeadSnake,
      column: columnHeadSnake
    }
    localSnake.push(headPosition);
    if (this.state.playMatrix[rowHeadSnake][columnHeadSnake]==2)
      this.addFood()
    else
      localSnake.shift();

    this.setSnake(localSnake);
  }

  // Resets the state to what it was initially 
  resetInitialState(){    
    this.setState(this.getInitialState());
  }

  addFood()
  {
    var foodSpaces = 64-this.state.snake.length; //number of 0s in playMatrix
    var foodTargetPosition = this.getRandomInt(0,foodSpaces);
    var foodNowPosition = -1;

    var localMatrix = this.getLocalPlayMatrix();

    for (var line=0;line<8;line++)
      for (var column=0;column<8;column++)
        if (localMatrix[line][column]==0)
        {
          foodNowPosition++;
          if (foodTargetPosition == foodNowPosition)
            localMatrix[line][column]=2;
        }
  }
  
  actOnKeyPresses(thisSnek){
    document.addEventListener('keydown', function(event) {
      if(event.keyCode == 37) {
        //alert('Left was pressed');
        thisSnek.updateSnakeDirection('left');
      }
      if(event.keyCode == 38) {
        //alert('Up was pressed');
        thisSnek.updateSnakeDirection('up');
      }
      if(event.keyCode == 39) {
        //alert('Right was pressed');
        thisSnek.updateSnakeDirection('right');
      }
      if(event.keyCode == 40) {
        //alert('Down was pressed');
        thisSnek.updateSnakeDirection('down');
      }
    });  
  }

  // Returns the current direction of the snake 
  getCurrentDirection(){
    return this.state.currentDirection;
  }

  // Returns the stored snake
  getLocalSnake(){
    return this.state.snake;
  }

  // Returns the stored play matrix
  getLocalPlayMatrix(){
    return this.state.playMatrix;
  }
  
  // Updates the snake array with the values in newSnake array
  updateSnakeBody(newSnake){    
    this.setState({snake: newSnake});
  }

  // Updates the current direction of the snake 
  updateSnakeDirection(newDirection){
    this.setState({currentDirection: newDirection});
  }

  // Restarts the snake to a random position with only 1 cell as its body
  // It does so with the help of the already implemented `initSnake()` function
  restartGame(){
    this.initializeSnake();
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
