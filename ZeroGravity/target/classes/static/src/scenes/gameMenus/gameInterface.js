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
    	
    	var btnRanking = this.add.image(game.global.btnRanking.x, game.global.btnRanking.y, 'intRanking').setOrigin(0, 0); 
    	
    	var btnOpciones = this.add.image(game.global.btnOpciones.x, game.global.btnOpciones.y, 'btnOpciones').setInteractive();

    	this.energia = this.add.text(420, 22, game.global.resources.energia, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '18px'});
    	this.metal = this.add.text(588, 22, game.global.resources.metal, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	this.ceramica = this.add.text(755, 22, game.global.resources.ceramica, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	this.creditos = this.add.text(248, 22, game.global.resources.creditos, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	this.unionCoins = this.add.text(80, 22, game.global.resources.unionCoins, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	this.colonos = this.add.text(1298, 22, game.global.resources.colonos, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	
    	var e1 = this.add.image(920, 15, 'starIcon').setOrigin(0, 0);
    	var e2 = this.add.image(970, 15, 'starIcon').setOrigin(0, 0);
    	var e3 = this.add.image(1020, 15, 'starIcon').setOrigin(0, 0);
    	var e4 = this.add.image(1070, 15, 'starIcon').setOrigin(0, 0);
    	var e5 = this.add.image(1120, 15, 'starIcon').setOrigin(0, 0);
    
    	
    	var btnAnuncios = this.add.image(game.global.btnAnuncios.x, game.global.btnAnuncios.y, 'intAnuncios').setOrigin(0, 0); 
    	btnAnuncios.setInteractive();
    	btnRanking.setInteractive();
    	
    	
    	btnOpciones.on('pointerover',function(pointer){
    		btnOpciones.setFrame(1);
    	})

    	btnOpciones.on('pointerout',function(pointer){
    		btnOpciones.setFrame(0);
    	})
    	
    	btnRanking.on('pointerdown', function(pointer){
    		//start scene
    		game.global.inMenu = true;
			if (game.global.menu !== null) {
				game.scene.stop(game.global.menu);
			}
			game.global.menu = 'RankingMenu';
			game.scene.run('RankingMenu');
    	});
    	
    	btnAnuncios.on('pointerdown', function(pointer){
    		//start scene
    		game.global.inMenu = true;
			if (game.global.menu !== null) {
				game.scene.stop(game.global.menu);
			}
			game.global.menu = 'AnuncioMenu';
			game.scene.run('AnuncioMenu');
    	});
    	
    	
    	
    	btnOpciones.on('pointerdown', function(pointer){
    		console.log("HOLAAAAA");
    		
    	});
    }
    update(time, delta) {
    	this.energia.text = game.global.resources.energia;
    	this.metal.text = game.global.resources.metal;
    	this.ceramica.text = game.global.resources.ceramica;
    	this.creditos.text = game.global.resources.creditos;
    	this.unionCoins.text = game.global.resources.unionCoins;
    	this.colonos.text = game.global.resources.colonos;
    }

}