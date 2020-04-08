class LogInScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "LogInScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOG IN** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	game.config.scaleMode = Phaser.Scale.NONE;
    	var background = this.add.image(960, 540, 'backgroundLogIn');
    	var backgroundEng = this.add.image(960, 540, 'backgroundLogInEng');
    	
    	
    	var button = this.add.image(960, 800, 'btn').setInteractive();
    	var buttonEng = this.add.image(960, 800, 'btnEng').setInteractive();
    	
    	
    	if(navigator.language === "en-US"){
    		button.setVisible(false);
    		background.setVisible(false);
    	}else{
    		buttonEng.setVisible(false);
    		backgroundEng.setVisible(false);
    	}
    	var registro = this.add.text(920, 900, game.cache.xml.get(game.global.idioma).getElementsByTagName('reg')[0].childNodes[0].nodeValue, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
    	
    	
    	  
    	
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
    	
    	
    	
    	
    	var	size = '20px';
    	
    	var colorYellow = '#ffd213';
    	var colorWhite = '#fff';

    	registro.setFontSize(size);
    	
    	registro.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.global.sound = game.sound.play('pulsarBoton');
    		game.scene.run('RegisterScene');
    		game.scene.stop('LogInScene');
    	});
    	
    	registro.setInteractive().on('pointerover', function(pointer, localX, localY, event){
    		registro.setFill(colorYellow);
    	});
    	registro.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    		registro.setFill(colorWhite);
    	});
        
    	var element = this.add.dom(420, 600).createFromCache('loginform');

        element.setPerspective(800);
        
        var scene = this;
        
        var boxe = element.node.children[1];
        boxe.children[0].children[0].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('user')[0].childNodes[0].nodeValue;
        boxe.children[0].children[1].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('pass')[0].childNodes[0].nodeValue;

        button.on('pointerdown', function(pointer, localX, localY, event){
        	game.global.sound = game.sound.play('pulsarBoton');
        	var inputUsername = element.getChildByName('username');
            var inputPassword = element.getChildByName('password');

            //  Have they entered anything?
            if (inputUsername.value !== '' && inputPassword.value !== '')
            {
                
                let msg = new Object();
        		msg.event = 'LOG IN';
        		msg.name = inputUsername.value;
        		msg.password = inputPassword.value;
        		game.global.socket.send(JSON.stringify(msg));
        		
        		// Esperamos la respuesta del servidor para cambiar la escena
            }
            else
            {
                //  Flash the prompt
            }
    	});
        
        buttonEng.on('pointerdown', function(pointer, localX, localY, event){
        	game.global.sound = game.sound.play('pulsarBoton');
        	var inputUsername = element.getChildByName('username');
            var inputPassword = element.getChildByName('password');

            //  Have they entered anything?
            if (inputUsername.value !== '' && inputPassword.value !== '')
            {
                
                let msg = new Object();
        		msg.event = 'LOG IN';
        		msg.name = inputUsername.value;
        		msg.password = inputPassword.value;
        		game.global.socket.send(JSON.stringify(msg));
        		
        		// Esperamos la respuesta del servidor para cambiar la escena
            }
            else
            {
                //  Flash the prompt
            }
    	});
        
    }
    update(time, delta) {
    	
    }
    
    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        console.log(text);
    }
}