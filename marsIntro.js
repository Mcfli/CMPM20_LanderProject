var marsIntro = function(game){};
marsIntro.prototype = {
	
	
	preload: function(){
		
		this.game.load.image('jupiterCutscene', 'assets/CutsceneArt/jupiterCutscene.png');
		this.game.load.image('marsCut1', 'assets/CutsceneArt/marsCut1.png');
		
		this.game.load.audio('marsSong', 'assets/mars.ogg');
	},
	
	create: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.world.setBounds(0, 0, 800, 600); 
		this.music = this.game.add.audio('marsSong');
		this.music.play();
		this.background = this.game.add.sprite(0,0, "jupiterCutscene");
		this.game.stage.setBackgroundColor('black');
		
		this.cutsceneArray = new Array();
		this.cutsceneArray.push('jupiterCutscene');
		this.cutsceneArray.push('marsCut1');
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
    		
    		"After searching\nthe area of Jupiter,",
    		"Philae found no sign\nof humanity.",

			"Moving toward the sun,",
			"Philae continued on to the\nnext likely place",
			"to discover what happened\n to humanity.",
		];

		this.index = 0;
		this.line = '';
		
		this.text = this.game.add.text(32, 380, '', { font: "40pt Jura", fill: 'white', stroke: 'black', strokeThickness: 2});
		
		timer = this.game.time.create(false);
		timer.loop(Phaser.Timer.SECOND * 20.00, this.nextImage,this);
		timer.start();
		
    	this.nextLine();
		
		this.skip = this.game.add.sprite(630,550);
		var skipText = this.game.add.text(0,0, "Press [SPACE] to skip");
		skipText.fontSize = 16;
		skipText.font = "Arial";
		skipText.stroke = '#000000';
    	skipText.strokeThickness = 6;
		skipText.fill = 'white';
		this.skip.addChild(skipText);
		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function() {
			this.music.stop();
			this.game.state.start("mars");
		}, this);
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
        	this.game.time.events.add(Phaser.Timer.SECOND * 4, this.nextLine, this);
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
		if (this.iterator < 1){
			this.background.loadTexture(this.cutsceneArray[this.iterator]);
			this.iterator++;
		}
		else {
			this.background.loadTexture(this.cutsceneArray[this.iterator]);
			this.game.time.events.add(Phaser.Timer.SECOND * 17, this.nextLevel, this);
			
		}
		
	},
	nextLevel : function(){
		this.music.stop();
		this.game.state.start('mars');
		
	}
	
}
