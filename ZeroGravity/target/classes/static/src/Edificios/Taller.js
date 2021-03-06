class Taller extends GeneradorRecursos {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 2;
		super.width = 1;
		super.level = 0;
		super.levelMax = 15;
		super.numColonos = 0;
		super.sprite = 'taller';
		super.sprites = ['taller1', 'taller1', 'taller1', 'taller1',
			'taller2', 'taller2', 'taller2', 'taller2', 'taller2',
			'taller3', 'taller3', 'taller3', 'taller3', 'taller3',
			'taller4'];
		super.buildingSprite = 'enConstruccion3';
		super.menuScene = 'TallerMenu';
		super.listImage = 'assets/sprites/Edificios/Taller_1.png';
		super.nameEsp = 'Taller';
		super.nameEng = 'Workshop';
		super.originX = 0.32;
		this.robots = new Map();
		super.resourceSprite = 'metalIcon';
		this.costes = [[2, 0],
					[16, 0],
					[43, 0],
					[83, 0],
					[134, 0],
					[198, 0],
					[275, 0],
					[364, 0],
					[465, 0],
					[579, 0],
					[705, 0],
					[844, 0],
					[995, 0],
					[1158, 0],
					[1334, 0]];
	}
}