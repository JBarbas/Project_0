class LaboratorioInvestigacion extends GeneradorRecursos {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 2;
		super.level = 1;
		super.sprite = 'laboratorioInvestigacion';
		super.menuScene = 'LaboratorioInvestigacionMenu';
		super.resourceSprite = '';
		super.originX = 0.67;
		this.recursos = [[0, 0],
						[0, 0],
						[0, 0]];
	}
}