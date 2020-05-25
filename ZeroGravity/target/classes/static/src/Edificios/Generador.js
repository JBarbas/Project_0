class Generador extends GeneradorRecursos {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 0;
		super.levelMax = 15;
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
					[11, 0],
					[28, 0],
					[52, 0],
					[84, 0],
					[122, 0],
					[169, 0],
					[222, 0],
					[283, 0],
					[351, 0],
					[427, 0],
					[510, 0],
					[600, 0],
					[698, 0],
					[803, 0]];
	}
}