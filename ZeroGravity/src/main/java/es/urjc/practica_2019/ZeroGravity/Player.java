package es.urjc.practica_2019.ZeroGravity;

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
		CentroMando cm = new CentroMando(GRID_WIDTH/2, GRID_HEIGHT/2, edificioId.incrementAndGet());
		edificios.put(cm.getId(), cm);
		grid[cm.getY()][cm.getX()] = 1;
		grid[cm.getY() - 1][cm.getX()] = -10;
		grid[cm.getY() - 1][cm.getX() - 1] = -10;
		grid[cm.getY()][cm.getX() - 1] = -10;
		
		return grid;
	}
	
	public int[][] getGrid() {
		return this.grid;
	}
	
	public void build(int i, int j, String sprite, int id) {
		Edificio edificio = edificios.get(id);
		// Si se trata de un nuevo edificio hay que crearlo y asignarle un id
		if (edificio == null) {
			switch(sprite) {
			case "centroDeMando":
				edificio = new CentroMando(edificioId.incrementAndGet());
				break;
			case "centroOperaciones":
				edificio = new CentroOperaciones(edificioId.incrementAndGet());
				break;
			default:
				break;
			}
		}
		switch (edificio.getSprite()) {
		case "centroOperaciones":
			if (this.grid[i][j] == 0) {
				this.grid[i][j] = 2;
				if (edificios.get(edificio.getId()) == null) {
					edificios.put(edificio.getId(), edificio);
					edificio.setX(j);
					edificio.setY(i);
				}
				else {
					this.grid[edificio.getX()][edificio.getY()] = 0;
					this.grid[i][j] = 2;
				}
			}
			break;
		case "centroDeMando":
			if (this.grid[i][j] == 0 && this.grid[i-1][j] == 0 && this.grid[i-1][j-1] == 0 && this.grid[i][j-1] == 0) {
				this.grid[i][j] = 1;
				this.grid[i-1][j] = -10;
				this.grid[i-1][j-1] = -10;
				this.grid[i][j-1] = -10;
				if (edificios.get(edificio.getId()) == null) {
					edificios.put(edificio.getId(), edificio);
					edificio.setX(j);
					edificio.setY(i);
				}
				else {
					this.grid[edificio.getY()][edificio.getX()] = 0;
					this.grid[edificio.getY()-1][edificio.getX()] = 0;
					this.grid[edificio.getY()-1][edificio.getX()-1] = 0;
					this.grid[edificio.getY()][edificio.getX()-1] = 0;
					this.grid[i][j] = 1;
					this.grid[i-1][j] = -10;
					this.grid[i-1][j-1] = -10;
					this.grid[i][j-1] = -10;
				}
			}
			break;
		default:
			break;
		}
	}
	
	public Collection<Edificio> getEdificios() {
		return edificios.values();
	}
}
