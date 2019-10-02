package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.util.LinkedList;
import java.util.List;

import es.urjc.practica_2019.ZeroGravity.Robots.Robot;

public class Taller extends GeneradorRecursos{

	private final static int[] nivel1 = {0, 0};
	private final static int[] nivel2 = {0, 0};
	private final static int[] nivel3 = {0, 0};
	private final static int [][] recursosGenerados = {nivel1, nivel2, nivel3};
	
	private int capacidadRobots;
	private List<Robot> robots = new LinkedList<Robot>();
	
	public Taller(int x, int y, Edificio depends) {
		
		this.x = x;
		this.y = y;
		this.height = 0;
		this.width = 0;
		this.level = 1;
		this.buildingDependsOn = depends;
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
	public boolean move(int x, int y) {
		// TODO Auto-generated method stub
		return false;
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
