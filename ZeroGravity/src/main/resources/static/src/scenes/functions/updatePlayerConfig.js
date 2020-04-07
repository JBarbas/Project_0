function updatePlayerConfig() {
	
	let msg = new Object();
	msg.event = 'UPDATE CONFIG';
	msg.volMusic = game.global.myPlayer.config.volMusic;
	msg.volEffects = game.global.myPlayer.config.volEffects;
	msg.lang = game.global.idioma;
	game.global.socket.send(JSON.stringify(msg));
	
	console.log("update config", msg);
	
}