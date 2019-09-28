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
    	
    	//var textT = this.add.bitmapText(200, 50, 'myfont', 'Holaaaaaaaaaa', 128); 
    	
    	
    	//TODO  HAY QUE ARREGLAR ESTO PORQUE NO FUNCIONA VENGA CHAO
    	var title = this.add.sprite(200, 200, 'title', 'background.png');
    	
    	var jugar = this.add.text(80, 400, 'JUGAR', { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
    	var opciones = this.add.text(80, 500, 'OPCIONES', { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
    	var creditos = this.add.text(80, 600, 'CRÉDITOS', { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });

    	var size = '50px';
    	
    	var colorYellow = '#ffd213';
    	var colorWhite = '#fff';
    	
    	jugar.setFontSize(size);
    	opciones.setFontSize(size);
    	creditos.setFontSize(size);
    	
    	
    	
    	jugar.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('PreloadGameScene');
    		game.scene.stop('MenuScene');
    	});
    	jugar.setInteractive().on('pointerover', function(pointer, localX, localY, event){
    		jugar.setFill(colorYellow);
    	});
    	jugar.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    		jugar.setFill(colorWhite);
    	});
    	
    	opciones.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('PreloadGameScene');
    		game.scene.stop('MenuScene');
    	});
    	opciones.setInteractive().on('pointerover', function(pointer, localX, localY, event){
    		opciones.setFill(colorYellow);
    	});
    	opciones.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    		opciones.setFill(colorWhite);
    	});
    	
    	creditos.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('PreloadGameScene');
    		game.scene.stop('MenuScene');
    	});
    	creditos.setInteractive().on('pointerover', function(pointer, localX, localY, event){
    		creditos.setFill(colorYellow);
    	});
    	creditos.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    		creditos.setFill(colorWhite);
    	});
    	
    	

    }
    update(time, delta) {
    	
    }
}