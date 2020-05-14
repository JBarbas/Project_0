class Generador extends GeneradorRecursos {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.numColonos = 0;
		super.sprite = 'generador';
		super.sprites = ['generador1', 'generador1', 'generador1', 'generador1',
			'generador2', 'generador2', 'generador2', 'generador2', 'generador2',
			'generador3', 'generador3', 'generador3', 'generador3', 'generador3',
			'generador4'];
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'GeneradorMenu';
		super.listImage = 'assets/sprites/Edificios/Generador';
		super.nameEsp = 'Generador';
		super.nameEng = 'Generator';
		super.resourceSprite = '';
		this.recursos = [[0, 0],
						[0, 0],
						[0, 0]];
		this.costes = [[2, 0],
						[2, 0],
						[2, 0]];
	}
}