// Main Menu state
// mainmenu.js
//

var mainmenu = function(game){};
mainmenu.prototype = {
	


preload: function() {
	this.game.load.image('blankButton', 'assets/blankButton.png');
    this.game.load.image('menuBack', 'assets/planet.png');
    this.game.load.audio('clairdelune', 'assets/clairdelune.ogg');
},
create: function() {
//Centers the canvas	
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically = true;
	this.game.scale.refresh();
	this.game.world.setBounds(0, 0, 800, 600); 
	this.music = this.game.add.audio('clairdelune');
	this.music.play();
	background = this.game.add.tileSprite(0,0,2000,2000, "menuBack");
	
	this.game.stage.setBackgroundColor('0x2d2d2d');
	this.text = this.game.add.text(this.game.world.centerX, 100, "Touchdown Adventures of \n          the Philae Lander");
    this.text.anchor.set(0.5);
    
    
    button = this.game.add.button(this.game.world.centerX, 470, 'blankButton', this.startnewgame, this);
    button.anchor.set(0.5);
    
    selButton = this.game.add.button(this.game.world.centerX, 500, 'blankButton', this.levelSelect, this);
    selButton.anchor.set(0.5);
    
    howButton = this.game.add.button(this.game.world.centerX, 530, 'blankButton', this.howToPlay, this);
    howButton.anchor.set(0.5);
    
    aboutButton = this.game.add.button(this.game.world.centerX, 560, 'blankButton', this.about, this);
    aboutButton.anchor.set(0.5);
    
    
    this.text.font = 'BANGERS';
    this.text.fontSize = 40;
    this.text.fontWeight = 'bold';
    this.text.fill = 'gold';
    this.text.setShadow(0, 0, 'rgba(0, 0, 0, 0.4)', 0);	

	this.titletext = 'Orbitron';
	this.titletext = this.game.add.text(this.game.world.centerX, 470, 'New Game');
	this.titletext.anchor.set(0.5);
	this.titletext.align = 'center';
	this.titletext.fontSize = 20;
	this.titletext.fill = 'white';
	
	this.selText = 'Orbitron';
	this.selText = this.game.add.text(this.game.world.centerX, 500, 'Level Select');
	this.selText.anchor.set(0.5);
	this.selText.align = 'center';
	this.selText.fontSize = 20;
	this.selText.fill = 'white';
	
	this.howText = 'Orbitron';
	this.howText = this.game.add.text(this.game.world.centerX, 530, 'How to Play');
	this.howText.anchor.set(0.5);
	this.howText.fontSize = 20;
	this.howText.align = 'center';
	this.howText.fill = 'white';
	
	this.aboutText = 'Orbitron';
	this.aboutText = this.game.add.text(this.game.world.centerX, 560, 'About');
	this.aboutText.anchor.set(0.5);
	this.aboutText.fontSize = 20;
	this.aboutText.align = 'center';
	this.aboutText.fill = 'white';
	
	button.onInputOver.add(this.over, this);
    button.onInputOut.add(this.out, this);
    
    selButton.onInputOver.add(this.selOver, this);
    selButton.onInputOut.add(this.selOut, this);
    
    howButton.onInputOver.add(this.howOver, this);
    howButton.onInputOut.add(this.howOut, this);
    
	aboutButton.onInputOver.add(this.aboutOver, this);
    aboutButton.onInputOut.add(this.aboutOut, this);
},


update: function(){
	var offset = this.moveToXY(this.game.input.activePointer, this.text.x, this.text.y, 8);
    this.text.setShadow(offset.x, offset.y, 'rgba(255, 255, 255, 0.3)', this.distanceToPointer(this.text, this.game.input.activePointer) / 30);
},


distanceToPointer: function(displayObject, pointer) {
    this._dx = displayObject.x - pointer.x;
    this._dy = displayObject.y - pointer.y;
    return Math.sqrt(this._dx * this._dx + this._dy * this._dy);
},

moveToXY: function(displayObject, x, y, speed) {
    var _angle = Math.atan2(y - displayObject.y, x - displayObject.x);    
    var x = Math.cos(_angle) * speed;
    var y = Math.sin(_angle) * speed;
    return { x: x, y: y };
},

startnewgame: function(){
	this.music.stop();
	this.game.state.start("intro");
},

levelSelect: function(){
	this.music.stop();
	this.game.state.start("loadLevel");
},

howToPlay: function(){
	this.music.stop();
	this.game.state.start("controls");
},

about: function(){
	this.music.stop();
	this.game.state.start("about");
},

over: function() {
    this.titletext.fill = 'gold';
},

out: function() {
    this.titletext.fill = 'white';
},

selOver: function() {
    this.selText.fill = 'gold';
},

selOut: function() {
    this.selText.fill = 'white';
},

howOver: function() {
	this.howText.fill = 'gold';
},

howOut: function() {
	this.howText.fill = 'white';
},

aboutOver: function() {
	this.aboutText.fill = 'gold';
},

aboutOut: function() {
	this.aboutText.fill = 'white';
}
}