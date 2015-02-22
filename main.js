var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });
var text;
var titletext;

function create() {
	game.stage.setBackgroundColor(255);
    text = game.add.txext(game.world.centerX, 150, 'Touchdown Adventures \n             of the Philae Lander');
    text.anchor.set(0.5);
    text.align = 'center';
    text.font = 'Arial';
    text.fontSize = 40;
    text.fontWeight = 'bold';
    text.fill = 'gold';
    text.setShadow(0, 0, 'rgba(0, 0, 0, 0.4)', 0);	

	titletext = game.add.text(game.world.centerX, 500, 'New Game \n Load Game \n Options');
	titletext.anchor.set(0.5);
	titletext.align = 'center';
	titletext.font = 'Arial Black';
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