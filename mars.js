// mars.js
var mars = function(game) {};
mars.prototype = {

preload: function() {
	this.game.load.image('landerthrust', 'assets/Lander Sprites/Phil1thrust.png');
	this.game.load.image('lander', 'assets/Lander Sprites/Phil1.png');
	this.game.load.physics('physicsData', 'assets/PhilScale.json');
	this.game.load.image('platform', 'assets/platform.png');
	this.game.load.image('planet', 'assets/mars.png');
	this.game.load.image('square', 'assets/square.png');
	this.game.load.image('space', 'assets/backgroundTest.png');
	this.game.load.audio('marsSong', 'assets/mars.ogg');
	this.game.load.image('ast1', 'assets/ast1.png');
	this.game.load.image('ast2', 'assets/ast2.png');
	this.game.load.spritesheet('expl', 'assets/expl.png', 192, 192, 64);
},

create: function() {
	var planet;
	var platform;
	this.music = this.game.add.audio('marsSong');
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
	this.game.physics.p2.enable(planet);
	planet.body.static = true;
	planet.body.setCircle(480);
	planet.enableBody = true;
	
	// point where gravity moves toward (center of planet)
	this.gravPoint = new Phaser.Point(planet.x, planet.y);
	
	platform = this.game.add.sprite(planet.x + 360,planet.y - 310, 'platform');
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
	// top row
	var obstArray = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) obstArray.push(this.game.add.sprite(800, 400, 'ast1'));
		else obstArray.push(this.game.add.sprite(obstArray[i - 1].x + 50, obstArray[0].y, 'ast1'));
		obstArray[i].anchor.set(0.5);
		obstArray[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(obstArray[i]);
		obstArray[i].body.static = true;
		obstArray[i].enableBody = true;
	}
	var smallWall = new Array();
	for(var i = 0; i < 2; i++){
		if(i == 0) smallWall.push(this.game.add.sprite(800, 450, 'ast1'));
		else smallWall.push(this.game.add.sprite(smallWall[0].x, smallWall[i - 1].y + 50, 'ast1'));
		smallWall[i].anchor.set(0.5);
		smallWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(smallWall[i]);
		smallWall[i].body.static = true;
		smallWall[i].enableBody = true;
	}
	var midObstArray = new Array();
	for(var i = 0; i < 5; i++){
		if(i == 0) midObstArray.push(this.game.add.sprite(290, 1000, 'ast2'));
		else midObstArray.push(this.game.add.sprite(midObstArray[i - 1].x + 50, midObstArray[0].y, 'ast2'));
		midObstArray[i].anchor.set(0.5);
		midObstArray[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(midObstArray[i]);
		midObstArray[i].body.static = true;
		midObstArray[i].enableBody = true;
	}
	var botWall = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) botWall.push(this.game.add.sprite(planet.x, 1650, 'ast1'));
		else botWall.push(this.game.add.sprite(botWall[0].x, botWall[i - 1].y + 50, 'ast1'));
		botWall[i].anchor.set(0.5);
		botWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(botWall[i]);
		botWall[i].body.static = true;
		botWall[i].enableBody = true;
	}
	var topWall = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) topWall.push(this.game.add.sprite(1550, 0, 'ast2'));
		else topWall.push(this.game.add.sprite(topWall[i - 1].x - 50, topWall[i - 1].y + 50, 'ast2'));
		topWall[i].anchor.set(0.5);
		topWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall[i]);
		topWall[i].body.static = true;
		topWall[i].enableBody = true;
	}
	var lowerWall = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) lowerWall.push(this.game.add.sprite(1800, 1493, 'ast1'));
		else lowerWall.push(this.game.add.sprite(lowerWall[i - 1].x - 50, lowerWall[i - 1].y - 31, 'ast1'));
		lowerWall[i].anchor.set(0.5);
		lowerWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(lowerWall[i]);
		lowerWall[i].body.static = true;
		lowerWall[i].enableBody = true;
		lowerWall[i].body.rotation = Math.atan2(this.gravPoint.y - lowerWall[i].y, this.gravPoint.x - lowerWall[i].x);
	}
	var sideWall = new Array();
	for(var i = 0; i < 12; i++){
		if(i == 0) sideWall.push(this.game.add.sprite(1650, 1200, 'ast2'));
		else sideWall.push(this.game.add.sprite(sideWall[0].x, sideWall[i - 1].y - 50, 'ast2'));
		sideWall[i].anchor.set(0.5);
		sideWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(sideWall[i]);
		sideWall[i].body.static = true;
		sideWall[i].enableBody = true;
	}
	var sideTwo = new Array();
	for(var i = 0; i < 3; i++){
		if(i == 0) sideTwo.push(this.game.add.sprite(1650, 600, 'ast1'));
		else sideTwo.push(this.game.add.sprite(sideTwo[i - 1].x + 50, sideTwo[0].y, 'ast1'));
		sideTwo[i].anchor.set(0.5);
		sideTwo[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(sideTwo[i]);
		sideTwo[i].body.static = true;
		sideTwo[i].enableBody = true;
	}
	
	// Moving box
	this.tiltBox = this.game.add.sprite(100, 1450, 'ast2');
	this.tiltBox.anchor.set(0.5);
	this.tiltBox.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBox);
	this.tiltBox.enableBody = true;
	this.velocityTowards(this.tiltBox,this.gravPoint,100);
	this.tiltBox.body.kinematic = true;
	
	this.tiltBoxTwo = this.game.add.sprite(this.tiltBox.x + 400,this.tiltBox.y - 200, 'ast2');
	this.tiltBoxTwo.anchor.set(0.5);
	this.tiltBoxTwo.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBoxTwo);
	this.tiltBoxTwo.enableBody = true;
	this.velocityTowards(this.tiltBoxTwo,this.gravPoint,100);
	this.reverseVel(this.tiltBoxTwo);
	this.tiltBoxTwo.body.kinematic = true;
	
	// Calls for obstacles moving at the same speed, only need 1 call
	timer = this.game.time.create(false);
	//timer.loop(Phaser.Timer.SECOND * 2.25, this.flipVel,this);
	timer.loop(Phaser.Timer.SECOND * 2.00, this.flipVel,this);
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
	for(var i = 0; i < smallWall.length; i++){
		smallWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		smallWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < midObstArray.length; i++){
		midObstArray[i].body.setCollisionGroup(obstacleCollisionGroup);
		midObstArray[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < botWall.length; i++){
		botWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		botWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall.length; i++){
		topWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < lowerWall.length; i++){
		lowerWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		lowerWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < sideWall.length; i++){
		sideWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		sideWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < sideTwo.length; i++){
		sideTwo[i].body.setCollisionGroup(obstacleCollisionGroup);
		sideTwo[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	this.tiltBox.body.setCollisionGroup(obstacleCollisionGroup);
	this.tiltBoxTwo.body.setCollisionGroup(obstacleCollisionGroup);
	
	// Object collisions
	planet.body.collides([planetCollisionGroup,landerCollisionGroup]);
	platform.body.collides([platformCollisionGroup,landerCollisionGroup]);
	this.tiltBox.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	this.tiltBoxTwo.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	
	this.lander.body.collides(platformCollisionGroup,this.landerHit,this);
	this.lander.body.collides(obstacleCollisionGroup,this.landerCol,this);
	this.lander.body.collides(planetCollisionGroup,this.landerCol,this);
	
	//sets camera to follow lander sprite
	this.game.camera.follow(this.lander);
	
	// Arrow keys
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
	////Functioning Code for HUD, use with Update HUD Functions
    var level = "Mars";
	var Veloc = (this.lander.body.velocity.x + this.lander.body.velocity.y)/2;
    //addChild of my text at x:0, y:0
    var levelText = this.game.add.text(0,0,level.toString());
	var VelText = this.game.add.text(0,0,Veloc.toString());
    
    // HUD Sprite
    this.HUDlevel = this.game.add.sprite(500,0);
    this.HUDvel = this.game.add.sprite(0,50);
    
    //Created a Sprite with fixedToCamera = true
    this.HUDlevel.fixedToCamera = true;
    levelText.fill = 'red';
    this.HUDvel.fixedToCamera = true;
    VelText.fill = 'gold';
    
    this.HUDlevel.addChild(levelText);
	this.HUDvel.addChild(VelText);
	
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
		+ Math.abs(this.lander.body.velocity.y)/2)) + " m/s");
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
		+ Math.abs(this.lander.body.velocity.y)/2)) > 40 && this.HUDwarn == null){
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
		+ Math.abs(this.lander.body.velocity.y)/2)) < 40 && this.HUDwarn != null){
			
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
			var complete = "Level Complete!";
			var completeText = this.game.add.text(0,0,complete.toString());
			completeText.fill = 'green';
			this.completeLevel = this.game.add.sprite(300,100);
			this.completeLevel.fixedToCamera = true;
			this.completeLevel.addChild(completeText);
			menu = this.game.time.create(false);
			menu.loop(Phaser.Timer.SECOND * 2.00, this.retMenu, this);
			menu.start();
		}
		else{
			// blow up
			console.log("blow up");
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
		this.lander.body.static = true;
		this.lander.loadTexture("expl");
		this.lander.animations.add("expl");
		this.lander.play("expl", 30, true);
		this.isNotDead = false;
		restart = this.game.time.create(false);
		restart.loop(Phaser.Timer.SECOND * 2.00, this.restartLevel, this);
		restart.start();
},

// Calls reverseVel for every obstacle that needs to move at the same time
flipVel: function(obj1){
	this.reverseVel(this.tiltBox);
	this.reverseVel(this.tiltBoxTwo);
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

restartLevel: function() {
	this.music.stop();
	this.game.state.start('mars');
	},

render: function() {
	this.game.debug.bodyInfo(this.lander,32,32);
}
}
