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
_If you're confortable with figuring out what the helper code does on your own, you can skip this bit._

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

* Pay close attention to the snake array. What should it be when it starts having values? Ideally, we'd like it to contain all the **positions** [`row`][`col`] in our `playMatrix` that the snake is spanned upon. This means my initial snake may look something like: `[[0,0]]`, and as it moves 1 to the right, it should be something like `[[0,1]]`, assuming it didn't eat anything on its way. We'll see more of this soon.

* We also have a notion of whetver or not we're actually playing the game, which makes sense in the context of displaying the `Start` button or not. This behaviour is exhibited in the code below: 
```js
renderSnakeGame(){
    if(this.state.isGameActive)
      return this.drawSnakeGame()
    else 
      return <button className="Button" onClick={()=>this.startGame()}>Start</button>
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

* The classic helper functions, to get and update the stored values that you saw in `getInitialState()`: 
```js
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
```

## Tasks 

Write the JavaScript code to: 

### 1. Make sure our game starts when we press the `Start` button 
   
* Pressing the Start Button fires up the `this.startGame()` function: 
```js
<button className="Button" onClick={()=>this.startGame()}>Start</button>
```
**Explanation:** Right now all it does is alert you that the game has started, but nothing is really happening. That is because we need to tell our program as well that the game has started. How do we go about that? 

-> We have a stored `isGameActive` variable which you may notice is set to `false` initially. We want to make sure this is set to true when the game is active. The code contains a helper function that you might want to use: `isPlaying(playing)` takes a `boolean` value as input and assigns it to `isGameActive`. Remember we call these functions with `this.isPlaying(...)`

**Checkpoint:** This is good. We can now see an 8x8 matrix. It's grey, beautiful. You can leave it like this and be happy or more on and see the snake shaping up. 

### 2. Make our snake show up on the playing matrix 
* Considering we have a `playingMatrix` represented as before, we want to tell our program that the snake should appear at first as a single cell, somewhere on the matrix: 
```js
 playMatrix: [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    ]
```
[**Let's take a small detour**]

I have tried to make this as enjoable as possible, you can skip the following and still safely complete the workshop, but I feel this provides a better understanding of what you are working with (_We need to understand how to play around with arrays of arrays a bit_):

* What does this translate to? Simply put, our `playMatrix` is an array or arrays. If you remember our introductory sessions, we saw ways to get at some of the values stored in arrays of arrays. An example would be:
```js
var arr = [[4,9],['cat','dog'],'Hacker'];
// Remember in arrays indexes start from 0
// I want to retrieve Hacker
console.log(arr[2]);

// Now I want the number 9 stored in arr
// I will therefore go into the first element (index 0) -> arr[0]
// And then get its second element (index 1) -> arr[0][1]
console.log(arr[0][1]);

// The same thing could have been done with the following code: 
var first = arr[0];
console.log(first[1]);

// We just did it in one run because it looks cooler and it's more efficient
 ```

* Let's walk through _(i.e look at all the values of)_ a whole matrix. How would you do that? Remember we used a `for` loop to walk through a normal array. We're going to just develop on that. Below is an example: 
```js
var arr = [0,0,0,0];
for(var i = 0; i < arr.length; i++){
    console.log(arr[i]);
}

// We can use the same principle when walking through arrays of arrays. 

var matrix = [['00','01'],['10','11']];
// If it's easier, you can view it as: 
/* Looks a bit more like a matrix
[[ '00' , '01'],
 [ '10' , '11']]
*/
for(var row = 0; row < matrix.length; row++){
    for(var col = 0; col < matrix.length; col++){
        console.log(matrix[row][col]);
    }
} 

