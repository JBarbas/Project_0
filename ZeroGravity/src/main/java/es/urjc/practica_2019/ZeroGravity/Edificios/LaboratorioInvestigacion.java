package es.urjc.practica_2019.ZeroGravity.Edificios;

public class LaboratorioInvestigacion extends GeneradorRecursos {

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	private static final int[] nivel1 = { 1, 0, 0, 0 };
	private static final int[] nivel2 = { 2, 0, 0, 0 };
	private static final int[] nivel3 = { 3, 0, 0, 0 };
	private static final int[][] costs = { nivel1, nivel2, nivel3 };

	// Establecemos los recursos que generan según su nivel
	private final static int[] recursosNivel1 = { 0, 0 };
	private final static int[] recursosNivel2 = { 0, 0 };
	private final static int[] recursosNivel3 = { 0, 0 };
	private final static int[][] recursosGenerados = { recursosNivel1, recursosNivel2, recursosNivel3 };
	
	
	public LaboratorioInvestigacion(int x, int y, Edificio depends) {
		
		this.x = x;
		this.y = y;
		this.height = 0;
		this.width = 0;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "laboratorioInvestigacion";
	}

	@Override
	public void levelUp() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void showMenu() {
		// TODO Auto-generated method stub
		
	} 	
}
