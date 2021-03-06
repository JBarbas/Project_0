class Edificio {
	
	constructor(x, y){
		
		this.id = 0;
		this.x = x;
		this.y = y;
		this.i = 0;
		this.j = 0;
		this.height = 1;
		this.width = 1;
		this.level = 0;
		this.levelMax = 3;
		this.numColonos = 0;
		this.jobs = 0;
		this.sprite = 'edificio';
		this.sprites = [];
		this.buildingSprite = 'enConstruccion1';
		this.listImage = 'assets/sprites/Edificios/Operaciones.png';
		this.nameEsp = 'Edificio';
		this.nameEng = 'Building';
		this.enConstruccion = false;
		this.situado = false;
		this.bienSituado = false;
		this.inicioConstruccion = Date.now();
		this.timeText = null;
		this.timeBox = null;
		this.timeBoxHover = null;
		this.gameObject = null;
		this.clone = null;
		this.originX = 0.5; // Porcentaje a lo ancho de la imagen desde donde se comenzara a pintar
		this.menuScene = ''; // La key de la escena del menu de este edificio
		this.costes =  [[5, 0],
						[5, 0],
						[5, 0]];
		this.interval = null;
	}
	
	build(scene) {
		pedirPuntuaciones()
		if (this.gameObject !== null) {
			this.gameObject.destroy();
		}
		var position = new Phaser.Geom.Point(this.x*tile_width/2, this.y*tile_height);
		position = cartesianToIsometric(position);
		position.x += tileMap_width*tile_width/2;
		if (this.enConstruccion) {
			this.gameObject = scene.add.image(position.x, position.y, this.buildingSprite).setOrigin(this.originX, 1);
		}
		else {
			this.gameObject = scene.add.image(position.x, position.y, this.sprites[this.level-1]).setOrigin(this.originX, 1);
		}
		//this.gameObject.setFrame(this.level -1);
		this.gameObject.depth = this.y + this.x + 1/Math.max(this.height, this.width);
		
		if (this instanceof GeneradorRecursos) {
			if (this.lleno) {
				if (this.recolectIcon !== null) {
					this.recolectIcon.destroy();
				}
				this.recolectIcon = scene.add.image(position.x, position.y - 100, this.resourceSprite).setOrigin(0.5, 1);
				this.recolectIcon.depth = this.y + this.x + 1/Math.max(this.height, this.width);		
				scene.tweens.add({
			        targets: this.recolectIcon,
			        y: position.y - 150,
			        duration: 3000,
			        ease: 'Linear',
			        yoyo: true,
			        loop: -1
			    });
				let e = this
				this.recolectIcon.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
					game.global.recolecting = true;
					game.global.sound = game.sound.play('recogerRecursos');
		    		this.destroy();
		    		e.lleno = false;
		    		let msg = new Object();
		    		msg.event = 'RECOLECT';
		    		msg.id = e.id;
		    		game.global.socket.send(JSON.stringify(msg));
		    		if (game.global.menu !== null) {
						game.scene.stop(game.global.menu);
					}
		    		setTimeout(function(){ game.global.recolecting = false; }, 500);
		    	});
			}
		}
		if (this.timeText !== null) {
			this.timeText.destroy();
			this.timeBox.destroy();
			this.timeBoxHover.destroy();
		}
		if (this.enConstruccion) {
			this.timeBox = scene.add.image(position.x, position.y - 115, 'boxTimer');
			this.timeBoxHover = scene.add.image(position.x-70, position.y - 115, 'boxTimerHover');
			this.timeBox.scale =  0.2;
			
			//Se ajusta el tamaño de timeBoxHover segun progreso
			var timeLeft = Math.floor(this.costes[this.level][0] - (Date.now() - this.inicioConstruccion)/60000);
			var porcentaje = ((this.costes[this.level][0]-(timeLeft-120))/this.costes[this.level][0]);
			this.timeBoxHover.setScale(porcentaje,1).setOrigin(0,0.5);
			this.timeText = scene.add.text(position.x, position.y - 115, 
					timeStyle(Math.floor(this.costes[this.level][0] - (Date.now() - this.inicioConstruccion)/60000)),
					{ fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold', textShadow: "2px 2px 15px #000000, 2px 2px 15px #000000"}).setOrigin(0.5, 0.5);
			this.timeBox.depth = this.y + this.x + 1/Math.max(this.height, this.width) + 100;
			this.timeBoxHover.depth = this.y + this.x + 1/Math.max(this.height, this.width) + 100;
			this.timeText.depth = this.y + this.x + 1/Math.max(this.height, this.width) + 100;
			var that = this;
			this.interval = setInterval(function() {
				updateTimeText(that,scene);
			}, 30000);
		}
	}
	
	move () {
		this.gameObject.alpha = 0.25;
		this.gameObject.setTexture(this.sprites[this.level - 1]);
		for (var i = this.y-this.height+1; i <= this.y; i++) {
			for (var j = this.x-this.width+1; j <= this.x; j++) {
				if (typeof game.global.grid[i] !== 'undefined') {
					if (typeof game.global.grid[i][j] !== 'undefined') {
						if (game.global.grid[i][j].type === this.id) {
							game.global.grid[i][j].type = 0;
						}
					}
				}
			}
		}
		game.global.construyendo = true;
		game.scene.getScene('GameScene').gridContainer.setAlpha(0.5);
		game.global.edificioEnConstruccion = this;
		
		if (this instanceof GeneradorRecursos) {
			if (this.recolectIcon !== null) {
				this.recolectIcon.destroy();
			}
		}
	}
	
	previsualizar(scene) {
		this.gameObject = scene.add.image(this.x, this.y, this.sprites[this.level]).setOrigin(this.originX, 1);
		this.gameObject.alpha = 0.25;
	}
	
	destroy() {
		if (this.gameObject !== null) {
			this.gameObject.destroy();
		}
	}
}

function updateTimeText(edificio, scene) {
	if (edificio.timeText != null) {
		var timeLeft = Math.floor(edificio.costes[edificio.level][0] - (Date.now() - edificio.inicioConstruccion)/60000);
		
		edificio.timeText.text = timeStyle(timeLeft);
		var porcentaje = ((edificio.costes[edificio.level][0]-(timeLeft-120))/edificio.costes[edificio.level][0]);

		scene.tweens.add({
		  targets     : [ edificio.timeBoxHover ],
		  scaleX: porcentaje,
		  scaleY: 1,
		  ease        : 'Linear',
		  duration    : 500,
		  yoyo        : false,
		  repeat      : 0,
		  callbackScope   : this
		});
	}
	else {
		clearInterval(edificio.interval);
	}
}

