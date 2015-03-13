// earth.js
var earth = function(game) {};
earth.prototype = {

preload: function() {
	this.game.load.image('landerthrust', 'assets/Lander Sprites/Phil1thrust.png');
	this.game.load.image('lander', 'assets/Lander Sprites/Phil1.png');
	this.game.load.physics('physicsData', 'assets/PhilScale.json');
	this.game.load.image('platform', 'assets/platform.png');
	this.game.load.image('planet', 'assets/earth1.png');
	this.game.load.image('square', 'assets/square.png');
	this.game.load.image('space', 'assets/earthbackground.png');
	this.game.load.audio('earthSong', 'assets/EarthMusic.ogg');
	this.game.load.image('ast1', 'assets/ast1.png');
	this.game.load.image('ast2', 'assets/ast2.png');
	this.game.load.spritesheet('expl', 'assets/explode.png', 128, 128, 64);
	this.game.load.audio('boom', 'assets/boom.ogg');
	this.game.load.audio('ding', 'assets/ding.ogg');
},

create: function() {
	var planet;
	var platform;
	this.music = this.game.add.audio('earthSong');
    this.music.play();

    //setting world size (larger than canvas)
    this.game.world.setBounds(0, 0, 2000, 2000);    
    
	this.game.physics.startSystem(Phaser.Physics.P2JS);
	
	this.game.physics.p2.setImpactEvents(true);
	this.game.physics.p2.restitution = 0.8;
	
	background = this.game.add.tileSprite(0,0,2000,2000, "space");
	
	planet = this.game.add.sprite(1000,1000, 'planet');
	planet.scale.setTo(0.53);
	planet.anchor.set(0.5);
	var planetW = planet.width;
	var planetH = planet.height;
	this.game.physics.p2.enable(planet);
	planet.body.static = true;
	planet.body.setCircle(480);
	planet.enableBody = true;
	
	// point where gravity moves toward (center of planet)
	this.gravPoint = new Phaser.Point(planet.x, planet.y);
	
	platform = this.game.add.sprite(planet.x,planet.y + 475, 'platform');
	platform.anchor.set(0.5);
	platform.scale.setTo(0.75);
	this.game.physics.p2.enable(platform);
	platform.body.static = true;
	platform.enableBody = true;
	platform.body.rotation = Math.atan2(this.gravPoint.y - platform.y, this.gravPoint.x - platform.x);
	
	this.lander = this.game.add.sprite(200, 200, 'lander');
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
		if(i == 0) obstArray.push(this.game.add.sprite(1000, 500, 'ast1'));
		else obstArray.push(this.game.add.sprite(obstArray[i - 1].x - 50, obstArray[i - 1].y - 50, 'ast1'));
		obstArray[i].anchor.set(0.5);
		obstArray[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(obstArray[i]);
		obstArray[i].body.static = true;
		obstArray[i].enableBody = true;
	}
	


	var topWall = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) topWall.push(this.game.add.sprite(850, 0, 'ast2'));
		else topWall.push(this.game.add.sprite(topWall[i - 1].x + 50, topWall[i - 1].y + 50, 'ast2'));
		topWall[i].anchor.set(0.5);
		topWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall[i]);
		topWall[i].body.static = true;
		topWall[i].enableBody = true;
	}
	
	var topWall2 = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) topWall2.push(this.game.add.sprite(1550, 0, 'ast2'));
		else topWall2.push(this.game.add.sprite(topWall2[i - 1].x - 50, topWall2[i - 1].y + 50, 'ast2'));
		topWall2[i].anchor.set(0.5);
		topWall2[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall2[i]);
		topWall2[i].body.static = true;
		topWall2[i].enableBody = true;
	}
	var topWall3 = new Array();
	for(var i = 0; i < 10; i++){
		if(i == 0) topWall3.push(this.game.add.sprite(2000, 200, 'ast2'));
		else topWall3.push(this.game.add.sprite(topWall3[i - 1].x - 50, topWall3[i - 1].y + 50, 'ast2'));
		topWall3[i].anchor.set(0.5);
		topWall3[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall3[i]);
		topWall3[i].body.static = true;
		topWall3[i].enableBody = true;
	}
	var topWall4 = new Array();
	for(var i = 0; i < 10; i++){
		if(i == 0) topWall4.push(this.game.add.sprite(2000, 800, 'ast2'));
		else topWall4.push(this.game.add.sprite(topWall4[i - 1].x - 50, topWall4[i - 1].y + 50, 'ast2'));
		topWall4[i].anchor.set(0.5);
		topWall4[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall4[i]);
		topWall4[i].body.static = true;
		topWall4[i].enableBody = true;
	}
	var topWall5 = new Array();
	for(var i = 0; i < 9; i++){
		if(i == 0) topWall5.push(this.game.add.sprite(1900, 550, 'ast2'));
		else topWall5.push(this.game.add.sprite(topWall5[i - 1].x - 50, topWall5[i - 1].y + 50, 'ast2'));
		topWall5[i].anchor.set(0.5);
		topWall5[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall5[i]);
		topWall5[i].body.static = true;
		topWall5[i].enableBody = true;
	}
	//working on this
	var topWall6 = new Array();
	for(var i = 0; i < 9; i++){
		if(i == 0) topWall6.push(this.game.add.sprite(1350, 1400, 'ast2'));
		else topWall6.push(this.game.add.sprite(topWall6[i - 1].x + 50, topWall6[i - 1].y + 50, 'ast2'));
		topWall6[i].anchor.set(0.5);
		topWall6[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall6[i]);
		topWall6[i].body.static = true;
		topWall6[i].enableBody = true;
	}
	var topWall7 = new Array();
	for(var i = 0; i < 9; i++){
		if(i == 0) topWall7.push(this.game.add.sprite(1250, 1600, 'ast2'));
		else topWall7.push(this.game.add.sprite(topWall7[i - 1].x + 50, topWall7[i - 1].y + 50, 'ast2'));
		topWall7[i].anchor.set(0.5);
		topWall7[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall7[i]);
		topWall7[i].body.static = true;
		topWall7[i].enableBody = true;
	}
	var topWall8 = new Array();
	for(var i = 0; i < 4; i++){
		if(i == 0) topWall8.push(this.game.add.sprite(1100, 1700, 'ast2'));
		else topWall8.push(this.game.add.sprite(topWall8[i - 1].x + 50, topWall8[i - 1].y + 50, 'ast2'));
		topWall8[i].anchor.set(0.5);
		topWall8[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall8[i]);
		topWall8[i].body.static = true;
		topWall8[i].enableBody = true;
	}
	var topWall9 = new Array();
	for(var i = 0; i < 4; i++){
		if(i == 0) topWall9.push(this.game.add.sprite(1100, 1500, 'ast2'));
		else topWall9.push(this.game.add.sprite(topWall9[i - 1].x, topWall9[i - 1].y + 50, 'ast2'));
		topWall9[i].anchor.set(0.5);
		topWall9[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(topWall9[i]);
		topWall9[i].body.static = true;
		topWall9[i].enableBody = true;
	}
	var startBarrier = new Array();
	for(var i = 0; i < 11; i++){
		if(i == 0) startBarrier.push(this.game.add.sprite(650, 500, 'ast1'));
		else startBarrier.push(this.game.add.sprite(startBarrier[i - 1].x - 50, startBarrier[i - 1].y - 50, 'ast1'));
		startBarrier[i].anchor.set(0.5);
		startBarrier[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(startBarrier[i]);
		startBarrier[i].body.static = true;
		startBarrier[i].enableBody = true;
	}
	var startBarrier2 = new Array();
	for(var i = 0; i < 11; i++){
		if(i == 0) startBarrier2.push(this.game.add.sprite(550, 700, 'ast1'));
		else startBarrier2.push(this.game.add.sprite(startBarrier2[i - 1].x - 50, startBarrier2[i - 1].y - 50, 'ast1'));
		startBarrier2[i].anchor.set(0.5);
		startBarrier2[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(startBarrier2[i]);
		startBarrier2[i].body.static = true;
		startBarrier2[i].enableBody = true;
	}
	
	var bottomBarrier = new Array();
	for(var i = 0; i < 10; i++){
		if(i == 0) bottomBarrier.push(this.game.add.sprite(planet.x-100, 1975, 'ast1'));
		else bottomBarrier.push(this.game.add.sprite(bottomBarrier[i - 1].x, bottomBarrier[i - 1].y - 50, 'ast1'));
		bottomBarrier[i].anchor.set(0.5);
		bottomBarrier[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(bottomBarrier[i]);
		bottomBarrier[i].body.static = true;
		bottomBarrier[i].enableBody = true;
	}
	
	//up to the right
	var sideWall = new Array();
	for(var i = 0; i < 10; i++){
		if(i == 0) sideWall.push(this.game.add.sprite(1300, 600, 'ast2'));
		else sideWall.push(this.game.add.sprite(sideWall[i-1].x + 50, sideWall[i - 1].y - 50, 'ast2'));
		sideWall[i].anchor.set(0.5);
		sideWall[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(sideWall[i]);
		sideWall[i].body.static = true;
		sideWall[i].enableBody = true;
	}

	// Moving box
	this.tiltBox = this.game.add.sprite(400, 400, 'ast2');
	this.tiltBox.anchor.set(0.5);
	this.tiltBox.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBox);
	this.tiltBox.enableBody = true;
	this.tiltBox.body.velocity.x = 200;
	this.tiltBox.body.kinematic = true;
	
	this.tiltBoxTwo = this.game.add.sprite(600, 200, 'ast2');
	this.tiltBoxTwo.anchor.set(0.5);
	this.tiltBoxTwo.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBoxTwo);
	this.tiltBoxTwo.enableBody = true;
	this.tiltBoxTwo.body.velocity.x = -170;
	this.tiltBoxTwo.body.kinematic = true;
	
	this.tiltBox3 = this.game.add.sprite(900, 1700, 'ast2');
	this.tiltBox3.anchor.set(0.5);
	this.tiltBox3.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBox3);
	this.tiltBox3.enableBody = true;
	this.tiltBox3.body.velocity.x = 150;
	this.tiltBox3.body.kinematic = true;
	
	this.tiltBox4 = this.game.add.sprite(1400, 400, 'ast2');
	this.tiltBox4.anchor.set(0.5);
	this.tiltBox.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBox4);
	this.tiltBox4.enableBody = true;
	this.tiltBox4.body.velocity.x = 150;
	this.tiltBox4.body.kinematic = true;
	
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
	for(var i = 0; i < startBarrier.length; i++){
		startBarrier[i].body.setCollisionGroup(obstacleCollisionGroup);
		startBarrier[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < startBarrier2.length; i++){
		startBarrier2[i].body.setCollisionGroup(obstacleCollisionGroup);
		startBarrier2[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < bottomBarrier.length; i++){
		bottomBarrier[i].body.setCollisionGroup(obstacleCollisionGroup);
		bottomBarrier[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}

	for(var i = 0; i < topWall.length; i++){
		topWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall2.length; i++){
		topWall2[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall2[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall4.length; i++){
		topWall4[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall4[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall3.length; i++){
		topWall3[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall3[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall4.length; i++){
		topWall4[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall4[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall5.length; i++){
		topWall5[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall5[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall6.length; i++){
		topWall6[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall6[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall7.length; i++){
		topWall7[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall7[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall8.length; i++){
		topWall8[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall8[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	for(var i = 0; i < topWall9.length; i++){
		topWall9[i].body.setCollisionGroup(obstacleCollisionGroup);
		topWall9[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}

	for(var i = 0; i < sideWall.length; i++){
		sideWall[i].body.setCollisionGroup(obstacleCollisionGroup);
		sideWall[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	
	this.tiltBox.body.setCollisionGroup(obstacleCollisionGroup);
	this.tiltBoxTwo.body.setCollisionGroup(obstacleCollisionGroup);
	this.tiltBox3.body.setCollisionGroup(obstacleCollisionGroup);
	this.tiltBox4.body.setCollisionGroup(obstacleCollisionGroup);
	// Object collisions
	planet.body.collides([planetCollisionGroup,landerCollisionGroup]);
	platform.body.collides([platformCollisionGroup,landerCollisionGroup]);
	this.tiltBox.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	this.tiltBoxTwo.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	this.tiltBox3.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	
	
	this.lander.body.collides(platformCollisionGroup,this.landerHit,this);
	this.lander.body.collides(obstacleCollisionGroup,this.landerCol,this);
	this.lander.body.collides(planetCollisionGroup,this.landerCol,this);
	
	
	//sets camera to follow lander sprite
		this.game.camera.follow(this.lander);
	
		// Arrow keys
		this.cursors = this.game.input.keyboard.createCursorKeys();
	
		////Functioning Code for HUD, use with Update HUD Functions
    	var level = "Earth";
		var Veloc = (this.lander.body.velocity.x + this.lander.body.velocity.y);
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

// Calls reverseVel for every obstacle that needs to move at the same time
flipVel: function(obj1){
	this.reverseVel(this.tiltBox);
	this.reverseVel(this.tiltBoxTwo);
	this.reverseVel(this.tiltBox3);
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
	this.game.state.start('about');
},


restartLevel: function() {
	this.music.stop();
	this.game.state.start('earth');
	},

render: function() {
	this.game.debug.bodyInfo(this.lander,32,32);
}

}
