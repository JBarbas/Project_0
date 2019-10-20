class Taller extends GeneradorRecursos {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 2;
		super.width = 1;
		super.level = 1;
		super.sprite = 'taller';
		super.buildingSprite = 'enConstruccion3';
		super.menuScene = 'TallerMenu';
		super.originX = 0.32;
		this.robots = new Map();
		super.resourceSprite = 'metalIcon';
		this.costes = [[5, 0],
			[5, 0],
			[5, 0]];
	}
}