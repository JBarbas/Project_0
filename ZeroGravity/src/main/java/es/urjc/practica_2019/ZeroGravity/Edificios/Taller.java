package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.util.LinkedList;
import java.util.List;

import es.urjc.practica_2019.ZeroGravity.Robots.Robot;

public class Taller extends GeneradorRecursos{

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] nivel1 = { 1, 2, 3, 4 };
	public static final int[] nivel2 = { 5, 6, 7, 8 };
	public static final int[] nivel3 = { 9, 10, 11, 12 };
	public static final int[][] COSTS = { nivel1, nivel2, nivel3 };

	// Establecemos los recursos que generan según su nivel
	private final static int[] recursosNivel1 = { 0, 0 };
	private final static int[] recursosNivel2 = { 0, 0 };
	private final static int[] recursosNivel3 = { 0, 0 };
	private final static int[][] recursosGenerados = { recursosNivel1, recursosNivel2, recursosNivel3 };
	
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
}
