class PreloadScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "PreloadScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD** scene");
		}
	}
	
	preload () {
		this.load.bitmapFont('myfont', 'assets/fontMap.png', 'assets/fontMap.fnt');

    	this.load.image('Lharys', 'assets/sprites/Lharys.png');
    	this.load.image('CentroMando', 'assets/sprites/Edificio.png');
		this.load.image('tile_prototipo_0', 'assets/sprites/Tiles_prototipo/tile_prototipo_0.png');
		this.load.image('tile_prototipo_-1', 'assets/sprites/Tiles_prototipo/tile_prototipo_-1.png');
		this.load.image('tile_prototipo_-2', 'assets/sprites/Tiles_prototipo/tile_prototipo_-2.png');

		this.load.image('backgroundM', 'assets/background/MenuPrincipal.png');
		this.load.image('btnAmigos', 'assets/background/btnMenuAmigos.png');
		
		
		this.load.multiatlas('title', 'assets/sprites/anim/image1.json', 'assets');
		
    }
    create (data)  {
    	
    	
    	
    	//var textT = this.add.bitmapText(200, 50, 'myfont', 'Holaaaaaaaaaa', 128); 
    	
    	var backgroundM = this.add.image(960, 540, 'backgroundM');
    	
    	
    	//TODO  HAY QUE ARREGLAR ESTO PORQUE NO FUNCIONA VENGA CHAO
    	var title = this.add.sprite(200, 200, 'title', 'background.png');
    	
    	
    	var btnAmigos = this.add.image(1720, 950, 'btnAmigos');
    	btnAmigos.setScale(1.5);
    	
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
    		game.scene.run('GameScene');
    		game.scene.stop('PreloadScene');
    	});
    	jugar.setInteractive().on('pointerover', function(pointer, localX, localY, event){
    		jugar.setFill(colorYellow);
    	});
    	jugar.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    		jugar.setFill(colorWhite);
    	});
    	
    	opciones.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('GameScene');
    		game.scene.stop('PreloadScene');
    	});
    	opciones.setInteractive().on('pointerover', function(pointer, localX, localY, event){
    		opciones.setFill(colorYellow);
    	});
    	opciones.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    		opciones.setFill(colorWhite);
    	});
    	
    	creditos.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('GameScene');
    		game.scene.stop('PreloadScene');
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