class AnuncioMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "AnuncioMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **ANUNCIOS** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	this.panelAnuncio = this.add.image(560, 300, 'panelAnuncio').setOrigin(0, 0);
    	
    	var btnX = this.add.image(1570, 340, 'xAnuncio').setInteractive();
    	var btnAnuncio = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y, 'btnAnuncio').setInteractive();
    	var cort = this.cortina;
    	var panelA = this.panelAnuncio;
    	
    	
    	cort.alpha = 0.4;
    	panelA.scale = 0.7;
    	btnX.scale = 0.7;
    	
    	
    	btnAnuncio.on('pointerover',function(pointer){
    		btnAnuncio.setFrame(1);
    	})
    	
    	btnAnuncio.on('pointerout',function(pointer){
    		btnAnuncio.setFrame(0);
    	})
    	
    	btnX.on('pointerdown', function(pointer){
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('AnuncioMenu');
    	});
    	
    }
    update(time, delta) {
    	
    }

}