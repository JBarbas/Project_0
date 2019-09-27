class BootScene extends Phaser.Scene {

	constructor() {
        super({
            key: "BootScene",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **BOOT** scene");
		}
    }
    
    preload () {
    	this.load.image('Lharys', 'assets/sprites/Lharys.png');
    	this.load.image('background', 'assets/background/InicioSesionV.1.png');
    	
    	//Buttons
    	this.load.image('session', 'assets/background/btnInicioSesion.png');
    }
    create (data)  {
    	var background = this.add.image(960, 540, 'background');
    	
    	var button = this.add.image(960, 800, 'session');
    	/*var buttonHover = this.add.image(960, 800, 'sessionHover');*/
        
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('PreloadScene');
    		game.scene.stop('BootScene');
    	});
    }
    update(time, delta) {
    	
    }

}