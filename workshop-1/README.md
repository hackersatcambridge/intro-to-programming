To-do List Maker
===

## What you will be doing 

## Learning aims 
* Make you confortable with following simple installation instructions 
* Apply basic programming concepts: variables, `if` statements, `for` loops
* Understand and interact with helper functions, ready-made code
* Project dependencies -- `import` keyword and usage
* Introduce new concepts without exposing you directly to any web programming
* Hopefully help you see that everything links together beautifully

     
## Task 
Go to `./workshop-1/src/js/Todo.js` and have a look at the code. Try to figure out what it does so far and how it does it. 

**Disclaimer**:
A big part of any programming project you will ever come accross is understanding other people's code and either modifying or building on top of it. This should always play to your advantage and save you from unneccessary labour. It is rarely the case that you will need to write an entire application from scratch.  

**Let's get started!**

Write the JavaScript code to: 

1. Show a set of predefined to-do tasks on screen (we will start by using a simple array implementation for the existing To-Dos)
    * Go to `./data.js` and have a look at the provided array of tasks (_notice the suggestive name_)
        * You can add aditional elements if you so desire
    * `import` our `todoList` array from the file `./data.js` into `./Todo.js` to be able to access its contents

    Example of import: 
    ```js
    import {potato, carrot} from '/vegetables/my-veggies.js';
    
    //It is usually good practice to place your imports at the "top" (beginning) of the file
    //In our case the import should go at the very beginning of './ToDo.js'
    
    console.log(potato.size);
    ```
    * You will be implementing the function `loadTodos()`
    ```js
    loadTodos(){
         // Your code goes here
    }    
    ```
    * **Method:** Iterate through `todoList` (_think looping through it_) and print its contents on the screen (for this, you can use the given implementation of `addTodo(value)` - _you will modify this later on_). 
    
    _Aside:
    Go ahead and have a look at `addTodo`. It calls a helper function I created, `storeTodo(content)` which tries to abstracts away web-funkyness. This is how it looks, **it's already in your project code**:_
    ```js
    storeTodo(content){  
        var toDosNew = this.state.toDosLocal;
        toDosNew.push(content);   
        this.setState({toDosLocal: toDosNew});
    }
    
    // ATENTION: You call storeTodo with the `this` keyword, as such: 
    this.storeTodo("Texty text");
    ```

**Checkpoint:** OK, now we have a way of showing on screen some 'programmer defined' set of tasks. Next, we'd actually like to interact a bit with the user. 

2. Get some input (text), store it and show it.
    * We have a helper function for this! Now let's test your copy paste skills:
        * The designated area to paste new code in: 
        ```js
            // =========================================================================

            // Add any additional helper functions here 
 
            // =========================================================================
        ``` 
        * The code you need to copy and paste:  
        ```js
        addInputField(){
            var input;
            var toDoInput = 
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.addTodo(input.value);
                    input.value = '';}}>
                    <input ref={node => {
                        input = node;}} />
                </form>
    
            return toDoInput;
        }
        ```
        
    * To use this function, naturally, we need to call it. You need to call it inside the `return` bit of the `render`. 
        * We'll be calling it with the following syntax: 
        ```js
        {this.addInputField()}
        ```
        * Place it where you want (within the limits, obviously):
        ```js
        render() {    
            return <div className="Todo"> 
            <div className="title">{this.renderDescription()}</div>
            === ADD INPUT CAN GO HERE ===
            <div id="Todo_container">
                === OR HERE ===
                <button className="Button" onClick={()=>this.loadTodos()}>Show Saved ToDos</button>
                === OR HERE ===
                {this.state.toDosLocal.map((toDo,i) => toDo.name !== undefined? 
                this.showTodo(toDo) : 
                <div key={i}>{toDo}</div>)}                
                === OR HERE ===
            </div>      
            === OR EVEN HERE === 
            </div> 
        }
        ```
    * **Explanation**: This now works because `addInputField` is relying on another function of ours, `addTodo` which you may havehave already used yourself: 
            
        ```js
        this.addTodo(input.value); 
        ```
    * `input.value` in our case is just something that JavaScript web-stuff is concerned about, `input` is an object and `value` is one of its keys that gets updated when you type something in, therefore you can retrieve it when you need it via the "`.`" notation, as with any object :)

**Checkpoint:** Voilà, now we should be able to add a new To-Do element, upon hitting `Enter` it should show up with the rest of our To-Dos. 

