class MenuScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "MenuScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **MENU** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	var backgroundM = this.add.image(960, 540, 'backgroundMenu');
    	
    	var btnAmigos = this.add.image(1720, 950, 'btnAmigos');
    	btnAmigos.setScale(1.5);
    	btnAmigos.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('PreloadGameScene');
    		game.scene.stop('MenuScene');
    	});
    }
    update(time, delta) {
    	
    }
}