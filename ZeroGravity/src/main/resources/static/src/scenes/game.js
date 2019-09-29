var tile_width = 128;
var tile_height = 64;
var tileMap_width = 32; // Numero de tiles a lo ancho (+2 para colocar tiles de borde del mapa)
var tileMap_height = 32; // Numero de tiles a lo largo (+2 para colocar tiles de borde del mapa)
var world_bounds_margin = 256; // Margen o padding del mapa
var zoom = 1; // zoom de la camara
var maxZoom = 2; // zoom maximo permitido
var zoomSpeed = 0.05 // velocidad del zoom
var construible = false; //controlador de si es posible contruir en ese momento

class GameScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "GameScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **GAME** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	this.main_camera = this.cameras.main;
    	zoom = 1; // reset del zoom
    	// Establecemos los limites del mapa donde puede ver la camara
    	this.main_camera.setBounds(0-world_bounds_margin, 0-world_bounds_margin, tileMap_width*tile_width + 2*world_bounds_margin, tileMap_height*tile_height - 2*tile_height + 2*world_bounds_margin, true);
    	// Creamos la malla isometrica
    	createGrid(this);
    	this.isDragging = false; // true si la cámara se está moviendo por drag del raton
    	
    	// Evento de click para construir edificio
    	let scene = this;
    	this.input.on('pointerup', function(pointer){
    		construir(pointer, scene);
    	 });
    }
    update(time, delta) {

    	////////////////////////////////////////////////////////////////////////////////////
    	// CONTROL DE CAMARA
    	////////////////////////////////////////////////////////////////////////////////////
    	
    	this.main_camera.setZoom(zoom);
    	
    	/* Codigo extraido de http://www.html5gamedevs.com/topic/9814-move-camera-by-dragging-the-world-floor/
    	 * by sanojian - 14 October 2014
    	 */
    	if (this.game.input.activePointer.isDown) {
			  if (this.game.origDragPoint) {
					// move the camera by the amount the mouse has moved since last update
					this.cameras.main.scrollX += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
					this.cameras.main.scrollY += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
					if (Math.abs(this.game.origDragPoint.x - this.game.input.activePointer.position.x) > 3 || Math.abs(this.game.origDragPoint.y - this.game.input.activePointer.position.y) > 3) {
						this.isDragging = true;
					}
			  } 
			  // set new drag origin to current position
			  this.game.origDragPoint = this.game.input.activePointer.position.clone();
		} 
    	else {
			  this.game.origDragPoint = null;
		}
    	/* Codigo extraido de http://www.html5gamedevs.com/topic/9814-move-camera-by-dragging-the-world-floor/
    	 * Updated by chrisme - 30 June 2019
    	 */
    }

}

// Asigna los tiles al array del mapa
function createGrid(scene) {
	for (var i = 0; i < game.global.grid.length; i++) {
		for (var j = 0; j < game.global.grid[i].length; j++) {
			var position = new Phaser.Geom.Point(j*tile_width/2, i*tile_height);
			position = cartesianToIsometric(position);
			switch(game.global.grid[i][j].type) {
			case -2:
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_-2').setOrigin(0.5, 1);
				break;
			case -1:
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_-1').setOrigin(0.5, 1);
				break;
			case 1:
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'centroDeMando').setOrigin(0.5, 1);
				break;
			default:
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_0').setOrigin(0.5, 1);
				break;
			}
		}
	}
}

function construir(pointer, scene) {
	// No permite construir si se esta haciendo scroll/drag en la pantalla
    if (!scene.isDragging) {
    	
    	// Recogemos la posicion del raton en coordenadas globales
    	var position = new Phaser.Geom.Point(scene.main_camera.getWorldPoint(pointer.x, pointer.y).x - tileMap_width*tile_width/2, scene.main_camera.getWorldPoint(pointer.x, pointer.y).y);
    	
    	// Convertimos las coordenadas de isometricas a cartesianas para poder utilizar los ejes cartesianos "x" e "y"
		position = isometricToCartesian(position);
		
		// Una vez en coordenadas cartesianas comprobamos a que celda de la malla corresponde el click (Utilizamos su indice en el mapGrid, que está en coordenadas cartesianas)
		let i = Math.trunc(position.y/tile_height + 1);
		let j = Math.trunc(position.x/(tile_width/2) + 1);
		
		//Comprobamos si se puede construir en la celda seleccionada
		/*if (game.global.grid[i][j].type === 0) {*/
			
			// recogemos las coordenadas isometricas de la celda para pintar ahi el edificio
			let x = game.global.grid[i][j].image.x;
			let y = game.global.grid[i][j].image.y;
	    	var centroMando = new CentroMando(x, y);
	    	
	    	
	    	/*this.centroMando.moveTo(this.input.x, this.input.y)*/
	    	
	    	// Pintamos el edificio desde su esquina inferior
	    	game.global.grid[i][j].content = scene.add.image(centroMando.x, centroMando.y, centroMando.sprite).setOrigin(0.5, 1);
	    	
	    	// Configuramos la profundidad para que no se pinte por encima de los edificios que tiene debajo
	    	game.global.grid[i][j].content.depth = i*tileMap_width + j;
		/*}*/
	}
	else {
		scene.isDragging = false;
	}
}

// Control del zoom
window.addEventListener("wheel", event => {
    const delta = zoomSpeed*(-Math.sign(event.deltaY));
    zoom += delta;
    if (zoom < 1) {
    	zoom = 1;
    }
    else if (zoom > maxZoom) {
    	zoom = maxZoom;
    }
});

/* Codigo extraido de https://gamedevelopment.tutsplus.com/tutorials/creating-isometric-worlds-primer-for-game-developers-updated--cms-28392
 * by Juwal Bose - 11 May 2017
 */
function cartesianToIsometric(cartPt){
    var tempPt=new Phaser.Geom.Point(0, 0);
    tempPt.x=cartPt.x-cartPt.y;
    tempPt.y=(cartPt.x+cartPt.y)/2;
    return (tempPt);
}

function isometricToCartesian(isoPt){
    var tempPt=new Phaser.Geom.Point(0, 0);
    tempPt.x=(2*isoPt.y+isoPt.x)/2;
    tempPt.y=(2*isoPt.y-isoPt.x)/2;
    return (tempPt);
}