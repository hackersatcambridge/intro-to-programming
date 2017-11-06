<img src="./workshop-1/resources/readme-images/hac-logo-dark.png">

Introduction to Programming
===
This is a quick-and-dirty introduction to programming. It consists of a walkthrough followed by 3 Workshops in which you will apply what you've seen. 

<!-- TOC -->

- [Programming Basics](./intro-sessions/description.md)
- [Workshop Requirements](#workshop-requirements)
    - [Versions used](#versions-used)
    - [Instructions](#instructions)
- [Workshops](#Workshops)
    - [Workshop 1](#workshop-1)    
    - [Workshop 2](#workshop-2)
    - [Workshop 3](#workshop-3)
- [Resources](#resources)
    - [Programming Concepts](#programming-concepts)
    - [JavaScript](#javascript)
    - [React](#react)
    - [Extras](#extras)  

<!-- /TOC -->

## Programming Basics 
Before you get into any of the hands-on material below, I advise you to familiarise yourselves with the concepts we will be making use of in the Workshops. 

If you're not familiar with what variables are, how we manipulate data with instructions and most importantly, how functions come into play, please have a read-through of the material covered in the first two sessions of this beginners series: [Introductory Sessions](./intro-sessions/description.md) 

Please read on if you feel you're comfortable with all of the above. 

## Workshop Requirements 

### Editor
You will need a suitable editor for your code. Some people will say you should code everything from the command line. Please don't trust those people. A visual is always helpful, especially at the beginning. 

My personal preference, just for its versatility and portability (_i.e we can use it with any of the operating systems: Windows, Ubuntu, MacOS_) is [Visual Studio Code](https://code.visualstudio.com/Download). You are free to use whatever strikes your fancy though. (_I will put some other suggestions in the extras at the bottom_) 

### Dependencies

You will need to make sure you download and install the following in order to get us up and running with our application. 

* [yarn](https://yarnpkg.com/en/docs/install)

## Versions used

* yarn: `v0.27.5`

## Instructions

### Download or clone the available code 

We are going to be using github as a very valuable resource with which if you go down further the path of programming you will find is very darn useful. 
Think of it as a huge library of other people's ideas and implementations of these ideas. It also allows you to interact with other people's code, like you will do in this workshop! 

Go to the Introduction to Programming [repository](https://github.com/hackersatcambridge/intro-to-programming) (_fancy name for 'online folder' if you will_) and download the code as a zip. (If you want to see more interaction with the `git` interface just go the resources for our other workshop: [Tools For Programmers - Git Workshop](https://github.com/hackersatcambridge/git-workshop-2017))

### Run the app

* Go to the ```workshop-1``` folder location _(where you've cloned/unzipped it)_ 
* `yarn` 

    _This installs all other required dependecies for you_
* `yarn start` 

    _This will start the web app development server usually at `http://localhost:3000/`_

### Change some code:

Go to `/workshop-1/src/js/Playground.js` and change the description message. The app should re-build itself and reload the content with your changes. You are free to change whatever in that file or in any other one. Active involvement with `ToDo.js` `Snek.js` and `Transfer.js` will be going on in the three Workshops. 

## Workshops 

There are three workshops that you may attempt with the knowledge acquired from the introductory material. The Workshops consist of changing different components in the same application in order to apply the basic principles or programming: ...

### Workshop 1 
In this workshop we will go ahead and apply the acquired knowledge to a real-life application. 

By putting together the pieces for a [To-Do Application](./workshop-1/description.md) we will dynamically see our code shaping the outcome of the program. Striving to understand how everything puzzles together is one of the beauties of programming. 

### Workshop 2
To be continued...

### Practical 3
To be continued...

## Resources 

### Programming Concepts

### JavaScript

* [`Eloquent JavaScript` - 2nd Edition](http://eloquentjavascript.net/index.html)
* Loads of Javascript [libraries](https://www.javascripting.com/?sort=rating) available out there

### React

The [`React`](./React.md) JavaScript library has seen an incredible rise in popularity because of its ease of use and compatibilities. [`React Native`](https://facebook.github.io/react-native/) is another JS library built on top of React, used especially for mobile phone applications. 

### Extras
#### Other editors
* Good [article](https://lifehacker.com/five-best-text-editors-1564907215) mentioning the most frequently used editors by "programmers" 
    * Notepad++
    * Emacs
    * Vim 
    * Atom 
    * Sublime Text

There are many debates over this, _like over every other possible topic which requires the tiniest bit of customizatin in programming_. Ultimately, just use what feels more confortable, don't bother reading too many of the 'Why this one?, Why that one?' at this stage. Obviously everything is about trade-offs with editors as well, like with programming langauges, but at the end of the day you're only dipping your feet in programming now. **Relax**. 

#### Other languages