// Do this in the console or anywhere you want to
// Make sure you have an intuition of what order they should be printed in :)
``` 
[**Detour over**]

* We will **differentiate the snake from the rest of the matrix** by giving it a distinctive value. You can choose 1 for now. `playMatrix` will then look something like: 
```js
playMatrix: [
    [1,0,0,0,0,0,0,0], // This means our little snek starts off at position (0,0)
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    ]
```

**DISCLAIMER:** I'm going to be assuming throughout this workshop that, looking at `playMatrix` -> `0` means nothing there, `1` means there is snek there, `2` means there is food there.

* **Method:** Implement `initializeSnake()`. This is going to be called immediately after you've done the previous step, in the same `startGame()` function. You want to call `this.setSnake(...)` which is a helper function that takes **an array of positions** which our snake spans and updates the game matrix for us. A `position` object has a `row` and a `col` property. 
```js
var position = {
    row: ...,
    col: ...
}
``` 

* For this particular step, we are only going to be sending accross an array with one position, which is the `initialPosition`. 
* At this point, you may want to also implement `restartGame()`. Esentially, when we restart the game we want to make our snake tiny again and place it at a starting position. It therefore suffices to call `initializeSnake()` from within `restartGame`. 

**Checkpoint:** You should now be able to see one cell colored blue and the rest of them still grey. The blue cell is your snake. Isn't it pretty?

### 3. Make our snake show up on random places on the playing matrix every time we restart the game - 5 min

* With what we have so far, whenever we press restartGame our snake stays at the same position, which is a set one you've probably **hard-coded** _(i.e manually introduced a value for, with no variable)_. Ideally, we would like our snake to turn up at **random** places on our game matrix. 

* Implement a function called `getRandomNumber(lowerBound, upperBound)` which takes in a lower bound and an upper bound and returns a random value contained between those. 

* You may find the following useful: [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) JavaScript built-in functionality _(`.random()` is also built-in in most, if not all new-ish languages)_
**Warning:** make sure the number is an integer. Also keep in mind that we're working with an 8x8 matrix _(array of 8 arrays each containing 8 values)_ indexing, which means `0` up to `7` are valid entries for indexing into the matrix. If you're really stuck, have a look at the [Hint 1](#1)

* Now that you have this function, go ahead and **call it** to get random values every time for your initial row and column position. 

**Checkpoint:** Now, whenever you press restart, our snake should be in a different spot on the matrix. A bit more realistic. 

### 4. Make snakey move - 10 min

* Here comes the fun bit. We want our snake to actually move around, eat food, etc. To move, it means it will **change position**. So we need to update the positions the snake spans, at each time step of the game. 

**Some code to copy and paste** into `startGame()`, after the previous step.  
```js
 // This is very important, we are now saying: OK, `this` is the only
// relevant Object you care about, and we assign its contents to the 
// variable thisSnek. We will work with thisSnek whenever we want to perform
 // actions directly on the snek Object 
var thisSnek = this;    
var timer = this.createSnakeTimer(thisSnek,500);
```
**Explanation:** These steps are modelled by a timer: `createSnakeTimer(snakeObject,timeInterval)` which takes a snake object `var thisSnek = this` and a time interval _(measured in ms, so a `var timeInterval = 1000` would mean 1 second)_ and returns a timer object. The timer object is defined at the very bottom of `Snek.js` and has 3 main methods: `stop`, `start` and `reset`. I will define each when/if we need to make use of them.  

**Checkpoint:** If you've added this timer, we should see our snake move upwards. _To infinity and beyond_ 

* Our time steps are actually **defined with respect to a function**. This function is `moveSnake`, which takes the timer as its input and makes incremental changes to the snake game at every time step. 

* `moveSnake(timer)` is currently only allowing the snake to move in an upwards direction. Take a moment to read through what is there already and understand what's going on. The basic idea is the following: We want to see where the head of the snake is and, knowing which direction it is currently going in, we'll be able to update the coordinates _(i.e new `(row,col)` position)_ of our snake's body. 

* Also notice that I've already written out the conditional for the `'up'` direction. If we're going up, that means on a matrix, the row index would be decreasing and the column index would be staying the same. If we've hit a margin, we would like to still stay within the matrix, so our only choice is to loop around, like I've done, or `timer.stop()`, which would bring our snake at a stand-still.  

    _**Caveat:** Our code only requires an `if` at these points, and not a while, because the `while`, so to speak, is already the timer itself. In other words, `moveSnake` is called indefinitely, until the timer is stopped or reset._

* That's nice, but how about moving `'left'`, `'right'`, `'down'`? Please implement these now :) 

**Checkpoint:** Your snake should still be moving only in an upwards direction, indefinitely, but now you are making sure you take every movement into consideration, which is what we want. 

Let's move on and make the snake switch directions
### 5. Make snake move according to keyboard presses

* When we play a game on our computer we'll most often be using our keyboard, mouse or a combination of the two. _Alternatively, use a console or any other funky device._ Anything of the sort has some `keyCodes`. What that means is that every key on your keyboard has a certain code attributed to it. Please play around a bit: JavaScript [keyCodes](http://keycode.info/)
### 6. Make food - 10 min
### 7. Make snake grow when he eats food - 10 min
### 8. Make food reappear - 5 min
### 9. Implement game over - 10 min


### **Hints**:
#### 1 
```js
getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

...

    row: this.getRandomInt(0,8)
```