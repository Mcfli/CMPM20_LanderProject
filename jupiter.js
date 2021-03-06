// jupiter.js
var jupiter = function(game) {};
jupiter.prototype = {

preload: function() {
	this.game.load.image('landerthrust', 'assets/Lander Sprites/Phil1thrust.png');
	this.game.load.image('lander', 'assets/Lander Sprites/Phil1.png');
	this.game.load.physics('physicsData', 'assets/PhilScale.json');
	this.game.load.image('platform', 'assets/platform.png');
	this.game.load.image('planet', 'assets/jupiter3.png');
	this.game.load.image('square', 'assets/square.png');
	this.game.load.image('space', 'assets/backgroundTest.png');
	this.game.load.audio('jupiterSong', 'assets/jupiter.ogg');
	this.game.load.image('ast1', 'assets/ast1.png');
	this.game.load.image('ast2', 'assets/ast2.png');
	this.game.load.spritesheet('expl', 'assets/explode.png', 128, 128, 64);
	this.game.load.audio('boom', 'assets/boom.ogg');
	this.game.load.audio('ding', 'assets/ding.ogg');
},

create: function() {
	var planet;
	var platform;
	this.music = this.game.add.audio('jupiterSong');
    this.music.play();

    //setting world size (larger than canvas)
    this.game.world.setBounds(0, 0, 2000, 2000);    
    
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.startSystem(Phaser.Physics.P2JS);
	
	this.game.physics.p2.setImpactEvents(true);
	this.game.physics.p2.restitution = 0.8;
	
	background = this.game.add.tileSprite(0,0,2000,2000, "space");
	
	planet = this.game.add.sprite(1000,1000, 'planet');
	planet.scale.setTo(0.55);
	planet.anchor.set(0.5);
	var planetW = planet.width;
	var planetH = planet.height;
	this.game.physics.p2.enable(planet);
	planet.body.static = true;
	planet.body.setCircle(480);
	planet.enableBody = true;
	
	// point where gravity moves toward (center of planet)
	this.gravPoint = new Phaser.Point(planet.x, planet.y);
	
	platform = this.game.add.sprite(planet.x - 310,planet.y + 370, 'platform');
	platform.anchor.set(0.5);
	platform.scale.setTo(0.75);
	this.game.physics.p2.enable(platform);
	platform.body.static = true;
	platform.enableBody = true;
	platform.body.rotation = Math.atan2(this.gravPoint.y - platform.y, this.gravPoint.x - platform.x);
	
	this.lander = this.game.add.sprite(400, 400, 'lander');
	this.lander.scale.setTo(0.5,0.5);
	this.lander.anchor.set(0.5);
	this.game.physics.p2.enable(this.lander);
	this.lander.body.clearShapes();
	this.lander.body.loadPolygon('physicsData', 'PhilScale');
	this.isNotDead = true;
	
	// Obstacle wall using array
	//top asteroids 2
	var obstArray = new Array();
	for(var i = 0; i < 3; i++){
		if(i == 0) obstArray.push(this.game.add.sprite(800, 200, 'ast2'));
		else obstArray.push(this.game.add.sprite(obstArray[i - 1].x, obstArray[0].y + 200, 'ast2'));
		obstArray[i].anchor.set(0.5);
		obstArray[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(obstArray[i]);
		obstArray[i].body.static = true;
		obstArray[i].enableBody = true;
	}
	
	//top asteroids 1
	var smallWall = new Array();
	for(var i = 0; i < 4; i++){
		if(i == 0) smallWall.push(this.game.add.sprite(800, 1850, 'ast1'));
		else smallWall.push(this.game.add.sprite(smallWall[0].x + 100, smallWall[i - 1].y, 'ast1'));
		smallWall[i].anchor.set(0.5);
		smallWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(smallWall[i]);
		smallWall[i].body.static = true;
		smallWall[i].enableBody = true;
	}
	
	var midObstArray = new Array();
	for(var i = 0; i < 3; i++){
		if(i == 0) midObstArray.push(this.game.add.sprite(300, 900, 'ast2'));
		else midObstArray.push(this.game.add.sprite(midObstArray[i - 1].x + 50, midObstArray[0].y - 100, 'ast2'));
		midObstArray[i].anchor.set(0.5);
		midObstArray[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(midObstArray[i]);
		midObstArray[i].body.static = true;
		midObstArray[i].enableBody = true;
	}
	
	//Asteroid at the top right to force player downwards
	var topWall = new Array();
	for(var i = 0; i < 3; i++){
		if(i == 0) topWall.push(this.game.add.sprite(1550, 400, 'ast2'));
		else topWall.push(this.game.add.sprite(topWall[i - 1].x + 100, topWall[i - 1].y - 100, 'ast2'));
		topWall[i].anchor.set(0.5);
		topWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall[i]);
		topWall[i].body.static = true;
		topWall[i].enableBody = true;
	}
	
	//Bottom Right lower Set of Asteroids
	var lowerAsteroid = new Array();
	for(var i = 0; i < 5; i++){
		if(i == 0) lowerAsteroid.push(this.game.add.sprite(1800, 1800, 'ast1'));
		else lowerAsteroid.push(this.game.add.sprite(lowerAsteroid[i - 1].x - 100, lowerAsteroid[i - 1].y - 100, 'ast1'));
		lowerAsteroid[i].anchor.set(0.5);
		lowerAsteroid[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(lowerAsteroid[i]);
		lowerAsteroid[i].body.static = true;
		lowerAsteroid[i].enableBody = true;
	}
	
	//Middle Left Set of Asteroids
	var middleLeft = new Array();
	for(var i = 0; i < 5; i++){
		if(i == 0) middleLeft.push(this.game.add.sprite(200, 1000, 'ast2'));
		else middleLeft.push(this.game.add.sprite(middleLeft[0].x + 100, middleLeft[i - 1].y + 100, 'ast2'));
		middleLeft[i].anchor.set(0.5);
		middleLeft[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(middleLeft[i]);
		middleLeft[i].body.static = true;
		middleLeft[i].enableBody = true;
	}
	
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
	for(var i = 0; i < smallWall.length; i++){
		smallWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		smallWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < midObstArray.length; i++){
		midObstArray[i].body.setCollisionGroup(obstacleCollisionGroup);
		midObstArray[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall.length; i++){
		topWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < lowerAsteroid.length; i++){
		lowerAsteroid[i].body.setCollisionGroup(obstacleCollisionGroup);
		lowerAsteroid[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < middleLeft.length; i++){
		middleLeft[i].body.setCollisionGroup(obstacleCollisionGroup);
		middleLeft[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	
	// Object collisions
	planet.body.collides([planetCollisionGroup,landerCollisionGroup]);
	platform.body.collides([platformCollisionGroup,landerCollisionGroup]);
	
	this.lander.body.collides(platformCollisionGroup,this.landerHit,this);
	this.lander.body.collides(obstacleCollisionGroup,this.landerCol,this);
	this.lander.body.collides(planetCollisionGroup,this.landerCol,this);
	
	//sets camera to follow lander sprite
	this.game.camera.follow(this.lander);
	
	// Arrow keys
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
	////Functioning Code for HUD, use with Update HUD Functions
    var level = "Jupiter";
	var Veloc = (this.lander.body.velocity.x + this.lander.body.velocity.y)/2;
    //addChild of my text at x:0, y:0
    var levelText = this.game.add.text(0,0,level.toString());
	var VelText = this.game.add.text(0,0,Veloc.toString());
    
    // HUD Sprite
    this.HUDlevel = this.game.add.sprite(700,0);
    this.HUDvel = this.game.add.sprite(0,50);
    
    //Created a Sprite with fixedToCamera = true
    this.HUDlevel.fixedToCamera = true;
    levelText.fill = 'red';
    this.HUDvel.fixedToCamera = true;
    VelText.fill = 'gold';
    
    this.HUDlevel.addChild(levelText);
	this.HUDvel.addChild(VelText);
	
	// pause menu
	this.menu = this.game.add.sprite(200,300);
	this.menu.fixedToCamera = true;
	var resumeText = this.game.add.text(3,0,"Resume");
	resumeText.fill = 'green';
	var spaceText = this.game.add.text(0,25,"[SPACE]");
	spaceText.fill = 'white';
	var exitText = this.game.add.text(310,0,"Exit");
	exitText.fill = 'red';
	var escText = this.game.add.text(300,25,"[ESC]");
	escText.fill = 'white';
	var pauseText = this.game.add.text(150,-50,"PAUSED");
	pauseText.fill = 'white';
	this.menu.addChild(resumeText);
	this.menu.addChild(spaceText);
	this.menu.addChild(exitText);
	this.menu.addChild(escText);
	this.menu.addChild(pauseText);
	this.menu.visible = false;
	this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(function() {
		if(this.game.paused) {
			this.menu.visible = false;
			this.game.paused = false;
			this.music.stop();
			this.game.state.start("mainmenu");
		}
		else {
			this.game.paused = true;
			this.menu.visible = true;
    	}
	}, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function() {
		if(this.game.paused) {
			this.menu.visible = false;
			this.game.paused = false;
		}
	}, this);
},

update: function() {
	//added flames to thrust
	if(this.cursors.up.isDown && this.isNotDead){
		this.lander.body.thrust(100);
		this.lander.loadTexture('landerthrust');
	}
	else if(this.cursors.up.isUp && this.isNotDead){
		this.lander.loadTexture('lander');
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
	
	////Velocity update for HUD
	//calculating Velocity of Lander
	var Veloc = "Approach Speed: " + (Math.floor(Math.floor(Math.abs(this.lander.body.velocity.x) 
		+ Math.abs(this.lander.body.velocity.y))) + " m/s");
    //stringify Veloc
    var VelText = this.game.add.text(0,0,Veloc.toString());
	//clear old sprite
	this.HUDvel.destroy();
    //generate new sprite
    this.HUDvel = this.game.add.sprite(0,0);
    this.HUDvel.fixedToCamera = true;
    VelText.fill = 'gold';
    this.HUDvel.addChild(VelText);
    
    //Logic for generating HUD Warning
    if(Math.floor(Math.floor(Math.abs(this.lander.body.velocity.x) 
		+ Math.abs(this.lander.body.velocity.y))) > 40 && this.HUDwarn == null){
			var Warning = "UNSAFE LANDING SPEED";
			var WarnText = this.game.add.text(0,0,Warning.toString());
			//this.HUDwarn.destroy();
			this.HUDwarn = this.game.add.sprite(0,25);
			this.HUDwarn.fixedToCamera = true;
			WarnText.fill = 'red';
			this.HUDwarn.addChild(WarnText);
	}
	 
	//turn off warn	
	if(Math.floor(Math.floor(Math.abs(this.lander.body.velocity.x) 
		+ Math.abs(this.lander.body.velocity.y))) < 40 && this.HUDwarn != null){
			
			this.HUDwarn.destroy();	
			this.HUDwarn = null;
	
	}
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
//	if(absX >= 18 || absY >= 18){
		
	if((absX + absY) >= 40){
		// blow up
		console.log("blow up");
		this.boom = this.game.add.audio('boom');
    	this.boom.play();
		this.lander.body.static = true;
		this.lander.loadTexture("expl");
		this.lander.animations.add("expl");
		this.lander.play("expl", 30, true);
		this.isNotDead = false;
		restart = this.game.time.create(false);
		restart.loop(Phaser.Timer.SECOND * 2.00, this.restartLevel, this);
		restart.start();
	}
	else{
		// check landing angle
		if(bodyA.angle <= bodyB.angle + 100 && bodyA.angle >= bodyB.angle - 100){
			bodyA.static = true;
			console.log("SAFE");
			this.ding = this.game.add.audio('ding');
			this.ding.play();
			var complete = "Level Complete!";
			var completeText = this.game.add.text(0,0,complete.toString());
			completeText.fill = 'green';
			this.completeLevel = this.game.add.sprite(300,100);
			this.completeLevel.fixedToCamera = true;
			this.completeLevel.addChild(completeText);
			menu = this.game.time.create(false);
			menu.loop(Phaser.Timer.SECOND * 2.00, this.nextLevel, this);
			menu.start();
		}
		else{
			// blow up
			console.log("blow up");
			this.boom = this.game.add.audio('boom');
    		this.boom.play();
			this.lander.body.static = true;
			this.lander.loadTexture("expl");
			this.lander.animations.add("expl");
			this.lander.play("expl", 30, true);
			this.isNotDead = false;
			restart = this.game.time.create(false);
			restart.loop(Phaser.Timer.SECOND * 2.00, this.restartLevel, this);
			restart.start();
		}
	}
	
		
},

// function called when lander hits anything besides the platform
landerCol: function(bodyA, bodyB, shapeA, shapeB){
		console.log("blow up");
		this.boom = this.game.add.audio('boom');
    	this.boom.play();
		this.lander.body.static = true;
		this.lander.loadTexture("expl");
		this.lander.animations.add("expl");
		this.lander.play("expl", 30, true);
		this.isNotDead = false;
		restart = this.game.time.create(false);
		restart.loop(Phaser.Timer.SECOND * 2.00, this.restartLevel, this);
		restart.start();
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

retMenu: function(){
	this.music.stop();
	this.game.state.start('mainmenu');
},

nextLevel: function(){
	this.music.stop();
	this.game.state.start('marsIntro');
},

restartLevel: function() {
	this.music.stop();
	this.game.state.start('jupiter');
	},

render: function() {
	this.game.debug.bodyInfo(this.lander,32,32);
}
}
