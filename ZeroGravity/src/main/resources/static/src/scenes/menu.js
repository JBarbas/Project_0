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
    	
    	game.global.effects = {};
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
    	
    	//Box Validate
    	this.anims.create({ key: 'everything4', frames: this.anims.generateFrameNames('boxValidate')});
    	this.add.sprite(game.config.width/2+720, 80, 'boxValidate').play('everything4').setOrigin(0.5,0.5).setScale(0.5);    
    	
    	//Box Update
    	this.anims.create({ key: 'everything5', frames: this.anims.generateFrameNames('boxUpdates')});
    	var animUpdate = this.add.sprite(game.config.width/2+720, 380, 'boxUpdates').setOrigin(0.5,0.5).setScale(0.5);    
    	animUpdate.play('everything5');
    	
    	
    	//Texto de enviar correo validacion
 		this.time.addEvent({
 		    delay: 1000,
 		    callback: ()=>{
 		    	var textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('txtvalidate')[0].childNodes[0].nodeValue;
 		 		var validar = this.add.text(1495, 80, textoDesdeXml, { fontFamily: '"pantonBlack"', color: '#00B1E9' , fontSize: '15px', fontWeight: 'bold' ,align: 'center' });
 		    }
 		    
 		})
 		
    	var version = this.add.text(400, 1028, 'VERSION 1.0.0', { fontFamily: '"Roboto"', fontSize: 25 });
    	version.style.fontSize = '80px';
    	
    	var anim = document.getElementById("animacion");
    	anim.style.visibility = "visible";
    	jugar.style.visibility = "visible";
    	opciones.style.visibility = "visible";
    	creditos.style.visibility = "visible";
    	
    	jugar.addEventListener("click", function(){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		
    		
    		
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
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		anim.style.visibility = "hidden";
    		jugar.style.visibility = "hidden";
        	opciones.style.visibility = "hidden";
        	creditos.style.visibility = "hidden";
    		game.scene.run('OptionsScene');
    		game.scene.stop('MenuScene');
    	});
    	
    	
    	creditos.addEventListener("click", function(){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		anim.style.visibility = "hidden";
    		jugar.style.visibility = "hidden";
        	opciones.style.visibility = "hidden";
        	creditos.style.visibility = "hidden";
    		game.scene.run('CreditsScene');
    		game.scene.stop('MenuScene');
    	});
    	
    	function anyadirEfectos(){
    		
    		game.global.effects.cambianRecursos = game.sound.add('cambianRecursos'); // indice 4 de game.global.effects.manager.sounds
    		game.global.effects.comprar = game.sound.add('comprar');   //5
    		game.global.effects.confirmar = game.sound.add('confirmar');   //6
    		game.global.effects.construido = game.sound.add('construido');  //....
    		game.global.effects.construyendo = game.sound.add('construyendo');
    		game.global.effects.denegar = game.sound.add('denegar');
    		game.global.effects.dificultadMenu = game.sound.add('dificultadMenu');
    		game.global.effects.mensaje = game.sound.add('mensaje');
    		game.global.effects.menuEdificios = game.sound.add('menuEdificios');
    		game.global.effects.pulsarBoton = game.sound.add('pulsarBoton');
    		game.global.effects.puntuacion = game.sound.add('puntuacion');
    		game.global.effects.recogerRecursos = game.sound.add('recogerRecursos');
    		game.global.effects.recursosMaximos = game.sound.add('recursosMaximos');
    		game.global.effects.seleccionarEdificio = game.sound.add('seleccionarEdificio');
    		game.global.effects.subirNivel = game.sound.add('subirNivel');
    		//19
    		   		
	    		
    	}

    }
    
    update(time, delta) {
    }
}