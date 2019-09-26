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
		
		case 'TEST':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] TEST message recieved')
				console.dir(msg);
			}
			break
		default:
			break;
		
		}
	}

}
