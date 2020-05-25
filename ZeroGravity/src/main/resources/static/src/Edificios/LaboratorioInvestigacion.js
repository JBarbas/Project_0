class LaboratorioInvestigacion extends GeneradorRecursos {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 2;
		super.level = 0;
		super.levelMax = 6;
		super.numColonos = 0;
		super.sprite = 'laboratorioInvestigacion';
		super.sprites = ['lab1', 'lab1',
			'lab2', 'lab2', 'lab2',
			'lab3'];
		super.buildingSprite = 'enConstruccion2';
		super.menuScene = 'LaboratorioInvestigacionMenu';
		super.listImage = 'assets/sprites/Edificios/Laboratorio1.png';
		super.nameEsp = 'Laboratorio de investigación';
		super.nameEng = 'Research laboratory';
		super.resourceSprite = 'creditIcon';
		super.originX = 0.67;
		this.recursos = [[4, 2],
						[100, 30],
						[100, 30],
						[100, 30],
						[100, 30],
						[225, 60]];
		this.costes = [[2, 0],
			[16, 0],
			[43, 0],
			[83, 0],
			[134, 0],
			[198, 0]];
	}
}