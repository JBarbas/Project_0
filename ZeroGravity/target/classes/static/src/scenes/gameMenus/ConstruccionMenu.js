class ConstruccionMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "ConstruccionMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CONSTRUCCION** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	this.panelConstruccion = this.add.image(430, 300, 'panelConstruccion').setOrigin(0, 0);
    	
    	var btnX = this.add.image(1580, 340, 'xBuilding').setInteractive();
    	var btnConstruir = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y+60, 'btnConstruir').setInteractive();
    	var btnBuild = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y+60, 'btnBuild').setInteractive();
    	
    	var boxConstr = this.add.image(540, 420, 'boxConstr').setInteractive();
    	var cort = this.cortina;
    	var panelA = this.panelConstruccion;
    	
    	
    	cort.alpha = 0.4;
    	btnX.scale = 0.7;
    	
    	panelA.scale = 1;
    	btnConstruir.scale = 0.5;
    	btnBuild.scale = 0.5;
    	
    	if(game.global.idioma == "eng"){
    		btnConstruir.setVisible(false);
    		btnBuild.setVisible(true);
    	}else{
    		btnConstruir.setVisible(true);
    		btnBuild.setVisible(false);
    	}
    	
    	btnX.on('pointerover',function(pointer){
    		btnX.setFrame(1);
    	})
    	
    	btnX.on('pointerout',function(pointer){
    		btnX.setFrame(0);
    	})
    	
    	boxConstr.on('pointerover',function(pointer){
    		boxConstr.setFrame(1);
    	})
    	
    	boxConstr.on('pointerout',function(pointer){
    		boxConstr.setFrame(0);
    	})
    	
    	btnBuild.on('pointerover',function(pointer){
    		btnBuild.setFrame(1);
    	})
    	
    	btnBuild.on('pointerout',function(pointer){
    		btnBuild.setFrame(0);
    	})
    	
    	btnConstruir.on('pointerover',function(pointer){
    		btnConstruir.setFrame(1);
    	})
    	
    	btnConstruir.on('pointerout',function(pointer){
    		btnConstruir.setFrame(0);
    	})
    	
    	
    	btnX.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('ConstruccionMenu');
    	});
    	
    }
    update(time, delta) {
    	
    }

}