function askServer(){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking player's resources");
	}
	
	let message = {
			
			event: 'ASK_PLAYER_RESOURCES'
	}
	
	game.global.socket.send(JSON.stringify(message));
}