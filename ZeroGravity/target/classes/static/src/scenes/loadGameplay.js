class LoadGameplayScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "LoadGameplayScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOAD GAMEPLAY** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	
    	
    	var bckCargando = this.add.image(960, 540, 'bckCargando');
    	var bckCargandoEng = this.add.image(960, 540, 'bckCargandoEng');
    	
    	if(game.global.idioma === "eng"){
    		bckCargando.setVisible(false);
    		bckCargandoEng.setVisible(true);
    	}else{
    		bckCargando.setVisible(true);
    		bckCargandoEng.setVisible(false);
    	}
    	
    	
    	
    	
    	game.global.cargando = this.add.image(game.config.width/2+20, game.config.height/2, 'load');
    	game.global.timer = this.add.text((game.config.width/2)-15, (game.config.height/2)-15, '0%', { fontSize: '40px', fill: '#fff'});
    	
    	
    	//Timer
    	setTimeout(function(){ cargado(); }, 3000);
    	game.global.timedEvent = this.time.delayedCall(3000, cargando(), [], this);
    	
    	function cargando(){
        }
    	
    	function cargado(){
    		game.scene.run('GameScene');
        	game.scene.stop('LoadGameplayScene');
    	}
    	
    }
    update(time, delta) {
    	game.global.cargando.angle += 1;
    	game.global.timer.setText((game.global.timedEvent.getProgress().toString().substr(0, 3))*100+ '%');
    	//game.global.timer.setText( game.global.timedEvent.getProgress().toString() + 1 + '%');
    }
    
    
}