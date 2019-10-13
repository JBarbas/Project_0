class GameInterface extends Phaser.Scene {

	constructor() {
        super({
            key: 'GameInterface',
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Opening **GAME INTERFACE** scene");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	this.intPrincipal = this.add.image(game.global.intPrincipal.x, game.global.intPrincipal.y, 'intPrincipal').setOrigin(0, 0); 
    	this.btnMision = this.add.image(game.global.btnMision.x, game.global.btnMision.y, 'intMision').setOrigin(0, 0); 
    	
    	this.btnRanking = this.add.image(game.global.btnRanking.x, game.global.btnRanking.y, 'intRanking').setOrigin(0, 0); 
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	this.panelAnuncio = this.add.image(560, 300, 'panelAnuncio').setOrigin(0, 0);
    	
    	var btnX = this.add.image(1570, 340, 'xAnuncio').setInteractive();
    	var btnOpciones = this.add.image(game.global.btnOpciones.x, game.global.btnOpciones.y, 'btnOpciones').setInteractive();
    	var btnAnuncio = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y, 'btnAnuncio').setInteractive();
    	var btnAnuncios = this.add.image(game.global.btnAnuncios.x, game.global.btnAnuncios.y, 'intAnuncios').setOrigin(0, 0); 
    	btnAnuncios.setInteractive();
    	
    	this.energia = this.add.text(100, 50, "E: " + game.global.resources.energia, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.metal = this.add.text(300, 50, "M: " + game.global.resources.metal, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.ceramica = this.add.text(500, 50, "C: " + game.global.resources.ceramica, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.creditos = this.add.text(700, 50, "$: " + game.global.resources.creditos, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.unionCoins = this.add.text(900, 50, "U: " + game.global.resources.unionCoins, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.colonos = this.add.text(1100, 50, "Colonos: " + game.global.resources.colonos, { fontFamily: '"Roboto Condensed"', color: 'white' });
    
    	var cort = this.cortina;
    	var panelA = this.panelAnuncio;
    	
    	
    	
    	cort.alpha = 0.0;
    	panelA.alpha = 0.0;
    	btnAnuncio.alpha = 0.0;
    	panelA.scale = 0.7;
    	btnX.alpha = 0.0;
    	btnX.scale = 0.7;
    	
    	btnOpciones.on('pointerover',function(pointer){
    		btnOpciones.setFrame(1);
    	})

    	btnOpciones.on('pointerout',function(pointer){
    		btnOpciones.setFrame(0);
    	})
    	
    	btnAnuncio.on('pointerover',function(pointer){
    		btnAnuncio.setFrame(1);
    	})
    	
    	btnAnuncio.on('pointerout',function(pointer){
    		btnAnuncio.setFrame(0);
    	})
    	
    	btnAnuncios.on('pointerdown', function(pointer){
    		cort.alpha = 0.4;
        	panelA.alpha = 1.0;
        	btnAnuncio.alpha = 1.0;
        	btnX.alpha = 1.0;
    	});
    	
    	btnX.on('pointerdown', function(pointer){
    		cort.alpha = 0.0;
        	panelA.alpha = 0.0;
        	btnAnuncio.alpha = 0.0;
        	this.alpha = 0.0;
    	});
    	
    	btnOpciones.on('pointerdown', function(pointer){
    		console.log("HOLAAAAA");
    		
    	});
    }
    update(time, delta) {
    	this.energia.text = "E: " + game.global.resources.energia;
    	this.metal.text = "M: " + game.global.resources.metal;
    	this.ceramica.text = "C: " + game.global.resources.ceramica;
    	this.creditos.text = "$: " + game.global.resources.creditos;
    	this.unionCoins.text = "U: " + game.global.resources.unionCoins;
    	this.colonos.text = "Colonos: " + game.global.resources.colonos;
    }

}