// Phaser Lander Test
// main.js
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'lander', {preload:preload, create:create, update:update, render:render});

function preload(){
	game.load.image('ship', 'assets/ship_2.png');
	game.load.image('platform', 'assets/platform.png');
	game.load.image('planet', 'assets/circle.png');
}

var lander;
var planet;
var platform;
var gravPoint;
var cursors;

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.stage.backgroundColor = '#2d2d2d';
	
	planet = game.add.sprite(400,300, 'planet');
	planet.anchor.set(0.5);
	var planetW = planet.width;
	var planetH = planet.height;
	game.physics.enable(planet, Phaser.Physics.ARCADE);
	planet.body.gravity = false;
	planet.body.immovable = true;
	
	platform = game.add.sprite(planet.x,220, 'platform');
	platform.anchor.set(0.5);
	platform.scale.setTo(0.5);
	game.physics.enable(platform, Phaser.Physics.ARCADE);
	platform.body.gravity = false;
	platform.body.setSize(100, 10, 0, (-platform.height/2));
	platform.body.immovable = true;
	
	lander = game.add.sprite(100,50,'ship');
	lander.scale.setTo(0.5,0.5);
	lander.anchor.set(0.5);
	game.physics.enable(lander, Phaser.Physics.ARCADE);
	lander.body.maxVelocity.set(200);
	lander.body.bounce.setTo(1,1);
	
	gravPoint = new Phaser.Point(planet.x, planet.y);
	
	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	if(cursors.up.isDown){
		game.physics.arcade.accelerationFromRotation(lander.rotation, 100, lander.body.acceleration);
	}
	else{
		lander.body.acceleration.set(0);
	}
	if(cursors.left.isDown){
		lander.body.angularVelocity = -100;
	}
	else if(cursors.right.isDown){
		lander.body.angularVelocity = 100;
	}
	else{
		lander.body.angularVelocity = 0;
	}
	lander.body.gravity = new Phaser.Point(gravPoint.x - lander.body.x, gravPoint.y - lander.body.y);
	lander.body.gravity = lander.body.gravity.normalize().multiply(50, 50);
	
	game.physics.arcade.collide(lander, platform, null, this);
}

function collisionHandler(obj1, obj2){
	lander.body.immovable = true;
	game.stage.backgroundColor = '#992d2d';
}

function render(){
	game.debug.body(platform);
	game.debug.body(lander);
	game.debug.body(planet);
	game.debug.bodyInfo(lander, 16, 24);
}
