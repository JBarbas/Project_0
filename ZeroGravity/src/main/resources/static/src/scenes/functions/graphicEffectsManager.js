function particulasRecurso(x, y){
	
	var interfaz = game.scene.getScene("GameInterface");
	
	const particulas = interfaz.add.particles('orangeSpark');
	const emitter = particulas.createEmitter();
	emitter.setSpeed(200);
	emitter.setLifespan(500);
	emitter.scale = {start: 1, end: 0};
	emitter.setBlendMode(Phaser.BlendModes.ADD);
	emitter.setPosition(x, y);
	
	interfaz.time.delayedCall(500, function() {
	    particulas.destroy();
	});
}

function particulasGameplay(caso, x, y){
	
	var interfaz = game.scene.getScene("GameInterface");
	switch(caso){
	case 'subirNivel':
	case 'construir':
		const particulas = interfaz.add.particles('blueSpark');
		break;
	case 'expandirBase':
		const particulas = interfaz.add.particles('redSpark');
		break;
	case 'xp':
		const particulas = interfaz.add.particles('greenSpark');
		break;
	case 'recolectar':
		const particulas = interfaz.add.particles('pinkSpark');
		break;
	default:
		break;
	}
	
	const emitter = particulas.createEmitter();
	emitter.setSpeed(200);
	emitter.setLifespan(500);
	emitter.scale = {start: 1, end: 0};
	emitter.setBlendMode(Phaser.BlendModes.ADD);
	emitter.setPosition(x, y);
	
	interfaz.time.delayedCall(500, function() {
		particulas.destroy();
	});
}

