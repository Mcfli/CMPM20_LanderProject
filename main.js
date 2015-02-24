// Phaser Lander Test
// main.js
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'lander', {preload:preload, create:create, update:update, render:render});
var level = function(game) {};
level.prototype = {

preload: function() {
//function preload(){
	this.game.load.image('lander', 'assets/Lander Sprites/Phil1.png');
	this.game.load.physics('physicsData', 'assets/PhilScale.json');
	this.game.load.image('platform', 'assets/platform.png');
	this.game.load.image('planet', 'assets/mars.png');
	this.game.load.image('square', 'assets/square.png');
	this.game.load.image('space', 'assets/backgroundTest.png');
	//this.game.load.audio('thrust', 'assets/thruster.ogg');
	this.game.load.audio('jupiter', 'assets/jupiter.ogg');
},
//var lander;
//var planet;
//var platform;
//var gravPoint;
//var tiltBox;
//var cursors;

create: function() {
	//var lander;
	var planet;
	var platform;
	//var gravPoint;
	//var tiltBox;
	//var cursors;
	this.music = this.game.add.audio('jupiter');
    this.music.play();

    //setting world size (larger than canvas)
    this.game.world.setBounds(0, 0, 2000, 2000);    
    
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.startSystem(Phaser.Physics.P2JS);
	
	this.game.physics.p2.setImpactEvents(true);
	this.game.physics.p2.restitution = 0.8;
	
	background = this.game.add.tileSprite(0,0,2000,2000, "space");
	
	planet = this.game.add.sprite(1000,1000, 'planet');
	planet.scale.setTo(0.64);
	planet.anchor.set(0.5);
	var planetW = planet.width;
	var planetH = planet.height;
	this.game.physics.p2.enable(planet, true);
	planet.body.static = true;
	planet.body.setCircle(480);
	planet.enableBody = true;
	
	// point where gravity moves toward (center of planet)
	this.gravPoint = new Phaser.Point(planet.x, planet.y);
	
	platform = this.game.add.sprite(planet.x + 360,planet.y - 310, 'platform');
	platform.anchor.set(0.5);
	platform.scale.setTo(0.75);
	this.game.physics.p2.enable(platform, true);
	platform.body.static = true;
	platform.enableBody = true;
	platform.body.rotation = Math.atan2(this.gravPoint.y - platform.y, this.gravPoint.x - platform.x);
	//console.log(platform.body.angle);
	
	//lander = this.game.add.sprite(100,50,'lander');
	this.lander = this.game.add.sprite(400, 400, 'lander');
	this.lander.scale.setTo(0.5,0.5);
	this.lander.anchor.set(0.5);
	this.game.physics.p2.enable(this.lander, true);
	this.lander.body.clearShapes();
	this.lander.body.loadPolygon('physicsData', 'PhilScale');

	// Obstacle wall using array
	var obstArray = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) obstArray.push(this.game.add.sprite(800, 400, 'square'));
		else obstArray.push(this.game.add.sprite(obstArray[i - 1].x + 50, obstArray[0].y, 'square'));
		obstArray[i].anchor.set(0.5);
		obstArray[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(obstArray[i], true);
		obstArray[i].body.static = true;
		obstArray[i].enableBody = true;
	}
	
	// Moving box
	this.tiltBox = this.game.add.sprite(1300, 400, 'square');
	this.tiltBox.anchor.set(0.5);
	this.tiltBox.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBox, true);
	this.tiltBox.enableBody = true;
	this.velocityTowards(this.tiltBox,this.gravPoint,80);
	this.tiltBox.body.kinematic = true;
	
	// Calls for obstacles moving at the same speed, only need 1 call
	timer = this.game.time.create(false);
	console.log(this.tiltBox);
	timer.loop(Phaser.Timer.SECOND * 2.25, this.flipVel,this);
	timer.start();
	//this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, callback(this.flipVel,this.tiltBox));

	// Create collision groups
	var landerCollisionGroup = this.game.physics.p2.createCollisionGroup();
	var planetCollisionGroup = this.game.physics.p2.createCollisionGroup();
	var platformCollisionGroup = this.game.physics.p2.createCollisionGroup();
	var obstacleCollisionGroup = this.game.physics.p2.createCollisionGroup();
	
	// Collidie with world bounds
	this.game.physics.p2.updateBoundsCollisionGroup();
	
	// Assign collision groups
	planet.body.setCollisionGroup(planetCollisionGroup);
	platform.body.setCollisionGroup(platformCollisionGroup);
	this.lander.body.setCollisionGroup(landerCollisionGroup);
	for(var i = 0; i < obstArray.length; i++){
		obstArray[i].body.setCollisionGroup(obstacleCollisionGroup);
		obstArray[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	this.tiltBox.body.setCollisionGroup(obstacleCollisionGroup);
	
	// Object collisions
	planet.body.collides([planetCollisionGroup,landerCollisionGroup]);
	platform.body.collides([platformCollisionGroup,landerCollisionGroup]);
	this.tiltBox.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	
	
	this.lander.body.collides(platformCollisionGroup,this.landerHit,this);
	this.lander.body.collides(obstacleCollisionGroup,this.landerCol,this);
	this.lander.body.collides(planetCollisionGroup,this.landerCol,this);
	
	//sets camera to follow lander sprite
	this.game.camera.follow(this.lander);
	
	// Arrow keys
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
},

update: function() {
	//thrust = this.game.add.audio('thrust');
	if(this.cursors.up.isDown){
		this.lander.body.thrust(100);
		//thrust.play();
	}
	if(this.cursors.left.isDown){
		
		this.lander.body.rotateLeft(100);
	}
	else if(this.cursors.right.isDown){
		this.lander.body.rotateRight(100);
	}
	else{
		this.lander.body.setZeroRotation();
	}
	this.accelerateToObject(this.lander,this.gravPoint,50);
},

accelerateToObject: function(obj1, obj2, speed){
	if(typeof speed === 'undefined'){speed = 50;}
	var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.force.x += Math.cos(angle) * speed;
    obj1.body.force.y += Math.sin(angle) * speed;
},

// function called by collision with platform
landerHit: function(bodyA, bodyB, shapeA, shapeB){
	var v = new Phaser.Point(bodyA.velocity.x, bodyA.velocity.y);
	var absX = Math.abs(v.x);
	var absY = Math.abs(v.y);
	console.log(absX, absY);
	// check landing velocity
	if(absX >= 18 || absY >= 18){
		// blow up
		console.log("blow up");
		this.music.stop();
		this.game.state.start('level');
	}
	else{
		// check landing angle
		if(bodyA.angle <= bodyB.angle + 100 && bodyA.angle >= bodyB.angle - 100){
			bodyA.static = true;
			console.log("SAFE");
		}
		else{
			// blow up
			console.log("blow up");
			this.music.stop();
			this.game.state.start('create');
		}
	}
	
		
},

// function called when lander hits anything besides the platform
landerCol: function(bodyA, bodyB, shapeA, shapeB){
	console.log("blow up");
	this.music.stop();
	this.game.state.start('level');
},

// Calls reverseVel for every obstacle that needs to move at the same time
flipVel: function(obj1){
	this.reverseVel(this.tiltBox);
},

// Called by timer function to reverse object's velocity
reverseVel: function(obj1){
	obj1.body.velocity.y = -obj1.body.velocity.y;
	obj1.body.velocity.x = -obj1.body.velocity.x;
},

velocityTowards: function(obj1, obj2, speed){
	if(typeof speed === 'undefined'){speed = 80;}
	var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
	obj1.body.rotation = angle;
    obj1.body.velocity.x = Math.cos(angle) * speed;
    obj1.body.velocity.y = Math.sin(angle) * speed;
},


render: function() {
	this.game.debug.bodyInfo(this.lander,32,32);
}
}