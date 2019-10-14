package es.urjc.practica_2019.ZeroGravity.Edificios;

import es.urjc.practica_2019.ZeroGravity.Player;

public class Generador extends GeneradorRecursos {

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] NIVEL1 = { 0, 0, 0, 0 };
	public static final int[] NIVEL2 = { 0, 0, 0, 0 };
	public static final int[] NIVEL3 = { 0, 0, 0, 0 };
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};
	
	//Establecemos los recursos que generan según su nivel
	private final static int[] RECURSOS_NIVEL1 = {5, 0, 1};
	private final static int[] RECURSOS_NIVEL2 = {12, 0, 2};
	private final static int[] RECURSOS_NIVEL3 = {16, 0, 3};
	private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3};
	
	public Generador(Player player, int x, int y, Edificio depends, int id) {
		
		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "generador";
		
	}
	
	public Generador(int id) {
		
		this.id = id;
		this.height = 1;
		this.width =1;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "generador";
		
	}
	
	@Override
	public String getColonosString() {
		return this.getColonos() + "/" + this.RECURSOS_GENERADOS[this.level-1][2];
	}
	
	public int getEnergy() {
		return this.getColonos()  * this.RECURSOS_GENERADOS[this.level-1][0] / this.RECURSOS_GENERADOS[this.level-1][2];
	}
	
	@Override
	public int getJobs() {
		return this.RECURSOS_GENERADOS[this.level-1][2] - this.getColonos();
	}
}
