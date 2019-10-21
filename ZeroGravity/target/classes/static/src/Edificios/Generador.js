class Generador extends GeneradorRecursos {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.sprite = 'generador';
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'GeneradorMenu';
		super.resourceSprite = '';
		this.recursos = [[0, 0],
						[0, 0],
						[0, 0]];
		this.costes = [[2, 0],
						[2, 0],
						[2, 0]];
	}
}