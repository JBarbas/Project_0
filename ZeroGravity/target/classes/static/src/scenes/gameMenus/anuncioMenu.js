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
    	var panelA;
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	var panelAnuncio = this.add.image(560, 300, 'panelAnuncio').setOrigin(0, 0);
    	var panelAds = this.add.image(560, 300, 'panelAnuncioEng').setOrigin(0, 0);
    	
    	var btnX = this.add.image(1570, 340, 'xAnuncio').setInteractive();
    	var btnAnuncio = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y, 'btnAnuncio').setInteractive();
    	var btnAds = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y, 'btnSee').setInteractive();
    	var cort = this.cortina;
    	
    	if(game.global.idioma === "eng"){
    		panelAnuncio.setVisible(false);
    		panelAds.setVisible(true);
    		panelAds.scale = 0.7;
    		btnAnuncio.setVisible(false);
    		btnAds.setVisible(true);
    	}else{
    		panelAnuncio.setVisible(true);
    		panelAnuncio.scale = 0.7;
    		panelAds.setVisible(false);
    		btnAnuncio.setVisible(true);
    		btnAds.setVisible(false);
    	}
    	
    	
    	cort.alpha = 0.4;
    	btnX.scale = 0.7;
    	
    	
    	btnAnuncio.on('pointerover',function(pointer){
    		btnAnuncio.setFrame(1);
    	})
    	
    	btnAnuncio.on('pointerout',function(pointer){
    		btnAnuncio.setFrame(0);
    	})
    	
    	btnAnuncio.on('pointerdown',function(pointer){
    		game.global.sound = game.sound.play('pulsarBoton');
    	})
    	
    	btnAds.on('pointerover',function(pointer){
    		btnAds.setFrame(1);
    	})
    	
    	btnAds.on('pointerout',function(pointer){
    		btnAds.setFrame(0);
    	})
    	
    	btnAds.on('pointerdown',function(pointer){
    		game.global.sound = game.sound.play('pulsarBoton');
    	})
    	
    	btnX.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnX.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})
    	
    	btnX.on('pointerdown', function(pointer){
    		game.global.sound = game.sound.play('pulsarBoton');
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('AnuncioMenu');
    	});
    	
    }
    update(time, delta) {
    	
    }

}