# BREAKOUT! - WORKSHOP NOTES

#### AIM
Our first game is super simple, and is designed to show you how this stuff fits together. Breakout is a nice easy game to re-make, and is still quite fun - it also has lots of ways in which it can be improved after the course too!

#### COPY THE BLANK PROJECT
It might be useful to give it a logical name, and rename the `<title>` node in `index.html`.

#### MAKE SURE IT RUNS!
Spin up a server (we'll take you through this) and hit `localhost:9001/Breakout`

#### TURN ON ARCADE PHYSICS
To make stuff work, we need to choose one of Phaser's physics engines - it has a few, depending on what you're making.
- ARCADE is simple and fast, and treats everything as a rectangle (this is fine for this game)
- NINJA is a bit more accurate than ARCADE, and can do rotated shapes, so slopes and angles etc.
- P2 is a full-on physics simulation, and will do any shapes with weight and friction and anything else. But, it's more complex and more expensive to compute!

For all the games today, we're going to use the simple and easy ARCADE system. First, we need to tell Phaser that we want to use it.

Go into main.js, and in init() you need to add:

`game.physics.startSystem(Phaser.Physics.ARCADE);`

#### ADD THE BALL

We're already adding a background Sprite, we do exactly the same for anything in our game world.

Now, as we're going to need this object later, we need to make a variable up top in the constructor:

```javascript
this.ball
```

This means we can use this object in different places. Very useful! More on this later.

Now we've made our ball variable, we can tell Phaser to make the ball. Add a function called `setupBall()` and put this in:

```javascript
this.ball = game.add.sprite(400, 300, "ball");
this.ball.anchor.set(0.5, 0.5);
```
The anchor point is important - by default things use TOP LEFT but sometimes this isn't appropriate. More on this later.

#### MAKE THE BALL MOVE!

Test the game, and our ball should appear. However it's not doing anything yet - this is because for all intents and purposes it's still just a picture! To make it into a ball, we need to give it... PHYSICS.

Earlier we turned on our physics engine, and now it's time to use it - we need to give our ball some properties.

```javascript
game.physics.enable(this.ball, Phaser.Physics.ARCADE);
this.ball.body.velocity.x = 250;
this.ball.body.velocity.y = 250;
this.ball.body.collideWorldBounds = true;
this.ball.body.bounce.set(1);
```
Velocity is the important part here - it'll set us off moving. For this game we also want our ball to bounce off the walls and not disappear into space, so `collideWorldBounds` will do this for us.

Finally, `bounce.set(1)` gives our ball 100% bounciness - physics engines are great at doing things like friction and gravity, but this can also mean that things will slow down and stop!! As this is an arcade game, we don't really want that that to happen, so setting the bounce to be 1 (or, 100%) means it'll never slow down.

#### ADD THE PADDLE
To add the paddle, we do exactly the same as before, adding a new variable at the top, and a new function called `setupPaddle()`.

The paddle is very similar:

```javascript
this.paddle = game.add.sprite(20, 550, "paddle");
this.paddle.anchor.set(0.5, 0.5);

game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
this.paddle.body.immovable = true;
```

The important thing to note here is that our paddle has it's `immovable` setting turned on - this doesn't mean it's completely frozen (as we'll obviously be controlling it later), but it does mean that other physics objects won't smash it out of position.

In fact, try testing your game with `immovable` commented out - the ball will hit the paddle and knock it off the screen!

#### MOVE THE PADDLE
For this quick prototype, we're just going to stick the paddle to the mouse - keyboard control will come in later games!

To do this, we want to use the `update()` function. This is built into a Phaser state, and is called every frame. So it's a perfect place to put our logic, as all we want to do is make the position of the paddle the same as the position of the mouse. Easy:

```javascript
update: function() {
  this.paddle.x = game.input.mousePointer.x;
}
```

#### ADD COLLISIONS!
Right now, the ball passes completely through the paddle. Why is this?

The main reason is that we've not told Phaser to check if the ball is hitting the paddle. This seems like an odd thing to have to do, but actually makes a lot of sense - if you have a complicated game, it's important to only check collisions that make sense. If everything checks against everything else, your game will be slow and complicated.

As before, the correct place to put this check into is the `update()` function. We simply do:

```javascript
game.physics.arcade.collide(this.ball, this.paddle);
```

Run your game, and the ball should bounce off the paddle correctly.

#### MAKE THE GAME LOSABLE
Right now there isn't a game - you can't lose! We can easily fix that. In Breakout, you lose if you miss the ball and it goes off the bottom of the screen. We've set the game to allow collisions with the world bounds, but handily we can also tell Phaser to ignore certain sides - in this case, we want the top and sides to still be bounce-off-able, but the bottom to allow the ball to go off the screen so we can trigger a game over.

To do this, simply add this line at the bottom of the `setupBall()` function:

```javascript
game.physics.arcade.checkCollision.down = false;
```

If you test your game now, the ball should disappear off the bottom of the screen - however, nothing actually happens. The final thing we want is some logic to detect when this happens.

The best place for this is `update()`, as we want to check every single frame if the ball is in play or not.

