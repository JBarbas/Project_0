class OptionsScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "OptionsScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **OPTIONS** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	
    	// Contenedor del panel de general
    	var generalContainer = this.add.container(300, 300);
    	// Contenedor del panel de sonido
    	var soundContainer = this.add.container(300, 300);
    	// Contenedor del panel de mejoras
    	var languageContainer = this.add.container(300, 300);
    	
    	
    	var background = this.add.image(960, 540, 'backgroundOptionsAccount');
    	var backgroundEng = this.add.image(960, 540, 'backgroundOptionsAccountEng');
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	var buttonEng = this.add.image(150, 100, 'backEng').setInteractive();
    	var btnIdioma = this.add.image(1400, 250, 'btnIdioma').setInteractive();
    	var btnSonido = this.add.image(960, 250, 'btnSonido').setInteractive();
    	var btnCuenta = this.add.image(550, 250, 'btnCuenta').setInteractive();
    	
    	
    	
    	var txtCuenta = this.add.image(950, 650, 'txtCuenta');
    	var txtSonido = this.add.image(650, 650, 'txtSonido');
    	var txtIdioma = this.add.image(650, 650, 'txtIdioma');
    	var txtCount = this.add.image(950, 650, 'txtCount');
    	var txtSound = this.add.image(650, 650, 'txtSound');
    	var txtLang = this.add.image(650, 650, 'txtLang');   	
		
		//Dependiendo del idioma del usuario se cambia a un boton de back o a otro
		
		if(game.global.idioma == 'eng'){
			txtCount.setVisible(true);
			txtCuenta.setVisible(false);
			txtSonido.setVisible(false);
			txtIdioma.setVisible(false);
			txtSound.setVisible(false);
			txtLang.setVisible(false);
			buttonEng.setVisible(true);
			button.setVisible(false);
			background.setVisible(false);
		}else{
			txtCuenta.setVisible(true);
			txtCount.setVisible(false);
			txtSonido.setVisible(false);
			txtIdioma.setVisible(false);
			txtSound.setVisible(false);
			txtLang.setVisible(false);
			buttonEng.setVisible(false);
			button.setVisible(true);
			backgroundEng.setVisible(false);
		}
		
		var btnModificar = this.add.image(1650, 520, 'btnModificar').setInteractive();
    	btnModificar.setScale(.4);
    	
    	var btnModificar2 = this.add.image(1650, 820, 'btnModificar').setInteractive();
    	btnModificar2.setScale(.4);
    	
    	var btnModify = this.add.image(1650, 520, 'btnModify').setInteractive();
    	btnModify.setScale(.4);
    	
    	var btnModify2 = this.add.image(1650, 820, 'btnModify').setInteractive();
    	btnModify2.setScale(.4);
    	
		
		
    	//Default cuenta
    	btnCuenta.setFrame(1);
    	
    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	buttonEng.on('pointerover',function(pointer){
    	    buttonEng.setFrame(1);
    	})

    	buttonEng.on('pointerout',function(pointer){
    	    buttonEng.setFrame(0);
    	})
    	
    	btnCuenta.on('pointerdown',function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		btnCuenta.setFrame(1);
    		btnSonido.setFrame(0);
    		btnIdioma.setFrame(0);
    		detectarIdioma(0,game.global.idioma);
    		generalContainer.visible = true;
    		soundContainer.visible = false;
    		languageContainer.visible = false;
    		if(game.global.idioma == 'eng'){
    			btnModify.visible = true;
        		btnModify2.visible = true;
    		}else{
    			btnModificar.visible = true;
    			btnModificar2.visible = true;
    		}
    	})
    	
    	btnSonido.on('pointerdown',function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		btnCuenta.setFrame(0);
    		btnSonido.setFrame(1);
    		btnIdioma.setFrame(0);
    		detectarIdioma(1,game.global.idioma);
    		generalContainer.visible = false;
    		soundContainer.visible = true;
    		languageContainer.visible = false;
    		btnModificar.visible = false;
    		btnModificar2.visible = false;
    		btnModify.visible = false;
    		btnModify2.visible = false;
    	})
    	
    	btnIdioma.on('pointerdown',function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		btnCuenta.setFrame(0);
    		btnSonido.setFrame(0);
    		btnIdioma.setFrame(1);
    		detectarIdioma(2,game.global.idioma);
    		generalContainer.visible = false;
    		soundContainer.visible = false;
    		languageContainer.visible = true;
    		btnModificar.visible = false;
    		btnModificar2.visible = false;
    		btnModify.visible = false;
    		btnModify2.visible = false;
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		if(game.global.inGame){
    			game.scene.run('GameInterface');
    			game.scene.run('GameScene');
        		game.scene.stop('OptionsScene');
    		}
    		else{
    			game.scene.run('MenuScene');
    			game.scene.stop('OptionsScene');
    		}
    	});
    	
    	buttonEng.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		if(game.global.inGame){
    			game.scene.run('GameInterface');
    			game.scene.run('GameScene');
        		game.scene.stop('OptionsScene');
    		}
    		else{
    			game.scene.run('MenuScene');
    			game.scene.stop('OptionsScene');
    		}
    	});
    	
    	this.element = this.add.dom(100, 410).createFromCache('optionsform');

        this.element.setPerspective(800);
        
       
        
        var boxe = this.element.node.children[1];
        //boxe.children[0].children[0].children[0].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('si')[0].childNodes[0].nodeValue;
        //boxe.children[0].children[0].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('no')[0].childNodes[0].nodeValue;

        boxe.children[0].children[0].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('email')[0].childNodes[0].nodeValue;
        boxe.children[0].children[1].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('user')[0].childNodes[0].nodeValue;
        
        boxe.children[0].children[2].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('conact')[0].childNodes[0].nodeValue;
        boxe.children[0].children[3].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('connueva')[0].childNodes[0].nodeValue;
        generalContainer.add(this.element);
		
		btnModificar.on('pointerover',function(pointer){
    		btnModificar.setFrame(1);
    	})

    	btnModificar.on('pointerout',function(pointer){
    		btnModificar.setFrame(0);
    	})
    	
    	btnModify.on('pointerover',function(pointer){
    		btnModify.setFrame(1);
    	})

    	btnModify.on('pointerout',function(pointer){
    		btnModify.setFrame(0);
    	})
    	
    	
    	
    	//Si esta en pantalla completa se checkea Si y sino pues NO
    	/*if (!window.screenTop && !window.screenY) {
    		document.getElementById('no').style.backgroundColor = "#5050af";
    	}else{
    		document.getElementById('yes').style.backgroundColor = "#5050af";
    		
    	}*/
		
		function getFullScreen(){
			if (!window.screenTop && !window.screenY) {
				return false;
			}else{
				return true;
			}
		}
		
		var docElm = document.documentElement;
		
		/*document.getElementById('yes').addEventListener("click", function(){
			if(!getFullScreen()){
				
				openFullscreen();
				document.getElementById('yes').style.backgroundColor = "#5050af";
				document.getElementById('no').style.backgroundColor = "#8989EE";
			}
		});
		
		document.getElementById('no').addEventListener("click", function(){			
			if(getFullScreen()){
				//closeFullscreen();
				
				document.getElementById('no').style.backgroundColor = "#5050af";
				document.getElementById('yes').style.backgroundColor = "#8989EE";
			}
			
		});*/
		var textCorreo = this.element.getChildByName("email");
		
    	var textUsuario = this.element.getChildByName("username");
    	
    	btnModificar.on('pointerdown',function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		if (textUsuario.value !== '') {
	    		let msg = new Object();
	    		msg.event = 'UPDATE USERNAME';
	    		msg.name = textUsuario.value;
	    		game.global.socket.send(JSON.stringify(msg));
    		}
            if (textCorreo.value !== '') {
                let msg = new Object();
                msg.event = 'UPDATE EMAIL';
                msg.email = textCorreo.value;
                game.global.socket.send(JSON.stringify(msg));
            }
    	});
    	
    	btnModify.on('pointerdown',function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		if (textUsuario.value !== '') {
	    		let msg = new Object();
	    		msg.event = 'UPDATE USERNAME';
	    		msg.name = textUsuario.value;
	    		game.global.socket.send(JSON.stringify(msg));
    		}

              if (textCorreo.value !== '') {
                let msg = new Object();
                msg.event = 'UPDATE EMAIL';
                msg.email = textCorreo.value;
                game.global.socket.send(JSON.stringify(msg));
            }
    	});
    	
    	btnModificar2.on('pointerover',function(pointer){
    		btnModificar2.setFrame(1);
    	})

    	btnModificar2.on('pointerout',function(pointer){
    		btnModificar2.setFrame(0);
    	})
    	
    	btnModify2.on('pointerover',function(pointer){
    		btnModify2.setFrame(1);
    	})

    	btnModify2.on('pointerout',function(pointer){
    		btnModify2.setFrame(0);
    	})
    	
    	var textPassword = this.element.getChildByName("password");    	
    	var textNewPassword = this.element.getChildByName("password1");
    	
    	btnModificar2.on('pointerdown',function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		if (textPassword.value !== '' && textNewPassword.value !== '') {
	    		let msg = new Object();
	    		msg.event = 'UPDATE PASSWORD';
	    		msg.oldPassword = textPassword.value;
	    		msg.newPassword = textNewPassword.value;
	    		game.global.socket.send(JSON.stringify(msg));
    		}
    	});

    	btnModify2.on('pointerdown',function(pointer){
    		game.global.effects.pulsarBoton.play();
    		if (textPassword.value !== '' && textNewPassword.value !== '') {
	    		let msg = new Object();
	    		msg.event = 'UPDATE PASSWORD';
	    		msg.oldPassword = textPassword.value;
	    		msg.newPassword = textNewPassword.value;
	    		game.global.socket.send(JSON.stringify(msg));
    		}
    	});
		
		this.elementS = this.add.dom(0, 200).createFromCache('optionsformS');
        this.elementS.setPerspective(800);
       
        //Effects
        $("#volume").slider({
		  	min: 0,
		  	max: 100,
		  	value: getVolumeEffects(),
				range: "min",
		  	slide: function(event, ui) {
		  		console.log(ui.value / 100);
		    	setVolumeEffect(ui.value / 100);
		  	}
		});
        
        console.log(getVolumeEffects());
        
        //Music
        $("#volume2").slider({
		  	min: 0,
		  	max: 100,
		  	value: getVolumeMusic(),
				range: "min",
		  	slide: function(event, ui) {
		    	setVolume(ui.value / 100);
		    	
		  	}
		});
			
		var myMedia = document.createElement('audio');
		$('#player').append(myMedia);
		myMedia.id = "myMedia";
		
		var myMedia2 = document.createElement('audio');
		$('#player2').append(myMedia2);
		myMedia2.id = "myMedia2";

		//playAudio('http://emilcarlsson.se/assets/Avicii%20-%20The%20Nights.mp3', 0);
		
		function playAudio(fileName, myVolume) {
				myMedia.src = fileName;
				myMedia.setAttribute('loop', 'loop');
	    	setVolume(myVolume);
	    	myMedia.play();
		}
		
		function setVolume(myVolume) {
	    	var myMedia = document.getElementById('myMedia');
	    	myMedia.volume = myVolume;
	    	game.global.musicMenu.volume = myVolume;
	    	game.global.myPlayer.config.volMusic = myVolume*100;
	    	updatePlayerConfig();
		} 
		
		function setVolumeEffect(myVolume) {
	    	var myMedia2 = document.getElementById('myMedia2');
	    	myMedia2.volume = myVolume;
	    	//game.global.effects.volume = myVolume;
	    	game.global.myPlayer.config.volEffects = myVolume*100;
	    	updatePlayerConfig();
		} 
		
		function getVolumeMusic(){
			var vol = game.global.myPlayer.config.volMusic;
			return vol;
		}
		
		function getVolumeEffects(){
			var vol = game.global.myPlayer.config.volEffects;
			return vol;
		}
		
		function detectarIdioma(type,lang){
			switch (type){
				case 0: 
					if(lang=="esp"){
						txtSound.setVisible(false);
						txtSonido.setVisible(false);
						txtCuenta.setVisible(true);
			    		txtIdioma.setVisible(false);
			    		txtCount.setVisible(false);
			    		txtLang.setVisible(false);
					}else{
						txtSound.setVisible(false);
						txtSonido.setVisible(false);
						txtCuenta.setVisible(false);
			    		txtIdioma.setVisible(false);
			    		txtCount.setVisible(true);
			    		txtLang.setVisible(false);
					}
					break;
				case 1:
					if(lang=="esp"){
						txtCuenta.setVisible(false);
			    		txtSonido.setVisible(true);
			    		txtIdioma.setVisible(false);
			    		txtCount.setVisible(false);
			    		txtSound.setVisible(false);
			    		txtLang.setVisible(false);
					}else{
						txtCuenta.setVisible(false);
			    		txtSonido.setVisible(false);
			    		txtIdioma.setVisible(false);
			    		txtCount.setVisible(false);
			    		txtSound.setVisible(true);
			    		txtLang.setVisible(false);
					}
					break;
				case 2:
					if(lang=="esp"){
						txtCuenta.setVisible(false);
			    		txtSonido.setVisible(false);
			    		txtIdioma.setVisible(true);
			    		txtCount.setVisible(false);
			    		txtSound.setVisible(false);
			    		txtLang.setVisible(false);
					}else{
						txtCuenta.setVisible(false);
			    		txtSonido.setVisible(false);
			    		txtIdioma.setVisible(false);
			    		txtCount.setVisible(false);
			    		txtSound.setVisible(false);
			    		txtLang.setVisible(true);
					}
					break;
				default:
					break;
			}
		}
        
        soundContainer.visible = false;
        languageContainer.visible = false;
		soundContainer.add(this.elementS);

		this.elementL = this.add.dom(0, 200).createFromCache('optionsformL');
        this.elementL.setPerspective(800);

        // Se cambian los textos al contenido xml y se cambia de idioma al seleccionar el boton
        var boxe = this.elementL.node.children[1];
        boxe.children[0].children[0].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('esp')[0].childNodes[0].nodeValue;
        boxe.children[0].children[0].onclick = function(){
        	game.global.idioma = "esp";
        	updatePlayerConfig();
        	if(game.global.inGame){
    			game.scene.run('GameInterface');
    			game.scene.run('GameScene');
        		game.scene.stop('OptionsScene');
    		}
    		else{
    			game.scene.run('MenuScene');
    			game.scene.stop('OptionsScene');
    		}
        };
        boxe.children[0].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('eng')[0].childNodes[0].nodeValue;
        boxe.children[0].children[1].onclick = function(){
        	game.global.idioma = "eng";
        	updatePlayerConfig();
        	if(game.global.inGame){
    			game.scene.run('GameInterface');
    			game.scene.run('GameScene');
        		game.scene.stop('OptionsScene');
    		}
    		else{
    			game.scene.run('MenuScene');
    			game.scene.stop('OptionsScene');
    		}
        };
        
        languageContainer.add(this.elementL);
        
        if(game.global.idioma == 'eng'){
        	document.getElementById('ingles').style.backgroundColor = "#5050af";
        	btnModify2.setVisible(true);
        	btnModify.setVisible(true);
        	btnModificar2.setVisible(false);
        	btnModificar.setVisible(false);
        }else{
        	document.getElementById('espanyol').style.backgroundColor = "#5050af";
        	btnModify2.setVisible(false);
        	btnModify.setVisible(false);
        	btnModificar2.setVisible(true);
        	btnModificar.setVisible(true);
        }

		
    	
    }
    update(time, delta) {
    	
    }
}