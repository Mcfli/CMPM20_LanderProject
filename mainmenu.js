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
    
    
    button = this.game.add.button(this.game.world.centerX, 500, 'blankButton', this.startnewgame, this);
    button.anchor.set(0.5);
    
    
    this.text.font = 'BANGERS';
    this.text.fontSize = 40;
    this.text.fontWeight = 'bold';
    this.text.fill = 'gold';
    this.text.setShadow(0, 0, 'rgba(0, 0, 0, 0.4)', 0);	

	this.titletext = 'Orbitron';
	this.titletext = this.game.add.text(this.game.world.centerX, 500, 'New Game');
	this.titletext.anchor.set(0.5);
	this.titletext.align = 'center';
	this.titletext.fontSize = 20;
	this.titletext.fill = 'white';
	
	button.onInputOver.add(this.over, this);
    button.onInputOut.add(this.out, this);
	
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

over: function() {
    this.titletext.fill = 'gold';
},

out: function() {
    this.titletext.fill = 'white';
}
}