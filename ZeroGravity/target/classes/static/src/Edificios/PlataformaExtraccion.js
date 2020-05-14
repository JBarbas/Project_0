class PlataformaExtraccion extends GeneradorRecursos{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
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
		this.recursos = [[4, 2],
						[100, 30],
						[225, 60]];
		this.costes = [[2, 0],
			[2, 0],
			[2, 0]];
	}
}