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
    	var background = this.add.image(960, 540, 'backgroundLogIn');
    	
    	var button = this.add.image(960, 800, 'btn').setInteractive();

    	var registro = this.add.text(920, 900, game.cache.xml.get(game.global.idioma).getElementsByTagName('reg')[0].childNodes[0].nodeValue, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
    	
    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})    	
    	
    	var	size = '20px';
    	
    	var colorYellow = '#ffd213';
    	var colorWhite = '#fff';

    	registro.setFontSize(size);
    	
    	registro.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
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
        
        
        
        var a = element.getChildByName('usernamelb');
        if (a != null) {
			alert("a")
		}
        
        
        button.on('pointerdown', function(pointer, localX, localY, event){
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