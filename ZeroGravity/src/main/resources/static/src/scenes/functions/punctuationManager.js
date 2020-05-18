function pedirPuntuaciones(){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking the server for the player's punctuation");
	}
	
	let message = {
			
			event: 'GIVE ME PUNCTUATIONS'
	}
	game.global.socket.send(JSON.stringify(message));
}

function pedirPuntuacionesAmigos(){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking the server for the player's punctuation");
	}
	
	let message = {
			
			event: 'GIVE ME FRIEND PUNCTUATIONS'
	}
	game.global.socket.send(JSON.stringify(message));
}