To do this, simply add a little `if` statement to the `update()` function:

```javascript
if(this.ball.y > game.height) {
  game.state.start("MenuState");
}
```

Obviously with more time you could make a proper 'Game Over!' state, but for now we'll just drop back to the menu.

#### MAKE THE BALL SPEED UP
One of the details in Breakout that makes things interesting is that the ball speeds up over time. We can easily add this in, by increasing the speed a little when the ball hits the paddle.

To do this, we can add an extra bit into the collision code we just added. Add a third parameter, so it looks like this:

```javascript
game.physics.arcade.collide(this.ball, this.paddle, this.onPaddleHit);
```

This simply calls the `onPaddleHit()` function every time a collision is detected. We can then make that function, and add a little bit to the X and Y velocity each time. Not too much, otherwise it gets unmanageably fast very quickly!

```javascript
onPaddleHit(ball, paddle) {
  ball.body.velocity.x *= 1.005;
  ball.body.velocity.y *= 1.005;
}
```

This is a reall standard way of doing collision detection in Phaser, and we'll be using it loads in the next few games.

#### ADD A DEBUG READOUT
As game developers, we sometimes want extra info about our game that players won't see. This is sometimes called 'debug' information, as it allows you to observe stuff in your game and fix problems. Now we've made our speed increase, it would be handy to keep an eye on it (or at least prove it's working!).

To do this, we can use another of Phaser's built-in functions: `render()`. Phaser allows you to print debug text to the screen in this function, but remember to turn it off when you release your game! I find it useful to have a global DEBUG setting somewhere that will run the game in development mode vs release mode, but this is a personal preference.

The full function looks like this:

```javascript
render: function() {
  game.debug.text(this.ball.body.velocity.x + "/" + this.ball.body.velocity.y, 20, 30);
}
```

Run your game, and you'll see your speed increase printed in the corner. Super useful!

#### CREATE THE BLOCKS
Now of course, we're missing arguably the most important part of Breakout - the blocks! Now, we could probably add these all manually using the stuff we've already learned, but we're going to add loads of blocks. This gets difficult very quickly both when creating objects, but also when doing things like collisions.

Luckily, we can speed things up with some clever code. First, let's MAKE the blocks. To do this, we're going to make a Group. This is a sort of collection that will hold all of our blocks, and will let us doing really easy collision detection later on. At the very top in the constructor, add:

```javascript
this.blocks
```

We're going to make a new function in the same way as `setupBall()`, for our blocks:

```javascript
setupBlocks: function() {
  this.blocks = game.add.physicsGroup();

  var blockWidth = 64;
  var blockHeight = 32;
  var columns = 12;
  var rows = 4;

  for(var i = 0; i < columns; i++)
  {
    for(var j = 0; j < rows; j++)
    {
      var block = this.blocks.create(15 + i * blockWidth, 30 + j * blockHeight, "red-block");
      block.body.immovable = true;
    }
  }
}
```

The `blockWidth` and `blockHeight` we know because that's how big our artwork is. The `columns` and `rows` numbers can be anything, but these are good numbers for this sort of layout for now. Of course, you can do anything here.

[ EXPLAIN LOOPS PROPERLY! ]

The important part here is that we're doing `this.blocks.create` rather than `game.add.sprite`. This is super important - it'll still make our block, but the block will belong to the `blocks` group.

#### ADD BLOCK COLLISIONS
This part is very easy, thanks to the power of groups! Regardless of how many blocks we have, we can do ALL the collision detection with a single line of code.

Find the line of code in `update()` that does the ball/paddle check, and add another one underneath:

```javascript
game.physics.arcade.collide(this.ball, this.blocks, this.onBlockHit);
```
Like magic, this will check if the ball hits ANY of our blocks. Easy! All you need to do now is add the handler, in the same way as we did the last time:

```javascript
onBlockHit(ball, block) {
  block.destroy();
}
```

#### ADD MORE BLOCK TYPES
The final handy detail is that we can easily add more block types - there are four in the assets, so let's add them all.

First, we need to make an `array` of blocks. Arrays are like lists of variables, and they're handy for lots of things that require sequences of objects, or lists, or anything like that. In fact, when we put all our blocks into a group, they're actually really an array of blocks.

To make our array, in `setupBlocks()`, add the following line:

```javascript
this.blockTypes = ["red-block", "green-block", "yellow-block", "blue-block"];
```
To get the name out of the array, you can do something like  `this.blockType[0]`, which will return the first element in the array (everything starts at zero in computer land).

To use this, find the block creation line, and change `red-block` to the following:

```javascript
this.blockTypes[j]
```

So the full line looks like:

```javascript
var block = this.blocks.create(15 + i * blockWidth, 30 + j * blockHeight, this.blockTypes[j]);
```

Run your game and you should get a nice line of each colour block.

#### EXTRA CREDIT
Obviously this is just a little demo, but Breakout is ripe for adding things to. Why not try:
- Adding a left/right bias depending on where the ball hits the paddle?
- Adding a score readout?
- Adding more levels?
