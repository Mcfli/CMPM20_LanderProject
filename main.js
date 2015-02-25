var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });
var backgroundTest;

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['BANGERS','Orbitron']
    }
};
function preload(){
	//  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

var text = null;
var titletext = null;
var grd;

function create() {
//Centers the canvas	
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically = true;
	this.game.scale.refresh();

	game.stage.setBackgroundColor('0x2d2d2d');
	text = game.add.text(game.world.centerX, 100, "Touchdown Adventures of \n          the Philae Lander");
    text.anchor.set(0.5);
    
    text.font = 'BANGERS';
    text.fontSize = 40;
    text.fontWeight = 'bold';
    text.fill = 'gold';
    text.setShadow(0, 0, 'rgba(0, 0, 0, 0.4)', 0);	

	titletext = 'Orbitron';
	titletext = game.add.text(game.world.centerX, 500, 'New Game \n Load Game \n Options');
	titletext.anchor.set(0.5);
	titletext.align = 'center';
	titletext.fontSize = 20;
	titletext.fill = 'white';
}


function update() {
	var offset = moveToXY(game.input.activePointer, text.x, text.y, 8);
    text.setShadow(offset.x, offset.y, 'rgba(0, 0, 0, 0.5)', distanceToPointer(text, game.input.activePointer) / 30);
}


function distanceToPointer(displayObject, pointer) {
    this._dx = displayObject.x - pointer.x;
    this._dy = displayObject.y - pointer.y;
    return Math.sqrt(this._dx * this._dx + this._dy * this._dy);
}

function moveToXY(displayObject, x, y, speed) {
    var _angle = Math.atan2(y - displayObject.y, x - displayObject.x);    
    var x = Math.cos(_angle) * speed;
    var y = Math.sin(_angle) * speed;
    return { x: x, y: y };
}