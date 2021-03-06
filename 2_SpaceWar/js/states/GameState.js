var GameState = function(game){
  this.bg;
  this.ship;
  this.cursors;
  this.shootButton;

  this.bgSpeed = 4;
  this.shipMoveSpeed = 5;

  this.lasers;
  this.enemies;

  this.emitter;
};

GameState.prototype = {
  create: function() {
    this.setupGame();
    this.setupEmitter();
    this.setupEnemies();
    this.addControls();
  },

  setupGame: function() {
    this.bg = game.add.tileSprite(0, 0, 1000, 600, "game-background");

    this.ship = game.add.sprite(40, 250, "ship");
    this.ship.anchor.set(0, 0.5);

    this.lasers = game.add.group();
    this.enemies = game.add.group();
  },

  setupEmitter: function() {
    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('asteroid-chunk');
    this.emitter.minParticleSpeed.setTo(-100, -100);
    this.emitter.maxParticleSpeed.setTo(300, 300);
    this.emitter.gravity.x = -500;
    this.emitter.gravity.y = 0;
  },

  setupEnemies: function() {
    // make asteroids
    for(var i = 0; i < 10; i++) {
      var enemy = this.enemies.create(1200, 800, "asteroid");
      enemy.anchor.set(0.5, 0.5);
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.velocity.x = -300;

      enemy.checkWorldBounds = true;
      enemy.events.onOutOfBounds.add(this.recycleEnemy, this);
    }

    // make enemy ship
    var enemyShip = game.add.sprite(1200, 300, "enemy-ship");
    enemyShip.anchor.set(0.5, 0.5);
    game.physics.enable(enemyShip, Phaser.Physics.ARCADE);
    enemyShip.body.velocity.x = -500;

    enemyShip.checkWorldBounds = true;
    enemyShip.events.onOutOfBounds.add(this.recycleEnemy, this);
  },

  addControls: function() {
    this.cursors = game.input.keyboard.createCursorKeys();
    this.shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shootButton.onDown.add(this.shootLaser, this);
  },

  shootLaser: function() {
    var laser = this.lasers.create(this.ship.x + 50, this.ship.y, "laser");
    laser.anchor.set(0, 0.5);
    game.physics.enable(laser, Phaser.Physics.ARCADE);
    laser.body.velocity.x = 800;

    laser.checkWorldBounds = true;
    laser.events.onOutOfBounds.add(this.killLaser, this);
  },

  killLaser: function(_laser) {
    _laser.kill();
  },

  update: function() {
    this.scrollBackground();
    this.checkControls();
    this.checkCollisions();
  },

  scrollBackground: function() {
    this.bg.tilePosition.x -= this.bgSpeed;
  },

  checkControls: function() {
    if(this.cursors.up.isDown)
      this.ship.y -= this.shipMoveSpeed;

    if(this.cursors.down.isDown)
      this.ship.y += this.shipMoveSpeed;

    if(this.cursors.left.isDown)
      this.ship.x -= this.shipMoveSpeed;

    if(this.cursors.right.isDown)
      this.ship.x += this.shipMoveSpeed;
  },

  checkCollisions: function() {
    game.physics.arcade.overlap(this.lasers, this.enemies, this.onEnemyDestroyed, null, this);
  },

  onEnemyDestroyed: function(_laser, _enemy) {
    this.emitter.x = _enemy.x;
    this.emitter.y = _enemy.y;

    this.emitter.start(true, 4000, null, 6);

    this.killLaser(_laser);
    this.recycleEnemy(_enemy);
  },

  recycleEnemy: function(_enemy) {
    _enemy.x = 1200 + (Math.random() * 5000);
    _enemy.y = Math.random() * 600;

    if(_enemy.key == "asteroid") {
      _enemy.body.velocity.x = -300;
      _enemy.body.velocity.y = -20 + (Math.random() * 40);
      _enemy.body.angularVelocity = -10 + (Math.random() * 20);
    }
    else if(_enemy.key == "enemy-ship") {
      _enemy.body.velocity.x = -500;
    }
  }
}
