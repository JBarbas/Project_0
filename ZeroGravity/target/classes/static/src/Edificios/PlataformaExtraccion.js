class PlataformaExtraccion extends GeneradorRecursos{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 0;
		super.levelMax = 15;
		super.numColonos = 0;
		super.sprite = 'plataformaExtraccion';
		super.sprites = ['pde1', 'pde1', 'pde1', 'pde1',
			'pde2', 'pde2', 'pde2', 'pde2', 'pde2',
			'pde3', 'pde3', 'pde3', 'pde3', 'pde3',
			'pde4'];
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'PlataformaExtraccionMenu';
		super.listImage = 'assets/sprites/Edificios/Plataforma_';
		super.nameEsp = 'Plataforma de extracción';
		super.nameEng = 'Extraction platform';
		super.resourceSprite = 'clayIcon';
		this.recursos = [[4, 120],
						[6, 270],
						[10, 480],
						[10, 900],
						[14, 1680],
						[18, 3240],
						[22, 5280],
						[26, 7800],
						[30, 10800],
						[36, 15120],
						[42, 20160],
						[48, 25920],
						[54, 32400],
						[60, 39600],
						[70, 50400]];
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