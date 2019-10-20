function crearOferta(cantidad, recurso, creditos, myIdEdificio){
	
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
	message = {
			event: 'REFRESH MY MENU',
			edificioId: myIdEdificio
	}
	game.global.socket.send(JSON.stringify(message));
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

//pedir las ofertas que no son de mi jugador
function pedirOfertasNoJugador(){
	let ofertasJugador = [];
	let j = 0;
	for(var i = 0; i < game.global.offers.length; i++){
		if(game.global.offers[i].idPlayer !== game.global.myPlayerId){
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
	
	return game.global.offers;
}

function borrarOferta(id, myIdEdificio){
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking the server to delete an offer");
	}
	
	let message = {
			
			event: 'DELETE AN OFFER',
			idOferta: id
	}
	game.global.socket.send(JSON.stringify(message));
	pedirOfertas();
	message = {
			event: 'REFRESH MY MENU',
			edificioId: myIdEdificio
	}
	game.global.socket.send(JSON.stringify(message));
}

function comprarOferta(id, myEdificioId){
	
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Asking the server to buy an offer");
	}
	
	let message = {
			
			event: 'BUY AN OFFER',
			idOferta: id
	}
	game.global.socket.send(JSON.stringify(message));
	pedirOfertas();
	message = {
			event: 'REFRESH MY MENU',
			edificioId: myEdificioId
	}
	game.global.socket.send(JSON.stringify(message));
}