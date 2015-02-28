// Main Menu state
// mainmenu.js
//

var mainmenu = function(game){};
mainmenu.prototype = {
	

//var text = null;
//var titletext = null;
preload: function() {
	this.game.load.image('blankButton', 'assets/blankButton.png');
    this.game.load.image('menuBack', 'assets/planet.png');
	
},
create: function() {
//Centers the canvas	
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically = true;
	this.game.scale.refresh();

	this.game.stage.setBackgroundColor('0x2d2d2d');
	this.text = this.game.add.text(this.game.world.centerX, 100, "Touchdown Adventures of \n          the Philae Lander");
    this.text.anchor.set(0.5);
    
    background = this.game.add.tileSprite(0,0,2000,2000, "menuBack");
    button = this.game.add.button(this.game.world.centerX, 500, 'blankButton', this.actionOnClick, this);
    
    
    
    this.text.font = 'BANGERS';
    this.text.fontSize = 40;
    this.text.fontWeight = 'bold';
    this.text.fill = 'gold';
    this.text.setShadow(0, 0, 'rgba(0, 0, 0, 0.4)', 0);	

	titletext = 'Orbitron';
	titletext = this.game.add.text(this.game.world.centerX, 500, 'New Game \n Load Game \n Options');
	titletext.anchor.set(0.5);
	titletext.align = 'center';
	titletext.fontSize = 20;
	titletext.fill = 'white';
},


update: function(){
	var offset = this.moveToXY(this.game.input.activePointer, this.text.x, this.text.y, 8);
    this.text.setShadow(offset.x, offset.y, 'rgba(0, 0, 0, 0.5)', this.distanceToPointer(this.text, this.game.input.activePointer) / 30);
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

actionOnClick: function(){
	game.state.start("level");

}
}