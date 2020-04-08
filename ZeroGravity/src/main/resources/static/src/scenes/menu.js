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
    	var music = game.global.music;
    	game.global.music.setVolume(0);
    	
    	var backgroundM = this.add.image(960, 540, 'backgroundMenu');
    	
    	
    	//var textT = this.add.bitmapText(200, 50, 'myfont', 'Holaaaaaaaaaa', 128); 
    	
    	var element = this.add.dom(0, 0).createFromCache('menuform');

        element.setPerspective(800);
    	
    	var jugar = document.getElementById("jugartxt")
        var boxe = element.node.children[1];
        boxe.children[0].children[0].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('jugar')[0].childNodes[0].nodeValue;
        boxe.children[0].children[0].dataset.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('jugar')[0].childNodes[0].nodeValue;
    	var opciones = document.getElementById("opcionestxt");
        boxe.children[1].children[0].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('opciones')[0].childNodes[0].nodeValue;
        boxe.children[1].children[0].dataset.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('opciones')[0].childNodes[0].nodeValue;
    	var creditos = document.getElementById("creditostxt");
        boxe.children[2].children[0].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('creditos')[0].childNodes[0].nodeValue;
        boxe.children[2].children[0].dataset.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('creditos')[0].childNodes[0].nodeValue;

    	var size = '50px';
    	
    	var colorYellow = '#ffd213';
    	var colorWhite = '#fff';
    	
    	this.anims.create({ key: 'everything', frames: this.anims.generateFrameNames('title'), repeat: -1 });
    	this.add.sprite(game.config.width/2, 200, 'title').play('everything').setOrigin(0.5,0.5).setScale(1.2);    	
    	var version = this.add.text(400, 1028, 'VERSION 1.0.0', { fontFamily: '"Roboto"', fontSize: 25 });
    	version.style.fontSize = '80px';
    	
    	var anim = document.getElementById("animacion");
    	anim.style.visibility = "visible";
    	jugar.style.visibility = "visible";
    	opciones.style.visibility = "visible";
    	creditos.style.visibility = "visible";
    	
    	jugar.addEventListener("click", function(){
    		game.global.sound = game.sound.play('pulsarBoton');
    		
    		anim.style.visibility = "hidden";
    		jugar.style.visibility = "hidden";
        	opciones.style.visibility = "hidden";
        	creditos.style.visibility = "hidden";
    		if (game.global.myPlayer.gameStarted) {
    			game.scene.run('PreloadGameScene');
    		}
    		else {
    			game.scene.run('DifficultScene');
    		}
    		game.scene.stop('MenuScene');
    	});
    	
    	opciones.addEventListener("click", function(){
    		game.global.sound = game.sound.play('pulsarBoton');
    		anim.style.visibility = "hidden";
    		jugar.style.visibility = "hidden";
        	opciones.style.visibility = "hidden";
        	creditos.style.visibility = "hidden";
    		game.scene.run('OptionsScene');
    		game.scene.stop('MenuScene');
    	});
    	
    	
    	creditos.addEventListener("click", function(){
    		game.global.sound = game.sound.play('pulsarBoton');
    		anim.style.visibility = "hidden";
    		jugar.style.visibility = "hidden";
        	opciones.style.visibility = "hidden";
        	creditos.style.visibility = "hidden";
    		game.scene.run('CreditsScene');
    		game.scene.stop('MenuScene');
    	});

    }
    
    update(time, delta) {
    }
}