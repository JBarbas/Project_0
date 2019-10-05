class PreloadScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "PreloadScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD** scene");
		}
	}
	
	preload () {
		// Backgrounds
		this.load.image('backgroundLoadGame', 'assets/background/loadGame.png');
		this.load.image('backgroundLogIn', 'assets/background/InicioSesionV.1.png');
		this.load.image('backgroundRegister', 'assets/background/Registrar.png');
		this.load.image('backgroundMenu', 'assets/background/MenuPrincipal.png');
		this.load.image('backgroundOptionsAccount', 'assets/background/OpcionesCuenta.png');
		this.load.image('backgroundCredits', 'assets/background/Creditos.png');
		this.load.image('backgroundDifficulty', 'assets/background/ElegirDificultad.png');
		
		//Elements
		this.load.image('team', 'assets/interface/team.png');
		
		//Buttons
    	this.load.image('session', 'assets/background/btnInicioSesion.png');
    	this.load.spritesheet( 'btn' , 'assets/background/btnInicioSesionSprite.png' ,{frameWidth:596,frameHeight:142});
    	this.load.spritesheet( 'btnRegister' , 'assets/interface/btnRegistrar.png' ,{frameWidth:596,frameHeight:142});
    	this.load.image('btnAmigos', 'assets/background/btnMenuAmigos.png');
		this.load.image('link', 'assets/interface/link.png');
		this.load.image('back', 'assets/interface/back.png');
		
		
		//this.load.multiatlas('title', 'assets/sprites/anim/image1.json', 'assets');
		
    }
    create (data)  {
		if (game.global.ONLY_GAME_MODE) {
			game.scene.run('PreloadGameScene');
		}
		else if (game.global.SKIP_INTRO) {
			game.scene.run('LogInScene');
		}
		else {
			game.scene.run('IntroScene');
		}
		game.scene.stop('PreloadScene');
    }
    update(time, delta) {
    	
    }
}