class HalloweenMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "HalloweenMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **HALLOWEEN** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	this.panelHalloween = this.add.image(560, 300, 'panelSusto').setOrigin(0, 0);
    	
    	var btnX = this.add.image(1570, 340, 'xSusto').setInteractive();
    	var btnHalloween = this.add.image(game.global.btnAnuncio.x-250, game.global.btnAnuncio.y, 'btnSusto').setInteractive();
    	var cort = this.cortina;
    	var panelA = this.panelHalloween;
    	
    	
    	cort.alpha = 0.4;
    	panelA.scale = 0.7;
    	btnX.scale = 0.7;
    	
    	btnX.on('pointerover',function(pointer){
    		btnX.setFrame(1);
    	})
    	
    	btnX.on('pointerout',function(pointer){
    		btnX.setFrame(0);
    	})
    	
    	btnHalloween.on('pointerover',function(pointer){
    		btnHalloween.setFrame(1);
    	})
    	
    	btnHalloween.on('pointerout',function(pointer){
    		btnHalloween.setFrame(0);
    	})
    	
    	btnHalloween.on('pointerdown',function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    	})
    	
    	btnX.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('HalloweenMenu');
    	});
    	
    }
    update(time, delta) {
    	
    }

}