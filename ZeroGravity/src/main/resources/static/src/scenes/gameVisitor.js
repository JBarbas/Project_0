var tile_width = 128;
var tile_height = 64;
var tileMap_width = 20; // Numero de tiles a lo ancho (+2 para colocar tiles de borde del mapa)
var tileMap_height = 20; // Numero de tiles a lo largo (+2 para colocar tiles de borde del mapa)
var world_bounds_marginX = 900; // Margen o padding del mapa
var world_bounds_marginY = 650; // Margen o padding del mapa
var zoom = 1; // zoom de la camara
var maxZoom = 2; // zoom maximo permitido
var minZoom = 0.5; // zoom minimo permitido
var zoomSpeed = 0.1 // velocidad del zoom
var construible = false; //controlador de si es posible contruir en ese momento

class GameScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "GameVisitorScene",
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
    	game.global.inGame = true;
    	this.main_camera = this.cameras.main;
    	zoom = 1; // reset del zoom
    	// Establecemos los limites del mapa donde puede ver la camara
    	this.main_camera.setBounds(0-world_bounds_marginX, 0-world_bounds_marginY, tileMap_width*tile_width + 2*world_bounds_marginX, tileMap_height*tile_height - 2*tile_height + 2*world_bounds_marginY, true);
    	
    	this.add.image((tileMap_width*tile_width)/2, (tileMap_height*tile_height - 2*tile_height)/2, 'bg0').setOrigin(1, 1).setScale(2, 2);
    	this.add.image((tileMap_width*tile_width)/2, (tileMap_height*tile_height - 2*tile_height)/2, 'bg1').setOrigin(0, 1).setScale(2, 2);
    	this.add.image((tileMap_width*tile_width)/2, (tileMap_height*tile_height - 2*tile_height)/2, 'bg2').setOrigin(1, 0).setScale(2, 2);
    	this.add.image((tileMap_width*tile_width)/2, (tileMap_height*tile_height - 2*tile_height)/2, 'bg3').setOrigin(0, 0).setScale(2, 2);    

		var mediaQuery = window.matchMedia("(max-width: 700px)")
		if (!mediaQuery.matches) { 
			this.add.image((tileMap_width*tile_width)/2, (tileMap_height*tile_height - 2*tile_height)/2, 'fondo').setOrigin(0.5, 0.5).setScale(1, 1);
		}
    	//this.add.image((tileMap_width*tile_width)/2, (tileMap_height*tile_height - 2*tile_height)/2, 'fondo').setOrigin(0.5, 0.5).setScale(1, 1);
    	
    	// Creamos la malla isometrica
    	this.gridContainer = this.add.container(0, 0);
    	createGrid(this);
    	this.gridContainer.setAlpha(0);
    	this.isDragging = false; // true si la cámara se está moviendo por drag del raton
    	
    	// Abrimos la interfaz de usuario
    	game.scene.run('GameInterface');
    	var dragScale = this.plugins.get('rexpinchplugin').add(this);
    	var camera = this.cameras.main;
        dragScale
            .on('drag1', function (dragScale) {
            	//game.scene.getScene('GameScene').isDragging = true;
                var drag1Vector = dragScale.drag1Vector;
                camera.scrollX -= drag1Vector.x / camera.zoom;
                camera.scrollY -= drag1Vector.y / camera.zoom;
            })
            .on('pinch', function (dragScale) {
            	game.scene.getScene('GameScene').isDragging = true;
            	game.global.inZoom = true;
                var scaleFactor = dragScale.scaleFactor;
                zoom *= scaleFactor;
                if (zoom < minZoom) {
                	zoom = minZoom;
                }
                else if (zoom > maxZoom) {
                	zoom = maxZoom;
                }
            }, this);
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
    		if (!game.global.inMenu || !(this.game.input.activePointer.position.x > game.global.buildingMenu.x && 
    				this.game.input.activePointer.position.x < game.global.buildingMenu.x + game.global.buildingMenu.width && 
    				this.game.input.activePointer.position.y > game.global.buildingMenu.y && 
    				this.game.input.activePointer.position.y < game.global.buildingMenu.y + game.global.buildingMenu.height &&
    				!game.global.inZoom)) {
    			
	    		if (this.game.origDragPoint) {
					// move the camera by the amount the mouse has moved since last update
					//this.cameras.main.scrollX += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
					//this.cameras.main.scrollY += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
					if (Math.abs(this.game.origDragPoint.x - this.game.input.activePointer.position.x) > 3 || Math.abs(this.game.origDragPoint.y - this.game.input.activePointer.position.y) > 3) {
						this.isDragging = true;
					}
				} 
				// set new drag origin to current position
				this.game.origDragPoint = this.game.input.activePointer.position.clone();
    		}
		} 
    	else {
			  this.game.origDragPoint = null;
		}
    	/* Codigo extraido de http://www.html5gamedevs.com/topic/9814-move-camera-by-dragging-the-world-floor/
    	 * Updated by chrisme - 30 June 2019
    	 */
    } 
    
}