3. We want to make it a bit more realistic. **Modelling the world with Objects**
    * We will have to modify our code so that the locally saved To-Do List is no longer an array of strings, but in stead an array of objects with the following keys: `name`, `id`, `completed` (_keep in mind completed will be a `Boolean`_)

    * **Method:** (_You can approach this in more than one way, I am only outlining one_)
        * Modify your implementation of `addTodo(name)` to create an object "wrap" for the new todo item. (_Why do you think we need to do this? See Hint [1](#1)_) Give these wrapped objects (with the correct format, obviously) as inputs to `storeTodo(content)` -- Keep in mind `content` can be anything, it gets added to the local To-Dos anyway.

        * What should be the default value for our `completed` field? (_When you initially add a To-Do Item, you're probably not adding it because you already completed it_) 

        *  **Don't forget your objects need an `id`!** It is very useful to have `id`s, as they are usually meant to be unique (_you could have 2 todo items with the same value, but we'd really like `id` to be unique_). 

        * Think hard about what you'd like this `id` to be :) It is not trivial at all. What are all the cases? You can have nothing in your list, so id should be 0 or 1 or you can already have several items. How do you assign the next id?Finally, how do you make sure that id's are unique? 

        * For making the `id` unique, you may find it useful to know that there is a helper function that we have: `getLocalTodos()` which gives you the locally stored list of todos in the form of an **array**. You can use all the array methods you want on it :) ((_How do I make use of this information? See Hint [2](#2)_)) 

**Checkpoint:** We now have a more accurate view of what a To-Do Item should be. That is, not only text, but also some more context, like a unique id and a check of whether or not it has been completed, along with its actual textual content. **It also looks a bit prettier**. 

4. Let's give the user the opportunity to remove one of the items. They may not need it anymore or added it by mistake. 
    * You have a function that provides you with the id of the to-do item you want to delete. Use this input `id` to search the array (_How will you search for it? See Hint [3](#3))_ and delete the culprit 
        ```js
        removeToDo(id){
             var toDos = this.getLocalTodos();

            // Your code goes here
    
            this.updateLocalTodos(toDos);
        }
        ```
    * **Observation:** It is generally good practice to work locally when modifications like removals, etc are required. I've modelled this by a `getLocalTodos()` function which just gives you back the locally saved To-Do List and an `updateLocalTodos(toDos)` which takes an input and assigns its contents to our locally saved To-Do List.
    * **Method:** Several ways to go about **removing objects** from arrays:
        * Normal check with iterate(_takes time_)
        * Built in functions - [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 
        * Built-in functions - [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

**Checkpoint:** Incredible, if we weren't picky we'd say we have a functional `ToDo Application`. You are able to add and remove objects from your list. 

5. Take it **one step further**. We now want to see if we've **completed** the tasks or not.
    * You may see that we have a bit of code that triggers the `markTodoCompleted(id)` function: 
        ```js
        showTodo(toDo){
            return <div className="Todo_item" onClick={()=>this.markTodoCompleted(toDo.id)}>
                <div>{toDo.name}</div>
                <button onClick={()=>this.removeToDo(toDo.id)}/>
            </div>
        }
        ```
    * Implement `markTodoCompleted` so that the object with the input `id` will now have the `completed` field set to true
    * _Be cheeky_: if they click again the thing, your function will get called again, if completed was `true` before, set it to `false` so that we can **toggle** completed or not completed. (_You might want to optimise this into one line only, see solution in workshop-2 for inspiration_)

**Checkpoint:** That's it! You've managed to walk/code through a minimalistic `To-Do Application`. 

## What's next?

We're going to be looking into building a `Snake Game` in the same fashion next time. 

If you've found this interesting or you'd like to learn more about how all the magic happened behind the scenes, we're more than happy to invite tou to our `web-development` series next term! 

   


### **Hints**:
#### 1 
_We'd been using `name` which is basically just a string/text. This means our `addTodo(name)` has been working only with text, as opposed to what we now want, which is an Object. You can try to create a new object and assign to its `name` field the name you got as an input._

#### 2
_How are elements in array differentiated from one another although they may all be exactly the same? Just using the indexes. So if we have a new element, we can use its index in the local array as an `id`. What is this index? Well we know it's getting pushed at the end of the array. Then the question remains: what is the index immediately following the index of **the element** at end of my existing local array?_

**Word of warning:** Read below after you've had a go at the id first!  

If you've tried to use `id: getLocalTodos().length + 1` I lovingly advise you to try to break it. **You can!** How? Add 2 elements, id first: 1, id second: 2. _So far so good_. Delete first element. Now `getLocalTodos().length` will give 1. Add new element. id of new element: 2. We now have 2 elements with the same id: 2. Try to delete new element ;) (_If I've assumed correctly, and you're only checking for id, you will actually be deleting the second element from before, which is not ideal. This breaks in the real world more than you know, due to programmer mistakes._)
#### 3 
_If you don't know where it lies as an index, how would you check which item of the array is the one you're looking for? You would **iterate** through it comparing your needed todo to the todos at all indexes. When you find it, you can remove it by index. Careful how you compare it though, keep in mind 2 todos could have the same name ;)_
