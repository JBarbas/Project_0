window.onload = function() {
	
	config = {
			  type: Phaser.AUTO,
			  width: 800,
			  height: 600,
			  backgroundColor: "#222222",
			  parent: "game-container",
			  scene: [	
				  		BootScene,
				  		PreloadScene]
			};

	game = new Phaser.Game(config);
	
	// GLOBAL VARIABLES
	game.global = {
		FPS : 30,
		DEBUG_MODE : false,
		socket : null,
		loaded : false,
		myPlayer : new Object()
	}

}
