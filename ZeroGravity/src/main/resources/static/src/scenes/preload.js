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
		// Cargamos los ficheros de idioma
		this.load.xml('esp', 'assets/text/languages/esp.xml');
		this.load.xml('eng', 'assets/text/languages/eng.xml');
		
		// Backgrounds
		this.load.image('backgroundLoadGame', 'assets/background/loadGame.png');
		this.load.image('backgroundLogIn', 'assets/background/InicioSesionV.1.png');
		this.load.image('backgroundRegister', 'assets/background/Registrar.png');
		this.load.image('backgroundMenu', 'assets/background/MenuPrincipal.png');
		this.load.image('backgroundOptionsAccount', 'assets/background/OpcionesCuenta.png');
		this.load.image('backgroundCredits', 'assets/background/Creditos.png');
		this.load.image('creditosHover', 'assets/background/CreditosHover.png');
		this.load.image('backgroundDifficulty', 'assets/background/ElegirDificultad.png');
		this.load.image('bckCargando', 'assets/background/backload.png');
		
		//Elements
		this.load.image('team', 'assets/interface/team.png');
		this.load.image('txtCuenta', 'assets/interface/Opciones/cuentaTextos.png');
		this.load.image('txtSonido', 'assets/interface/Opciones/sonidoTextos.png');
		this.load.image('txtIdioma', 'assets/interface/Opciones/idiomaTextos.png');
		
		
		
		//Buttons
    	this.load.image('session', 'assets/background/btnInicioSesion.png');
    	this.load.spritesheet( 'btn' , 'assets/background/btnInicioSesionSprite.png' ,{frameWidth:596,frameHeight:142});
    	this.load.spritesheet( 'btnCuenta' , 'assets/interface/Opciones/CuentaSprite.png' ,{frameWidth:131,frameHeight:131});
    	this.load.spritesheet( 'btnSonido' , 'assets/interface/Opciones/EqualizerSprite.png' ,{frameWidth:131,frameHeight:131});
    	this.load.spritesheet( 'btnIdioma' , 'assets/interface/Opciones/IdiomaSprite.png' ,{frameWidth:131,frameHeight:131});
    	this.load.spritesheet('btnModificar', 'assets/interface/btnModificar.png',{frameWidth:594,frameHeight:142});
    	
    	this.load.spritesheet( 'btnRegister' , 'assets/interface/btnRegistrar.png' ,{frameWidth:596,frameHeight:142});
    	this.load.image('btnAmigos', 'assets/background/btnMenuAmigos.png');
		this.load.image('link', 'assets/interface/link.png');
		this.load.spritesheet('back', 'assets/interface/back.png',{frameWidth:165,frameHeight:63});
		
		//Texts
		this.load.html('loginform', 'assets/text/login-form.html');
		this.load.html('registerform', 'assets/text/register-form.html');
		this.load.html('difficultform', 'assets/text/difficult-form.html');
		this.load.html('menuform', 'assets/text/menu-form.html');
		this.load.html('optionsform', 'assets/text/options-form.html');
		this.load.html('optionsformS', 'assets/text/options-formS.html');
		this.load.html('optionsformL', 'assets/text/options-formL.html');
		
		
		
		this.load.image('load', 'assets/interface/Cargando.png');
		
		this.load.atlas('title', 'assets/atlas/title.png', 'assets/atlas/title.json');
		
		//Sound
		this.load.audio('soundtrack', ['assets/sound/soundtrack.mp3', '']);
		this.load.audio('cambianRecursos', ['assets/sound/cambianRecursos.wav', '']);
		this.load.audio('comprar', ['assets/sound/comprar.wav', '']);
		this.load.audio('confirmar', ['assets/sound/confirmar.wav', '']);
		this.load.audio('construido', ['assets/sound/construido.wav', '']);
		this.load.audio('construyendo', ['assets/sound/construyendo.wav', '']);
		this.load.audio('denegar', ['assets/sound/denegar.wav', '']);
		this.load.audio('dificultadMenu', ['assets/sound/dificultadMenu.wav', '']);
		this.load.audio('mensaje', ['assets/sound/mensaje.wav', '']);
		this.load.audio('menuEdificios', ['assets/sound/menuEdificios.wav', '']);
		this.load.audio('pulsarBoton', ['assets/sound/pulsarBoton.wav', '']);
		this.load.audio('puntuacion', ['assets/sound/puntuacion.wav', '']);
		this.load.audio('recogerRecursos', ['assets/sound/recogerRecursos.wav', '']);
		this.load.audio('recursosMaximos', ['assets/sound/recursosMaximos.wav', '']);
		this.load.audio('seleccionarEdificio', ['assets/sound/seleccionarEdificio.wav', '']);
		
    }
    create (data)  {
    	//this.scale.startFullscreen();
		if (game.global.ONLY_GAME_MODE) {
			game.global.music = game.sound.play('soundtrack');
			game.scene.run('PreloadGameScene');
		}
		else if (game.global.SKIP_INTRO) {
			game.global.music = game.sound.play('soundtrack');
			
			game.scene.run('LogInScene');
		}
		else {
			game.global.sound = game.sound.play('pulsarBoton');
			game.global.music = game.sound.play('soundtrack');
			game.scene.run('IntroScene');
		}
		game.scene.stop('PreloadScene');
    }
    update(time, delta) {
    	
    }
}