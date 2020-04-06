class IntroScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "IntroScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **INTRO** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	game.global.musicMenu = game.sound.add('intro');
    	var intro = game.global.musicMenu;    	
    	intro.pause();
    	this.scale.startFullscreen();
    	var background = this.add.image(960, 540, 'backgroundLoadGame');
    	background.alpha = 0;
    	
    	
    	var tween = this.tweens.add({
    	    targets: background,
    	    alpha: { from: 0, to: 1 },
    	    ease: 'Linear',
    	    duration: 2000,
    	    repeat: 0,
    	    yoyo: true
    	});
    	
    	tween.on('complete', function(tween, targets){
    		let text = game.scene.getScene('IntroScene').add.text(game.config.width/2, game.config.height/2, "Haz click para continuar", { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px'});
    		text.setOrigin(0.5, 0.5);
    		game.scene.getScene('IntroScene').tweens.add({
        	    targets: text,
        	    alpha: { from: 0, to: 1 },
        	    ease: 'Linear',
        	    duration: 500,
        	    yoyo: true,
        	    loop: -1
        	});
    	});
    	
    	this.input.on('pointerup', function(pointer){
        	openFullscreen();
        	game.scene.run('LogInScene');
    		game.scene.stop('IntroScene');
    	});
    	
    }
    update(time, delta) {
    	
    }
}