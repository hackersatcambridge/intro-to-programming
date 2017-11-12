Snake Game
===
## What you will be doing 

## Learning aims 
* Make you confortable with following simple installation instructions 
* Apply basic programming concepts: variables, `if` statements, `for` loops
* Understand and interact with helper functions, ready-made code
* Introduce **events** & **keycodes** 
* Working with **matrices** 
* Your first view of the world of games :) 

## An overview of what is **already in the code**

* We have some notion of how we are going to start off this game. In this simple implementation, we'll be modelling the snake game by a 8x8 matrix. **What is a matrix?** Simply put, just an array of arrays, all of the same size. That means, an array `playMatrix` containing 8 arrays, each with 8 elements of their own. This gives us 64 little cells where our snake can run freely (_obviously without biting its tail_)  

```js
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
```
* Our snake starts off in the 'up' direction, we could have chosen any other one. (_The ones I've defined here are `'up'`, `'down'`, `'left`, `'right'` but you can very well name yours whatever, as long as you're consistent - i.e whenever you use them you make sure you know what each name stands for)_
* We also have a notion of whetver or not we're actually playing the game, which makes sense in the context of displaying the `Start` button or not. This behaviour is exhibited in the code below: 
```js
renderSnakeGame(){
    if(this.state.isGameActive)
      return this.drawSnakeGame()
    else 
      return <button className="Button" onClick={()=>this.start()}>Start</button>
  }
```

And our `drawSnakeGame` looks pretty much like this: 
```js
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
    </div>
  }
```

## Task 

Write the JavaScript code to: 

1. Make our snake show up on the playing matrix - 5  min
2. Make our snake show up on random places on the playing matrix every time we restart the game - 5 min
3. Make snakey move - 10 min
4. Make food - 10 min
5. Make snake grow when he eats food - 10 min
6. Make food reappear - 5 min
7. Implement game over - 10 min