package es.urjc.practica_2019.ZeroGravity;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.concurrent.atomic.AtomicInteger;

import javax.crypto.Cipher;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.sun.corba.se.impl.oa.poa.ActiveObjectMap.Key;

import es.urjc.practica_2019.ZeroGravity.Edificios.*;
import es.urjc.practica_2019.ZeroGravity.Robots.*;

public class Player {

	@Id
	private ObjectId id;
	private final WebSocketSession session;
	private String username;
	private String email;
	private byte[] password;
	private static final int GRID_WIDTH = 20;
	private static final int GRID_HEIGHT = 20;
	private int[][] grid = new int[GRID_HEIGHT][GRID_WIDTH];
	private AtomicInteger edificioId = new AtomicInteger(0);
	private HashMap<Integer, Edificio> edificios = new HashMap<>();
	private CentroMando centroMando = new CentroMando(GRID_WIDTH/2, GRID_HEIGHT/2, edificioId.incrementAndGet());
	
	private int energia = 100;
	private int metal = 100;
	private int ceramica = 100;	
	private int creditos = 100;
	private int unionCoins = 100;
	
	public Player(WebSocketSession session, ObjectId id) {
		this.session = session;
		this.id = id;
		this.grid = createGrid(this.grid);
	}

	public WebSocketSession getSession() {
		return session;
	}
	
	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public byte[] getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password.getBytes();
		try {
			this.password = MessageDigest.getInstance("MD5").digest(getPassword());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public int getEdificioId() {
		return edificioId.get();
	}
	
	public void setEdificioId(int id) {
		this.edificioId.set(id);
	}
	
	public Collection<Edificio> getEdificios() {
		return edificios.values();
	}

	public int getMetal() {
		return metal;
	}

	public void setMetal(int metal) {
		this.metal = metal;
	}

	public int getCeramica() {
		return ceramica;
	}

	public void setCeramica(int ceramica) {
		this.ceramica = ceramica;
	}

	public int getEnergia() {
		return energia;
	}

	public void setEnergia(int energia) {
		this.energia = energia;
	}

	public int getCreditos() {
		return creditos;
	}

	public void setCreditos(int creditos) {
		this.creditos = creditos;
	}

	public int getUnionCoins() {
		return unionCoins;
	}

	public void setUnionCoins(int unionCoins) {
		this.unionCoins = unionCoins;
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
	
	public void updateGrid(Collection<Document> grid) {
		int i = 0;
		for (Document row : grid) {
			for (int j = 0; j < GRID_WIDTH; j++) {
				this.grid[i][j] = row.getInteger(Integer.toString(j), 0);
			}
			i++;
		}
	}
	
	public void updateEdificios(Collection<Document> edificios) {
		for (Document e : edificios) {
			Edificio edificio = new Edificio();
			switch (e.getString("sprite")) {
			case "centroDeMando":
				edificio = new CentroMando(e.getInteger("x"), e.getInteger("y"), e.getInteger("id"));
				break;
			case "centroOperaciones":
				edificio = new CentroOperaciones(e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				break;
			case "centroAdministrativo":
				edificio = new CentroAdministrativo(e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				break;
			case "taller":
				edificio = new Taller(e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				break;
			default:
				break;
			}
			this.edificios.put(edificio.getId(), edificio);
		}
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
			case "centroAdministrativo":
				edificio = new CentroAdministrativo(x, y, this.centroMando, edificioId.incrementAndGet());
				break;
			case "taller":
				edificio = new Taller(x, y, this.centroMando, edificioId.incrementAndGet());
			default:
				break;
			}
			int [][] newGrid = edificio.build(this.gridCopy(), x, y);
			if (newGrid != null) {
				this.grid = newGrid;
				edificios.put(edificio.getId(), edificio);
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
}
