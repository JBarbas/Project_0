class Edificio {
	
	constructor(x, y){
		
		this.id = 0;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.sprite = 'edificio';
		this.gameObject = null;
		this.originX = 0.5; // Porcentaje a lo ancho de la imagen desde donde se comenzara a pintar
		this.menuScene = ''; // La key de la escena del menu de este edificio
	}
	
	build(scene) {
		if (this.gameObject !== null) {
			this.gameObject.destroy();
		}
		var position = new Phaser.Geom.Point(this.x*tile_width/2, this.y*tile_height);
		position = cartesianToIsometric(position);
		position.x += tileMap_width*tile_width/2;
		this.gameObject = scene.add.image(position.x, position.y, this.sprite).setOrigin(this.originX, 1);
		this.gameObject.depth = this.y + this.x + 1/this.width;
	}
	
	move () {
		this.gameObject.alpha = 0.5;
		for (var i = this.y-this.height+1; i <= this.y; i++) {
			for (var j = this.x-this.width+1; j <= this.x; j++) {
				if (typeof game.global.grid[i] !== 'undefined') {
					if (typeof game.global.grid[i][j] !== 'undefined') {
						game.global.grid[i][j].type = 0
					}
				}
			}
		}
		game.global.construyendo = true;
		game.global.edificioEnConstruccion = this;
	}
	
	previsualizar(scene) {
		this.gameObject = scene.add.image(this.x, this.y, this.sprite).setOrigin(this.originX, 1);
		this.gameObject.alpha = 0.5;
	}
}