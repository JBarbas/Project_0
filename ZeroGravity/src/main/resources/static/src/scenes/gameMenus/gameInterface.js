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
    	this.btnAnuncios = this.add.image(game.global.btnAnuncios.x, game.global.btnAnuncios.y, 'intAnuncios').setOrigin(0, 0); 
    	this.btnRanking = this.add.image(game.global.btnRanking.x, game.global.btnRanking.y, 'intRanking').setOrigin(0, 0); 
    	
    	var btnOpciones = this.add.image(game.global.btnOpciones.x, game.global.btnOpciones.y, 'btnOpciones').setInteractive();

    	this.energia = this.add.text(100, 50, "E: " + game.global.resources.energia, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.metal = this.add.text(300, 50, "M: " + game.global.resources.metal, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.ceramica = this.add.text(500, 50, "C: " + game.global.resources.ceramica, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.creditos = this.add.text(700, 50, "$: " + game.global.resources.creditos, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.unionCoins = this.add.text(900, 50, "U: " + game.global.resources.unionCoins, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.colonos = this.add.text(1100, 50, "Colonos: " + game.global.resources.colonos, { fontFamily: '"Roboto Condensed"', color: 'white' });
    
    	btnOpciones.on('pointerover',function(pointer){
    		btnOpciones.setFrame(1);
    	})

    	btnOpciones.on('pointerout',function(pointer){
    		btnOpciones.setFrame(0);
    	})
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