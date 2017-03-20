# BLANK GAME - WORKSHOP NOTES

### AIM
The aim of the blank game is to give us a starting point for developing some games, without requiring us to type in the guts of the thing every single time - this wouldn't be a good use of the workshop time.

### WHAT IS BOILERPLATE
You might have heard the word 'boilerplate' before, for code this refers usually to this sort of 'blank slate' stuff that you tend to write over and over again. By using boilerplate code (or a template), we can save a lot of time and know that we're building on a solid foundation to start with - and spend more time making the game!

### STRUCTURE
There are a million ways to structure and make almost anything in Javascript (or in most programming languages!). One of the other reasons this boilerplate code is included is that it represents a fairly standard and simple way of making a Phaser game. It's not complex or fancy, but it's a good balance between simplicity and usefulness.

### PARTS OF THE PROJECT:

#### index.html
Super simple, contains the game! Brings in our JavaScript - both Phaser itself, and any code we're going to write. The only physical thing you'll see is a <div> named 'gameHolder', which is where we're going to attach our game so we can see it. Of course, you can stick any old HTML into this page too, the game doesn't care where it lives. As before, there are many many ways of setting this up - sometimes when you have a really complicated project for example, you often jam all of your JavaScript into a single big file. All that stuff is way beyond the scope of today though, and is kinda boring really compared to making videogames! But I'll include some pointers and resources in the stuff I send out later if you're curious about it.

#### lib
Or, 'libraries' - this folder contains javascript that isn't stuff we've written ourselves. And that includes Phaser itself! often you'll use lots of libraries at the same time, and it's good to keep them together but without mixing it up with your own code. (Again, there are a million ways to do this too! This is the simplest!)

#### css
Styling for our game - currently doesn't do very much apart from set the background of the page, and centers our game.

#### assets
Does what it says on tin - contains our assets. The structure within this folder can be anything you like, and it's wise to keep things organised - games get very complicated very quickly once you start adding levels and sounds and things in! We'll cover lots more about assets today.

#### js
This is where the magic happens - this folder contains all the code we've written ourselves. This is also where we'll be spending 99% of our time.


### CODE STRUCTURE
As with the rest of this, the code has been set up to be as simple as possible, and act as a blank slate from which you can start to build. I've lost count of the number of times I've written this type of code! Let's take a closer look at it.

#### main.js
This is what's called our "entry point", which is to say, it's the first thing that we run. Calling it "main" is a useful convention, but not a rule - if you even get given someone else's code to look at, chances are there'll be a "main" that will usually be a good starting point. Main.js does a few things:
- It waits for the window to be ready, before doing anything else. This is good practice!
- It sets up our Phaser object - 'game'. Everything happens through this, it's the most important thing we make.
- It sets up our states, and starts the loading process. We'll cover this properly during the first game.
- That's it!

#### states/LoaderState.js etc
These are the various 'screens' within our game. This part isn't strictly neccessary, we could technically stick our entire codebase into one massive file and call it a day. However, this is generally a terrible idea, unless your game is trivially simplistic. States allow us to chop up stuff into logical bits, and can be used for anything: menus, levels, game parts, anything you can think of. For today (and for most of this course), we're using three states:
- LoaderState: this loads in all our assets and shows a preloader
- MenuState: this is shown after everything is loaded, and is like a title screen for your game. It has a button on it that lets the user click to start the game.
- GameState: our game! Currently a blank canvas. We like blank canvases!

And that's about it. We'll be copying this game template when we start each game project, which will save us loads of time. And do remember, there are definitely a million ways to do all of this, so once you get more confident with it all, definitely experiment with things and find the system that works for you.
