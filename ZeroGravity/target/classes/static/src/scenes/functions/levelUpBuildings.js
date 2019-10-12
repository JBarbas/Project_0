function askPlayerResources(){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking player's resources");
	}
	
	let message = {
			
			event: 'ASK_PLAYER_RESOURCES'
	}
	
	game.global.socket.send(JSON.stringify(message));
}

function askLevelUpBuilding(edificioId){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] ask server level up a building");
	}
	
	let message = {
			
			event: 'LEVELUP_BUILDING',
			id: edificioId
	}
	
	game.global.socket.send(JSON.stringify(message));
	askPlayerResources();	
}

function levelUp(edificio){
	edificio.level += 1;
	edificio.gameObject.setFrame(edificio.level -1);
}