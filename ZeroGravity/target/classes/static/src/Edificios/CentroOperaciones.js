class CentroOperaciones extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 0;
		super.levelMax = 5;
		super.numColonos = 0;
		super.sprite = 'centroOperaciones';
		super.sprites = ['cOperaciones1', 'cOperaciones1',
			'cOperaciones2', 'cOperaciones2',
			'cOperaciones3'];
		super.buildingSprite = 'enConstruccion1';
		super.listImage = 'assets/sprites/Edificios/Operaciones.png';
		super.nameEsp = 'Centro de operaciones';
		super.nameEng = 'Operations center';
		super.menuScene = 'CentroOperacionesMenu';
		this.costes = [[2, 0],
			[16, 0],
			[43, 0],
			[83, 0],
			[134, 0]];
	}
}