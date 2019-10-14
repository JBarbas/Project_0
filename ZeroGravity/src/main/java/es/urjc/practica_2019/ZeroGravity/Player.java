package es.urjc.practica_2019.ZeroGravity;

import java.io.IOException;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
	private LinkedList<GeneradorRecursos> generadoresRecursos = new LinkedList<>();
	private LinkedList<BloqueViviendas> viviendas = new LinkedList<>();
	private CentroMando centroMando = new CentroMando(GRID_WIDTH/2, GRID_HEIGHT/2, edificioId.incrementAndGet());
	
	private int energia = 100;
	private int metal = 100;
	private int ceramica = 100;	
	private int creditos = 1000;
	private int unionCoins = 100;
	private int colonos = 0;
	private int colonosMax = 0;
	private int puestosTrabajo = 0;
	
	private int costeCelda = 100;
	private int celdasCompradas = 0;
	
	private ObjectMapper mapper = new ObjectMapper();
	
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
	
	public Edificio getEdificio(int id) {
		return edificios.get(id);
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

	public int getColonos() {
		return colonos;
	}

	public void setColonos(int colonos) {
		this.colonos = colonos;
	}

	public int getColonosMax() {
		return colonosMax;
	}

	public void setColonosMax(int colonosMax) {
		this.colonosMax = colonosMax;
	}

	public void requestColonos() {
		getJobs();
		while (colonosMax - colonos > 0 && puestosTrabajo > 0) {
			for (GeneradorRecursos g : generadoresRecursos) {
				if (g.getJobs() >= 1) {
					g.addColono();
					colonos++;
					puestosTrabajo--;
					break;
				}
			}
		}
		saveRecursos();
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
	
	public int getJobs() {
		puestosTrabajo = 0;
		for (GeneradorRecursos g : generadoresRecursos) {
			puestosTrabajo += g.getJobs();
		}
		return puestosTrabajo;
	}
	
	public int getCosteCelda() {
		return costeCelda;
	}

	public void setCosteCelda(int costeCelda) {
		this.costeCelda = costeCelda;
	}

	public int getCeldasCompradas() {
		return celdasCompradas;
	}

	public void setCeldasCompradas(int celdasCompradas) {
		this.celdasCompradas = celdasCompradas;
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
	
	public void recolect(int id) {
		Edificio e = edificios.get(id);
		if (e instanceof GeneradorRecursos) {
			((GeneradorRecursos) e).recolectar();
			this.saveEdificios();
			this.saveRecursos();
		}
	}
	
	public void buyCell(int i, int j) {
		if (this.grid[i][j] < 0) {
			if (creditos >= costeCelda) {
				this.grid[i][j] = 0;
				creditos -= costeCelda;
				if (celdasCompradas < 20) {
					celdasCompradas++;
				}
				costeCelda = 100 * celdasCompradas * celdasCompradas;
			}
			else {
				ObjectNode msg = mapper.createObjectNode();
				msg.put("event", "CREDITOS INSUFICIENTES");
				msg.put("cantidad", costeCelda - creditos);
				try {
					this.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
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
			case "bloqueViviendas":
				edificio = new BloqueViviendas(e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				colonosMax += ((BloqueViviendas) edificio).getCapacidad();
				viviendas.add((BloqueViviendas) edificio);
				break;
			case "taller":
				edificio = new Taller(e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				((GeneradorRecursos) edificio).setColonos(e.getInteger("colonos", 0));
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "plataformaExtraccion":
				edificio = new PlataformaExtraccion(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"), e.getBoolean("lleno"), e.getBoolean("produciendo"), (Document) e.get("productionBeginTime"));
				((GeneradorRecursos) edificio).setColonos(e.getInteger("colonos", 0));
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "generador":
				edificio = new Generador(e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				break;
			case "laboratorioInvestigacion":
				edificio = new LaboratorioInvestigacion(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				((GeneradorRecursos) edificio).setColonos(e.getInteger("colonos", 0));
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "centroComercio":
				edificio = new CentroComercio(e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				break;
			default:
				break;
			}
			edificio.setLevel(e.getInteger("level", 1));
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
			case "bloqueViviendas":
				edificio = new BloqueViviendas(x, y, this.centroMando, edificioId.incrementAndGet());
				colonosMax += ((BloqueViviendas) edificio).getCapacidad();
				viviendas.add((BloqueViviendas) edificio);
				break;
			case "taller":
				edificio = new Taller(x, y, this.centroMando, edificioId.incrementAndGet());
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "plataformaExtraccion":
				edificio = new PlataformaExtraccion(this, x, y, this.centroMando, edificioId.incrementAndGet());
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "generador":
				edificio = new Generador(x, y, this.centroMando, edificioId.incrementAndGet());
				break;
			case "laboratorioInvestigacion":
				edificio = new LaboratorioInvestigacion(this, x, y, this.centroMando, edificioId.incrementAndGet());
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "centroComercio":
				edificio = new CentroComercio(x, y, this.centroMando, edificioId.incrementAndGet());
				break;
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
	
	public void saveAll() {

		saveGrid();
		saveEdificios();
		saveRecursos();
	}
	
	public void saveGrid() {
		LinkedList<Document> dbGrid = new LinkedList<>(); // Bson para MongoDB
		for (int i = 0; i < grid.length; i++) {
			Document dbGridColumn = new Document();
			for (int j = 0; j < grid[i].length; j++) {	
				dbGridColumn.append(Integer.toString(j), grid[i][j]);
			}
			dbGrid.add(dbGridColumn);
		}
		// Actualizamos la info en la BDD
		WebsocketGameHandler.getColl().updateOne(new Document("_id", getId()), new Document("$set", 
				new Document("grid", dbGrid)));
	}
	
	public void saveEdificios() {
		LinkedList<Document> dbEdificios = new LinkedList<>(); // Bson para MongoDB
		for (Edificio e : getEdificios()) {				
			// Bson para MongoDB
			Document dbEdificio = new Document();
			dbEdificio.append("id", e.getId());
			dbEdificio.append("x", e.getX());
			dbEdificio.append("y", e.getY());
			if (e instanceof GeneradorRecursos) {
				dbEdificio.append("lleno", ((GeneradorRecursos) e).isLleno());
				dbEdificio.append("produciendo", ((GeneradorRecursos) e).isProduciendo());
				dbEdificio.append("colonos", ((GeneradorRecursos) e).getColonos());
				Document productionBeginTime = new Document();
				productionBeginTime.append("year", ((GeneradorRecursos) e).getProductionBeginTime().getYear());
				productionBeginTime.append("month", ((GeneradorRecursos) e).getProductionBeginTime().getMonthValue());
				productionBeginTime.append("day", ((GeneradorRecursos) e).getProductionBeginTime().getDayOfMonth());
				productionBeginTime.append("hour", ((GeneradorRecursos) e).getProductionBeginTime().getHour());
				productionBeginTime.append("minute", ((GeneradorRecursos) e).getProductionBeginTime().getMinute());
				dbEdificio.append("productionBeginTime", productionBeginTime);
			}
			dbEdificio.append("sprite", e.getSprite());
			dbEdificio.append("level", e.getLevel());
			dbEdificios.add(dbEdificio);
		}
		// Actualizamos la info en la BDD
		WebsocketGameHandler.getColl().updateOne(new Document("_id", getId()), new Document("$set", 
				new Document("edificios", dbEdificios)
				.append("edificioId", getEdificioId())));
	}
	
	public void saveRecursos() {
		WebsocketGameHandler.getColl().updateOne(new Document("_id", getId()), new Document("$set", 
				new Document("energia", this.energia)
				.append("metal", this.metal)
				.append("ceramica", this.ceramica)
				.append("creditos", this.creditos)
				.append("unionCoins", this.unionCoins)
				.append("costeCelda", this.costeCelda)
				.append("celdasCompradas", this.celdasCompradas)
				.append("colonos", this.colonos)
				.append("colonosMax", this.colonosMax)
				.append("puestosTrabajo", this.puestosTrabajo)));
	}
}