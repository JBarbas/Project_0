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
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	var btnIdioma = this.add.image(1400, 250, 'btnIdioma').setInteractive();
    	var btnSonido = this.add.image(960, 250, 'btnSonido').setInteractive();
    	var btnCuenta = this.add.image(550, 250, 'btnCuenta').setInteractive();
    	
    	
    	
    	var txtCuenta = this.add.image(950, 650, 'txtCuenta');
    	var txtSonido = this.add.image(650, 650, 'txtSonido');
    	var txtIdioma = this.add.image(650, 650, 'txtIdioma');
    	
    	txtCuenta.setVisible(true);
		txtSonido.setVisible(false);
		txtIdioma.setVisible(false);
		
		var btnModificar = this.add.image(1650, 550, 'btnModificar').setInteractive();
    	btnModificar.setScale(.4);
    	
    	var btnModificar2 = this.add.image(1650, 800, 'btnModificar').setInteractive();
    	btnModificar2.setScale(.4);
    	
		
		
    	//Default cuenta
    	btnCuenta.setFrame(1);
    	
    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	btnModificar.on('pointerover',function(pointer){
    		btnModificar.setFrame(1);
    	})

    	btnModificar.on('pointerout',function(pointer){
    		btnModificar.setFrame(0);
    	})
    	
    	btnModificar2.on('pointerover',function(pointer){
    		btnModificar2.setFrame(1);
    	})

    	btnModificar2.on('pointerout',function(pointer){
    		btnModificar2.setFrame(0);
    	})
    	
    	btnCuenta.on('pointerdown',function(pointer){
    		btnCuenta.setFrame(1);
    		btnSonido.setFrame(0);
    		btnIdioma.setFrame(0);
    		txtCuenta.setVisible(true);
    		txtSonido.setVisible(false);
    		txtIdioma.setVisible(false);
    		generalContainer.visible = true;
    		soundContainer.visible = false;
    		languageContainer.visible = false;
    		btnModificar.visible = true;
    		btnModificar2.visible = true;
    	})
    	
    	btnSonido.on('pointerdown',function(pointer){
    		btnCuenta.setFrame(0);
    		btnSonido.setFrame(1);
    		btnIdioma.setFrame(0);
    		txtCuenta.setVisible(false);
    		txtSonido.setVisible(true);
    		txtIdioma.setVisible(false);
    		generalContainer.visible = false;
    		soundContainer.visible = true;
    		languageContainer.visible = false;
    		btnModificar.visible = false;
    		btnModificar2.visible = false;
    	})
    	
    	btnIdioma.on('pointerdown',function(pointer){
    		btnCuenta.setFrame(0);
    		btnSonido.setFrame(0);
    		btnIdioma.setFrame(1);
    		txtCuenta.setVisible(false);
    		txtSonido.setVisible(false);
    		txtIdioma.setVisible(true);
    		generalContainer.visible = false;
    		soundContainer.visible = false;
    		languageContainer.visible = true;
    		btnModificar.visible = false;
    		btnModificar2.visible = false;
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
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
    	
    	this.element = this.add.dom(100, 300).createFromCache('optionsform');

        this.element.setPerspective(800);
        
        
        /*var fSYes = document.getElementById('fullScreenYes');
		var fSNo = document.getElementById('fullScreenNo');
		
		fSYes.addEventListener("click", function(){
			if(this.scale.isFullscreen){
				this.scale.stopFullscreen();
			}else{
				this.scale.startFullscreen();
			}
		}, this);
		
		//generalContainer.add(fSYes);
		//generalContainer.add(fSNo);*/
        
		generalContainer.add(this.element);

		
		this.elementS = this.add.dom(0, 200).createFromCache('optionsformS');
        this.elementS.setPerspective(800);
        
        $("#volume").slider({
		  	min: 0,
		  	max: 100,
		  	value: 0,
				range: "min",
		  	slide: function(event, ui) {
		    	setVolume(ui.value / 100);
		  	}
		});
        
        $("#volume2").slider({
		  	min: 0,
		  	max: 100,
		  	value: 0,
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

		playAudio('http://emilcarlsson.se/assets/Avicii%20-%20The%20Nights.mp3', 0);
		
		function playAudio(fileName, myVolume) {
				myMedia.src = fileName;
				myMedia.setAttribute('loop', 'loop');
	    	setVolume(myVolume);
	    	myMedia.play();
		}
		
		function setVolume(myVolume) {
	    	var myMedia = document.getElementById('myMedia');
	    	myMedia.volume = myVolume;
		}       
        
        soundContainer.visible = false;
        languageContainer.visible = false;
		soundContainer.add(this.elementS);
		
		
		

		this.elementL = this.add.dom(0, 200).createFromCache('optionsformL');
        this.elementL.setPerspective(800);
        
        languageContainer.add(this.elementL);
		
		
    
    	
    }
    update(time, delta) {
    	
    }
}