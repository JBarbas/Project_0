function crearOferta(cantidad, recurso, creditos){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking the server to create an offer");
	}
	
	let message = {
			
			event: 'CREATE AN OFFER',
			cantidad: cantidad,
			recurso: recurso,
			creditos: creditos
	}
	game.global.socket.send(JSON.stringify(message));
	pedirOfertas();
}

function pedirOfertasJugador(){
	let ofertasJugador = [];
	let j = 0;
	for(var i = 0; i < game.global.offers.length; i++){
		if(game.global.offers[i].idPlayer === game.global.myPlayerId){
			ofertasJugador[j] = game.global.offers[i];
			j++;
		}
	}
	return ofertasJugador;
}

function pedirOfertas(){
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking the server for the offers");
	}
	
	let message = {
			
			event: 'GIVE ME OFFERS'
	}
	game.global.socket.send(JSON.stringify(message));
}

function borrarOferta(id){
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking the server to delete an offer");
	}
	
	let message = {
			
			event: 'DELETE AN OFFER',
			idOferta: id
	}
	game.global.socket.send(JSON.stringify(message));
	pedirOfertas();
}

function comprarOferta(id){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking the server to buy an offer");
	}
	
	let message = {
			
			event: 'BUY AN OFFER',
			idOferta: id
	}
	game.global.socket.send(JSON.stringify(message));
	pedirOfertas();
}