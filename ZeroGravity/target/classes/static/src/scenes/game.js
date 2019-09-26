var tile_width = 128;
var tile_height = 64;
var tileMap_width = 32; // Numero de tiles a lo ancho (+2 para colocar tiles de borde del mapa)
var tileMap_height = 32; // Numero de tiles a lo largo (+2 para colocar tiles de borde del mapa)
var world_bounds_margin = 256; // Margen o padding del mapa
var zoom = 1; // zoom de la camara
var maxZoom = 2; // zoom maximo permitido
var zoomSpeed = 0.05 // velocidad del zoom

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
    	createGrid(this, tileMap_width, tileMap_height);
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
			this.cameras.main.scrollX +=
			  this.game.origDragPoint.x - this.game.input.activePointer.position.x;
			this.cameras.main.scrollY +=
			  this.game.origDragPoint.y - this.game.input.activePointer.position.y;
		  } // set new drag origin to current position
		  this.game.origDragPoint = this.game.input.activePointer.position.clone();
		} else {
		  this.game.origDragPoint = null;
		}
    	/* Codigo extraido de http://www.html5gamedevs.com/topic/9814-move-camera-by-dragging-the-world-floor/
    	 * Updated by chrisme - 30 June 2019
    	 */
    }

}

// Crea un array doble para el mapa
function randomGrid(width, height) {
	var randomGrid = new Array();
	var minGridSide = Math.min(width-2, height-2);
	for (var i = 0; i < height; i++) {
		randomGrid.push(new Array());
		for (var j = 0; j < width; j++) {
			if (i >= minGridSide/3 + 1 && i < 2*minGridSide/3  + 1 && j >= minGridSide/3  + 1 && j < 2*minGridSide/3  + 1) {
				randomGrid[i].push(0);
			}
			else if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
				randomGrid[i].push(-2);
			}
			else {
				randomGrid[i].push(-1);
			}
		}
	}
	return randomGrid;
}

// Asigna los tiles al array del mapa
function createGrid(scene, width, height) {
	var newGrid = randomGrid(width, height)
	for (var i = 0; i < newGrid.length; i++) {
		for (var j = 0; j < newGrid[i].length; j++) {
			var position = new Phaser.Geom.Point(j*tile_width/2, i*tile_height);
			position = cartesianToIsometric(position);
			let tile = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_' + newGrid[i][j]).setOrigin(0.5, 1);
		}
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