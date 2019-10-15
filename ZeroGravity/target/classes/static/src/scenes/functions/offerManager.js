function crearOferta(cantidad, recurso, creditos){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Ask the server to create an offer");
	}
	
	let message = {
			
			event: 'CREATE AN OFFER',
			cantidad: cantidad,
			recurso: recurso,
			creditos: creditos
	}
	game.global.socket.send(JSON.stringify(message));
}