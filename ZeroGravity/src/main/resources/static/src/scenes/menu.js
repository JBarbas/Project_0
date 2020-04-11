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
    	
    	console.log(game.global.myPlayer.config.volEffects);
    	console.log(game.global.myPlayer.config.volMusic);
    	var backgroundM = this.add.image(960, 540, 'backgroundMenu');
    	
    	anyadirEfectos();
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
    	
    	function anyadirEfectos(){
    		
    		if(game.global.effects==null){
	    		game.global.effects = null;
	    		game.global.effects = game.sound.add('cambianRecursos'); // indice 4 de game.global.effects.manager.sounds
	    		game.global.effects = game.sound.add('comprar');   //5
	    		game.global.effects = game.sound.add('confirmar');   //6
	    		game.global.effects = game.sound.add('construido');  //....
	    		game.global.effects = game.sound.add('construyendo');
	    		game.global.effects = game.sound.add('denegar');
	    		game.global.effects = game.sound.add('dificultadMenu');
	    		game.global.effects = game.sound.add('mensaje');
	    		game.global.effects = game.sound.add('menuEdificios');
	    		game.global.effects = game.sound.add('pulsarBoton');
	    		game.global.effects = game.sound.add('puntuacion');
	    		game.global.effects = game.sound.add('recogerRecursos');
	    		game.global.effects = game.sound.add('recursosMaximos');
	    		game.global.effects = game.sound.add('seleccionarEdificio'); //18
	    			    		
	    		for(var i=4;i<game.global.effects.manager.sounds.length; i++){
	    			game.global.effects.manager.sounds[i].volume = game.global.myPlayer.config.volEffects/100;
	    		}
	    		game.global.sound = game.sound.play(game.global.effects.manager.sounds[17].key);
	    		console.log(game.global.effects.manager.sounds[17].config.volume);
    		}
	    		
    	}

    }
    
    update(time, delta) {
    }
}