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
		this.load.image('backgroundLogIn', 'assets/background/InicioSesionV.1.png');
		this.load.image('backgroundMenu', 'assets/background/MenuPrincipal.png');
		
		//Buttons
    	this.load.image('session', 'assets/background/btnInicioSesion.png');
    	this.load.spritesheet( 'btn' , 'assets/background/btnInicioSesionSprite.png' ,{frameWidth:596,frameHeight:142});
		this.load.image('btnAmigos', 'assets/background/btnMenuAmigos.png');
		
		
		this.load.multiatlas('title', 'assets/sprites/anim/image1.json', 'assets');
		
    }
    create (data)  {
		game.scene.run('LogInScene');
		game.scene.stop('PreloadScene');
    }
    update(time, delta) {
    	
    }
}