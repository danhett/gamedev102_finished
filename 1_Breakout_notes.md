# BREAKOUT! - WORKSHOP NOTES

### AIM
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
this.ball = this.game.add.sprite(400, 300, "ball");
this.ball.anchor.set(0.5, 0.5);
```
The anchor point is important - by default things use TOP LEFT but sometimes this isn't appropriate. More on this later.

#### MAKE THE BALL MOVE!

Test the game, and our ball should appear. However it's not doing anything yet - this is because for all intents and purposes it's still just a picture! To make it into a ball, we need to give it... PHYSICS.

Earlier we turned on our physics engine, and now it's time to use it - we need to give our ball some properties.

```javascript
this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
this.ball.body.velocity.x = 250;
this.ball.body.velocity.y = 250;
this.ball.body.collideWorldBounds = true;
this.ball.body.bounce.set(1);

this.game.physics.arcade.checkCollision.down = false;
```
Velocity is the important part here - it'll set us off moving. For this game we also want our ball to bounce off the walls and not disappear into space, so `collideWorldBounds` will do this for us.

Finally, `bounce.set(1)` gives our ball 100% bounciness - physics engines are great at doing things like friction and gravity, but this can also mean that things will slow down and stop!! As this is an arcade game, we don't really want that that to happen, so setting the bounce to be 1 (or, 100%) means it'll never slow down.

#### ADD THE PADDLE
To add the paddle, we do exactly the same as before, adding a new variable at the top, and a new function called `setupPaddle()`.

The paddle is very similar:

```javascript
this.paddle = this.game.add.sprite(20, 550, "paddle");
this.paddle.anchor.set(0.5, 0.5);

this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
this.paddle.body.immovable = true;
```

The important thing to note here is that our paddle has it's `immovable` setting turned on - this doesn't mean it's completely frozen (as we'll obviously be controlling it later), but it does mean that other physics objects won't smash it out of position.

In fact, try testing your game with `immovable` commented out - the ball will hit the paddle and knock it off the screen!
