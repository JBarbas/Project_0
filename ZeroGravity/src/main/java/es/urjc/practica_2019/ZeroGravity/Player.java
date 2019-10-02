package es.urjc.practica_2019.ZeroGravity;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import es.urjc.practica_2019.ZeroGravity.Edificios.*;
import es.urjc.practica_2019.ZeroGravity.Robots.*;

public class Player {

	private final WebSocketSession session;
	private static final int GRID_WIDTH = 20;
	private static final int GRID_HEIGHT = 20;
	private int[][] grid = new int[GRID_HEIGHT][GRID_WIDTH];
	private AtomicInteger edificioId = new AtomicInteger(0);
	private HashMap<Integer, Edificio> edificios = new HashMap<>();
	private CentroMando centroMando = new CentroMando(GRID_WIDTH/2, GRID_HEIGHT/2, edificioId.incrementAndGet());
	
	public Player(WebSocketSession session) {
		this.session = session;
		this.grid = createGrid(this.grid);
	}

	public WebSocketSession getSession() {
		return session;
	}
	
	public int[][] createGrid(int[][] grid) {
		//Primera generacion, con celdas bloqueadas, desbloqueadas y bordes
		int minGridSide = Math.min(GRID_WIDTH - 2, GRID_HEIGHT - 2);
		for (int i = 0; i < GRID_HEIGHT; i++) {
			for (int j = 0; j < GRID_WIDTH; j++) {
				if (i >= minGridSide/3 + 1 && i < 2*minGridSide/3  + 1 && j >= minGridSide/3  + 1 && j < 2*minGridSide/3  + 1) {
					grid[i][j] = 0;
				}
				else if (i == 0 || i == GRID_HEIGHT - 1 || j == 0 || j == GRID_WIDTH - 1) {
					grid[i][j] = -2;
				}
				else {
					grid[i][j] = -1;
				}
			}
		}
		
		//Introducimos el Centro de Mando
		edificios.put(this.centroMando.getId(), this.centroMando);
		grid = this.centroMando.build(grid, this.centroMando.getX(), this.centroMando.getY());		
		return grid;
	}
	
	public int[][] getGrid() {
		return this.grid;
	}
	
	public void build(int x, int y, String sprite, int id) {
		Edificio edificio = edificios.get(id);
		// Si se trata de un nuevo edificio hay que crearlo, asignarle un id y construirlo
		if (edificio == null) {
			switch(sprite) {
			case "centroDeMando":
				edificio = new CentroMando(x, y, edificioId.incrementAndGet());
				break;
			case "centroOperaciones":
				edificio = new CentroOperaciones(x, y, this.centroMando, edificioId.incrementAndGet());
				break;
			default:
				break;
			}
			edificios.put(edificio.getId(), edificio);
			int [][] newGrid = edificio.build(this.gridCopy(), x, y);
			if (newGrid != null) {
				this.grid = newGrid;
			}
		}
		else {
			int [][] newGrid = edificio.move(this.gridCopy(), x, y);
			if (newGrid != null) {
				edificio.setX(x);
				edificio.setY(y);
				this.grid = newGrid;
			}
		}
	}
	
	public int[][] gridCopy() {
		int[][] copy = new int[GRID_HEIGHT][GRID_WIDTH];
		for (int i = 0; i < this.grid.length; i++) {
			copy[i] = Arrays.copyOf(this.grid[i], this.grid[i].length);
		}
		return copy;
	}
	
	public Collection<Edificio> getEdificios() {
		return edificios.values();
	}
}
