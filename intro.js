// Introduction cutscene for the first level
// intro.js
//

var intro = function(game){};
intro.prototype = {
	
	
	preload: function(){
		
		this.game.load.image('oldRocket', 'assets/CutsceneArt/oldRocket.png');
		this.game.load.image('bootprint', 'assets/CutsceneArt/bootprint.png');
		this.game.load.image('earthrise', 'assets/CutsceneArt/earthrise.png');
		this.game.load.image('rocketlaunch', 'assets/CutsceneArt/rocketlaunch.png');
		
		this.game.load.audio('clairdelune', 'assets/clairdelune.ogg');
	},
	
	create: function(){
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.world.setBounds(0, 0, 800, 600); 
		this.music = this.game.add.audio('clairdelune');
		this.music.play();
		this.background = this.game.add.sprite(0,0, "oldRocket");
		this.game.stage.setBackgroundColor('black');
		
		this.cutsceneArray = new Array();
		this.cutsceneArray.push('oldRocket');
		this.cutsceneArray.push('bootprint');
		this.cutsceneArray.push('earthrise');
		this.cutsceneArray.push('rocketlaunch');
		this.iterator = 1;
		
		PIXI.Text.prototype.determineFontProperties = function(fontStyle) {
			var properties = PIXI.Text.fontPropertiesCache[fontStyle];
			if(properties) {
				return properties; 
				}
				properties = {ascent: 40, descent: 10, fontSize: 60
	};

	PIXI.Text.fontPropertiesCache[fontStyle] = properties;
	return properties;
};

		this.content = [
    		" ",
   			"There was a time once",
   			"when humanity would look to the stars",
    		"in hope to touch upon the far ends of the universe ",
    		"Kern of Duty",
    		" ",
   			"directed by rich davey",
   			"rendering by mat groves",
   			"    ",
    		"03:45, November 4th, 2014",
   			 "somewhere in the north pacific",
    		"mission control bravo ...",
		];

		this.index = 0;
		this.line = '';
		
		this.text = this.game.add.text(32, 380, '', { font: "40pt Jura", fill: 'white', stroke: 'black', strokeThickness: 2});
		
		timer = this.game.time.create(false);
		timer.loop(Phaser.Timer.SECOND * 5.00, this.nextImage,this);
		timer.start();
		
    	this.nextLine();
		
	},
	
	
	updateLine: function() {

    	if (this.line.length < this.content[this.index].length)
    	{
        	this.line = this.content[this.index].substr(0, this.line.length + 1);
        	// text.text = line;
        	this.text.setText(this.line);
    	}
    	else
    	{
       		//  Wait 2 seconds then start a new line
        	this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
    	}

	},

	nextLine : function() {

    	this.index++;

    	if (this.index < this.content.length)
    	{
        	this.line = '';
        	this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
    	}

	},
	
	nextImage : function(){
		if (this.iterator < 4){
			this.background.loadTexture(this.cutsceneArray[this.iterator]);
			this.iterator++;
		}
		else {
			this.music.stop();
			this.game.state.start('mars');
		}
		
		
	}
}
