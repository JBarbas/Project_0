package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.util.LinkedList;
import java.util.List;

import es.urjc.practica_2019.ZeroGravity.Robots.Robot;

public class Taller extends GeneradorRecursos{

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
	
	private int capacidadRobots;
	private List<Robot> robots = new LinkedList<Robot>();
	
	public Taller(int x, int y, Edificio depends, int id) {
		
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "taller";	
	}
	
	public Taller(int id) {

		this.id = id;
		this.x = 0;
		this.y = 0;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "taller";
	}
	
	public int getCapacidadRobots() {
		return capacidadRobots;
	}

	public void setCapacidadRobots(int capacidadRobots) {
		this.capacidadRobots = capacidadRobots;
	}

	public void mostrarRobots() {
		
	}
	
	@Override
	public boolean needsEnergy() {
		return this.getEnergia() < this.COSTS[this.level-1][0];
	}
}
