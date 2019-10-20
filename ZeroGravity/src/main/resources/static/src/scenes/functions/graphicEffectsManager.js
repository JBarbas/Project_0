function particulasRecurso(caso){
	
	var interfaz = game.scene.getScene("GameInterface");
	
	const particulas = interfaz.add.particles('orangeSpark');
	const emitter = particulas.createEmitter();
	emitter.setSpeed(200);
	emitter.setLifespan(500);
	emitter.scale = {start: 1, end: 0};
	emitter.setBlendMode(Phaser.BlendModes.ADD);
	
	switch(caso){
	
	case 'unionCoins':
		emitter.setPosition(60, 40);
		break;
	case 'creditos':
		emitter.setPosition(240, 40);
		break;
	case 'energia':
		emitter.setPosition(385, 40);
		break;
	case 'metal':
		emitter.setPosition(560, 40);
		break;
	case 'ceramica':
		emitter.setPosition(728, 40);
		break;
	case 'colonos':
		emitter.setPosition(1275, 40);
		break;
	default:
		break;
	}
	
	interfaz.time.delayedCall(500, function() {
	    particulas.destroy();
	});
}

function particulasGameplay(caso){
	
	var interfaz = game.scene.getScene("GameScene");
	let particulas;
	console.log(caso);
	switch(caso){
	case 'subirNivel':
	case 'construir':
		 particulas = interfaz.add.particles('blueSpark');
		break;
	case 'expandirBase':
		particulas = interfaz.add.particles('redSpark');
		break;
	case 'xp':
		particulas = interfaz.add.particles('greenSpark');
		break;
	case 'recolectar':
		particulas = interfaz.add.particles('pinkSpark');
		break;
	default:
		break;
	}
	
	let emitter = particulas.createEmitter();
	emitter.setSpeed(200);
	emitter.setLifespan(500);
	emitter.scale = {start: 1, end: 0};
	emitter.setBlendMode(Phaser.BlendModes.ADD);
	emitter.setPosition(interfaz.game.input.activePointer.position.x, interfaz.game.input.activePointer.position.y);
	
	interfaz.time.delayedCall(500, function() {
		particulas.destroy();
	});
}

