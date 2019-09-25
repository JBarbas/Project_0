window.onload = function() {
	
	config = {
			  type: Phaser.AUTO,
			  scale: {
			        mode: Phaser.Scale.FIT,
			        parent: 'phaser-example',
			        autoCenter: Phaser.Scale.CENTER_BOTH,
			        width: 1920,
			        height: 1080			        
			  },
			  backgroundColor: "#222222",
			  scene: [	
				  		BootScene,
				  		PreloadScene,
				  		GameScene]
			};
	
	game = new Phaser.Game(config);
	
	// GLOBAL VARIABLES
	game.global = {
		FPS : 30,
		DEBUG_MODE : true,
		socket : null,
		loaded : false,
		myPlayer : new Object()
	}

}
