package es.urjc.practica_2019.ZeroGravity.Edificios;

public class LaboratorioInvestigacion extends GeneradorRecursos {

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
		public static final int[] NIVEL1 = { 1, 0, 0, 0 };
		public static final int[] NIVEL2 = { 2, 0, 0, 0 };
		public static final int[] NIVEL3 = { 3, 0, 0, 0 };
		public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};
		
		//Establecemos los recursos que generan según su nivel
		private final static int[] RECURSOS_NIVEL1 = {0, 0};
		private final static int[] RECURSOS_NIVEL2 = {0, 0};
		private final static int[] RECURSOS_NIVEL3 = {0, 0};
		private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3};
	
	
	public LaboratorioInvestigacion(int x, int y, Edificio depends, int id) {
		
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "laboratorioInvestigacion";
	}
	
	public LaboratorioInvestigacion(int id) {
		
		this.id = id;
		
		this.height = 1;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "laboratorioInvestigacion";
	}
}
