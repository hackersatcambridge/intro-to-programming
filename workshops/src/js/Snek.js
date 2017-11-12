import React, { Component } from 'react'

var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class Snek extends Component {  
  /* Create your functions here */
  constructor(props) {
    super(props)
    this.state = {
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
      nowDir: 'up',
      score: 0
    }
  }

  setSnake(newSnake)
  {
    var localPlayMatrix = this.state.playMatrix;

    for (var line = 0; line<8; line++)
      for (var column = 0; column<8; column++)
        if (localPlayMatrix[line][column] == 1)
          localPlayMatrix[line][column] = 0;
    
    for (var i=0;i<newSnake.length;i++)
      localPlayMatrix[ newSnake[i][0] ] [ newSnake[i][1] ] = 1;

    
    this.setState({snake: newSnake, playMatrix: localPlayMatrix, nowDir:this.state.nowDir});
  }

  setNowDir(newNowDir)
  {
    //this.state.nowDir=newNowDir; //<- cannot use this as it complains about mutating state directly
    this.setState({snake:this.state.snake, playMatrix: this.state.playMatrix, nowDir:newNowDir});
  }

  showPlayMatrix()
  {
    var stringMatrix ='';
    for (var l=0;l<8;l++)
      stringMatrix+=(this.state.playMatrix[l]+'\n');

    console.log(stringMatrix);
  }

  initSnake()
  {
    var startLine = getRandomInt(0,8);
    var startColumn = getRandomInt(0,8);

    this.setSnake([[startLine,startColumn]]);
    
    this.showPlayMatrix();
  }

  moveSnake(tickID)
  {
    var localSnake = this.state.snake;
    var headSnake = localSnake[localSnake.length-1];
    
    var lineHeadSnake = headSnake[0];
    var columnHeadSnake = headSnake[1];

    if (this.state.nowDir=='up')
    {
      lineHeadSnake --;
      if (lineHeadSnake<0)
        lineHeadSnake+=8;
    }

    if (this.state.nowDir=='down')
    {
      lineHeadSnake ++;
      if (lineHeadSnake>7)
        lineHeadSnake-=8;
    }

    if (this.state.nowDir == 'left')
    {
      columnHeadSnake--;
      if (columnHeadSnake<0)
        columnHeadSnake+=8;
    }

    if (this.state.nowDir == 'right')
    {
      columnHeadSnake++;
      if (columnHeadSnake>7)
        columnHeadSnake-=8;
    }

    for (var i=0;i<localSnake.length;i++)
      if ((lineHeadSnake==localSnake[i][0])&&(columnHeadSnake==localSnake[i][1]))
      {
        clearInterval(tickID);
        this.setSnake([]);
        this.setNowDir('up');
        for (var line=0;line<8;line++)
          for (var column=0;column<8;column++)
            this.state.playMatrix[line][column] = 0;

        alert("Game over!");
        return;
      }

    localSnake.push([lineHeadSnake,columnHeadSnake]);
    if (this.state.playMatrix[lineHeadSnake][columnHeadSnake]==2)
      this.addFood()
    else
      localSnake.shift();

    this.setSnake(localSnake);
  }

  addFood()
  {
    var foodSpaces = 64-this.state.snake.length; //number of 0s in playMatrix
    var foodTargetPosition = getRandomInt(0,foodSpaces);
    var foodNowPosition=-1;

    var localMatrix = this.state.playMatrix;

    for (var line=0;line<8;line++)
      for (var column=0;column<8;column++)
        if (localMatrix[line][column]==0)
        {
          foodNowPosition++;
          if (foodTargetPosition==foodNowPosition)
            localMatrix[line][column]=2;
        }
  }

  tick(thisSnek,selfID)
  {
    thisSnek.moveSnake(selfID);
    thisSnek.showPlayMatrix();
  }

  start()
  {
    if (this.state.snake.length>0)
      return;
    alert("Started!");
    this.initSnake();
    this.addFood();


    var thisSnek=this; //Otherwise, when we use this on tick or further below, it will not refer to thisSnek

    var setIntervalID = setInterval(function(){thisSnek.tick(thisSnek,setIntervalID)},1000);

    document.addEventListener('keydown', function(event) {
      if(event.keyCode == 37) {
        //alert('Left was pressed');
        thisSnek.setNowDir('left');
      }
      if(event.keyCode == 38) {
        //alert('Up was pressed');
        thisSnek.setNowDir('up');
      }
      if(event.keyCode == 39) {
        //alert('Right was pressed');
        thisSnek.setNowDir('right');
      }
      if(event.keyCode == 40) {
        //alert('Down was pressed');
        thisSnek.setNowDir('down');
      }
    });
  }

  /* End of creating functions */

  renderDescription() {
    return "A simple Snek Game";
  }

  render() {
    /*Call them in the return */
    return (
      <div className="Snek">
        <div className="title">{this.renderDescription()}</div>

        <button className="Button" onClick={()=>this.start()}>Start</button>
      </div>
      
    );
  }
}

export default Snek;
