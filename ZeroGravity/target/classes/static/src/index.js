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
				  		LoadGameScene,
				  		LogInScene,
				  		RegisterScene,
				  		MenuScene,
				  		DifficultScene,
				  		OptionsScene,
				  		CreditsScene,
				  		PreloadGameScene,
				  		GameScene,
				  		CentroMandoMenu]

			};
			
	
	game = new Phaser.Game(config);
	
	// GLOBAL VARIABLES
	game.global = {
		FPS : 30,
		DEBUG_MODE : true,
		socket : null,
		loaded : false,
		myPlayer : new Object(),
		construyendo : false,
		inMenu : false,
		buildingMenu: {
			x: 50,
			y: 50,
			width: 584,
			height: 908
		},
		myPlayer : new Object()
	}
	
	//WEBSOCKET CONFIGURATOR
	game.global.socket = new WebSocket("ws://localhost:8080/polaris")
	
	game.global.socket.onopen = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection opened.')
		}
	}
	
	game.global.socket.onclose = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection closed.')
		}
	}
	
	game.global.socket.onmessage = (message) => {
		var msg = JSON.parse(message.data)
		
		switch(msg.event){
		case 'LOGGED':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] LOGGED message recieved')
				console.dir(msg);
			}
			if (game.scene.isActive('LogInScene')) {
				game.scene.run('MenuScene');
	    		game.scene.stop('LogInScene');
			}
			break;
		case 'PLAYER INFO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] PLAYER INFO message recieved')
				console.dir(msg);
			}
			game.global.grid = new Array();
			for (var i = 0; i < msg.grid.length; i++) {
				game.global.grid.push(new Array());
				for (var j = 0; j < msg.grid[i].length; j++) {
					game.global.grid[i].push({type: msg.grid[i][j]});
				}
			}
			game.global.loaded = true;
			break;
		default:
			break;
		
		}
	}

}
