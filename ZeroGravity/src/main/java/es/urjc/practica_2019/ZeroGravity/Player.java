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
import org.bson.conversions.Bson;
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
	private HashMap<ObjectId, Oferta> ofertas = new HashMap<>();
	private LinkedList<GeneradorRecursos> generadoresRecursos = new LinkedList<>();
	private LinkedList<BloqueViviendas> viviendas = new LinkedList<>();
	private LinkedList<Generador> generadores = new LinkedList<>();
	private CentroMando centroMando = new CentroMando(GRID_WIDTH/2, GRID_HEIGHT/2, edificioId.incrementAndGet());
	private CentroAdministrativo centroAdministrativo = new CentroAdministrativo(this, 8, 8, centroMando, edificioId.incrementAndGet());
	private CentroComercio centroComercio = new CentroComercio(this, 8, 12, centroMando, edificioId.incrementAndGet());
	private CentroOperaciones centroOperaciones = new CentroOperaciones(this, 10, 7, centroMando, edificioId.incrementAndGet());
	
	private int energia = 0;
	private int metal = 100;
	private int ceramica = 100;	
	private int creditos = 1000;
	private int unionCoins = 0;
	private int colonos = 0;
	private int colonosMax = 0;
	private int puestosTrabajo = 0;
	private int puntuacion = 0;
	private int costeCelda = 100;
	private int celdasCompradas = 0;
	
	private boolean gameStarted = false;
	
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
		if (this.username == "admin") {
			creditos = 1000000;
			unionCoins = 1000;
			ceramica = 10000;	
			metal = 10000;
		}
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
	
	public boolean passwordMatches(String password) {
		byte[] oldPassword = password.getBytes();
		try {
			oldPassword = MessageDigest.getInstance("MD5").digest(oldPassword);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		Bson filter = new Document("name", this.getUsername()).append("password", oldPassword);
		Document myPlayer = WebsocketGameHandler.getColl().find(filter).first();
		if (myPlayer != null) {
			return true;
		}
		return false;
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
	
	public Collection<Oferta> getOfertas() {
		return ofertas.values();
	}
	
	public void addOferta(Oferta oferta) {
		ofertas.put(oferta.getId(), oferta);
	}
	
	public Oferta getOferta(ObjectId id) {	
		return ofertas.get(id);
	}
	
	public synchronized void deleteOferta(ObjectId id) {
		ofertas.remove(id);
		
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

	public synchronized int getEnergia() {
		energia = 0;
		for (Generador g : generadores) {
			energia += g.getEnergy();
		}
		
		int i = 0;
		for (Edificio e : edificios.values()) {
			e.setEnergia(0);
			while (e.needsEnergy() && i < energia) {
				e.addEnergy();
				i++;
			}
		}
		
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

	public int getPuntuacion() {
		return this.puntuacion;
	}
	
	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
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
					for (BloqueViviendas v : viviendas) {
						if (v.getColonos() < v.getCapacidad()) {
							v.setColonos(v.getColonos() + 1);
							break;
						}
					}
					break;
				}
			}
		}
		saveEdificios();
		saveRecursos();
	}
		
	public boolean isGameStarted() {
		return gameStarted;
	}

	public void setGameStarted(boolean gameStarted) {
		this.gameStarted = gameStarted;
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
		
		edificios.put(this.centroAdministrativo.getId(), this.centroAdministrativo);
		grid = this.centroAdministrativo.build(grid, this.centroAdministrativo.getX(), this.centroAdministrativo.getY());	

		edificios.put(this.centroComercio.getId(), this.centroComercio);
		grid = this.centroComercio.build(grid, this.centroComercio.getX(), this.centroComercio.getY());	
		
		edificios.put(this.centroOperaciones.getId(), this.centroOperaciones);
		grid = this.centroOperaciones.build(grid, this.centroOperaciones.getX(), this.centroOperaciones.getY());	
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
	
	public void updateOfertas(Collection<Document> ofertas) {
		Oferta oferta;
		for(Document o : ofertas) {
			oferta = new Oferta();
			oferta.setId(o.getObjectId("id"));
			oferta.setPlayerId(o.getObjectId("playerId"));
			oferta.setRecurso(o.getString("recurso"));
			oferta.setCantidad(o.getInteger("cantidad"));
			oferta.setCreditos(o.getInteger("creditos"));
			this.ofertas.put(oferta.getId(), oferta);
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
				edificio = new CentroOperaciones(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				break;
			case "centroAdministrativo":
				edificio = new CentroAdministrativo(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				break;
			case "bloqueViviendas":
				edificio = new BloqueViviendas(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				edificio.setLevel(e.getInteger("level", 1));
				((BloqueViviendas) edificio).setColonos(e.getInteger("colonos", 0));
				colonosMax += ((BloqueViviendas) edificio).getCapacidad();
				viviendas.add((BloqueViviendas) edificio);
				break;
			case "taller":
				edificio = new Taller(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				for (Document r : (Collection<Document>) e.get("robots")) {
					Robot robot = new RobotEstandar(r.getInteger("id"), (Taller) edificio);
					robot.setAusente(r.getBoolean("ausente"));
					robot.setNivel(r.getInteger("nivel"));
					robot.setCarga(r.getInteger("carga"));
					robot.setProductionBeginTime((Document) e.get("productionBeginTime"));
					((Taller) edificio).addRobot(robot);
				}
				((Taller) edificio).setRobotId(e.getInteger("robotId", 0));
				((GeneradorRecursos) edificio).setColonos(e.getInteger("colonos", 0));
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "plataformaExtraccion":
				edificio = new PlataformaExtraccion(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"), e.getBoolean("lleno"), e.getBoolean("produciendo"), (Document) e.get("productionBeginTime"));
				((GeneradorRecursos) edificio).setColonos(e.getInteger("colonos", 0));
				((GeneradorRecursos) edificio).setLevelProduciendo(e.getInteger("levelProduciendo", 1));
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "generador":
				edificio = new Generador(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				((GeneradorRecursos) edificio).setColonos(e.getInteger("colonos", 0));
				generadoresRecursos.add((GeneradorRecursos) edificio);
				generadores.add((Generador) edificio);
				break;
			case "laboratorioInvestigacion":
				edificio = new LaboratorioInvestigacion(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"), e.getBoolean("lleno"), e.getBoolean("produciendo"), (Document) e.get("productionBeginTime"));
				((GeneradorRecursos) edificio).setColonos(e.getInteger("colonos", 0));
				((GeneradorRecursos) edificio).setLevelProduciendo(e.getInteger("levelProduciendo", 1));
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "centroComercio":
				edificio = new CentroComercio(this, e.getInteger("x"), e.getInteger("y"), this.centroMando, e.getInteger("id"));
				break;
			default:
				break;
			}
			edificio.setLevel(e.getInteger("level", 1));
			edificio.setEnConstruccion(e.getBoolean("enConstruccion", false));
			edificio.setBuildingBeginTime((Document) e.get("buildingBeginTime")); 
			this.edificios.put(edificio.getId(), edificio);
		}
		saveEdificios();
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
				edificio = new CentroOperaciones(this, x, y, this.centroMando, edificioId.incrementAndGet());
				break;
			case "centroAdministrativo":
				edificio = new CentroAdministrativo(this, x, y, this.centroMando, edificioId.incrementAndGet());
				break;
			case "bloqueViviendas":
				edificio = new BloqueViviendas(this, x, y, this.centroMando, edificioId.incrementAndGet());
				//colonosMax += ((BloqueViviendas) edificio).getCapacidad();
				viviendas.add((BloqueViviendas) edificio);
				break;
			case "taller":
				edificio = new Taller(this, x, y, this.centroMando, edificioId.incrementAndGet());
				((Taller) edificio).addRobot(new RobotEstandar(((Taller) edificio).incrementAndGetRobotId(), ((Taller) edificio)));
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "plataformaExtraccion":
				edificio = new PlataformaExtraccion(this, x, y, this.centroMando, edificioId.incrementAndGet());
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "generador":
				edificio = new Generador(this, x, y, this.centroMando, edificioId.incrementAndGet());
				generadoresRecursos.add((GeneradorRecursos) edificio);
				generadores.add((Generador) edificio);
				break;
			case "laboratorioInvestigacion":
				edificio = new LaboratorioInvestigacion(this, x, y, this.centroMando, edificioId.incrementAndGet());
				generadoresRecursos.add((GeneradorRecursos) edificio);
				break;
			case "centroComercio":
				edificio = new CentroComercio(this, x, y, this.centroMando, edificioId.incrementAndGet());
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
		saveOfertas();
		savePuntuacion();
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
				dbEdificio.append("levelProduciendo", ((GeneradorRecursos) e).getLevelProduciendo());
				dbEdificio.append("colonos", ((GeneradorRecursos) e).getColonos());
				if (e instanceof Taller) {
					LinkedList<Document> dbRobots = new LinkedList<>(); // Bson para MongoDB
					for (Robot r : ((Taller) e).getRobots()) {
						Document dbRobot = new Document();
						dbRobot.append("id", r.getId());
						dbRobot.append("ausente", r.isAusente());
						dbRobot.append("nivel", r.getNivel());
						dbRobot.append("carga", r.getCarga());
						Document productionBeginTime = new Document();
						productionBeginTime.append("year", r.getProductionBeginTime().getYear());
						productionBeginTime.append("month", r.getProductionBeginTime().getMonthValue());
						productionBeginTime.append("day", r.getProductionBeginTime().getDayOfMonth());
						productionBeginTime.append("hour", r.getProductionBeginTime().getHour());
						productionBeginTime.append("minute", r.getProductionBeginTime().getMinute());
						dbRobot.append("productionBeginTime", productionBeginTime);
						dbRobots.add(dbRobot);
					}
					dbEdificio.append("robotId", ((Taller) e).getRobotId());
					dbEdificio.append("robots", dbRobots);
				}
				Document productionBeginTime = new Document();
				productionBeginTime.append("year", ((GeneradorRecursos) e).getProductionBeginTime().getYear());
				productionBeginTime.append("month", ((GeneradorRecursos) e).getProductionBeginTime().getMonthValue());
				productionBeginTime.append("day", ((GeneradorRecursos) e).getProductionBeginTime().getDayOfMonth());
				productionBeginTime.append("hour", ((GeneradorRecursos) e).getProductionBeginTime().getHour());
				productionBeginTime.append("minute", ((GeneradorRecursos) e).getProductionBeginTime().getMinute());
				dbEdificio.append("productionBeginTime", productionBeginTime);
			}
			else if (e instanceof BloqueViviendas) {
				dbEdificio.append("colonos", ((BloqueViviendas) e).getColonos());
			}
			dbEdificio.append("sprite", e.getSprite());
			dbEdificio.append("level", e.getLevel());
			dbEdificio.append("enConstruccion", e.isEnConstruccion());
			Document buildingBeginTime = new Document();
			buildingBeginTime.append("year", e.getBuildingBeginTime().getYear());
			buildingBeginTime.append("month", e.getBuildingBeginTime().getMonthValue());
			buildingBeginTime.append("day", e.getBuildingBeginTime().getDayOfMonth());
			buildingBeginTime.append("hour", e.getBuildingBeginTime().getHour());
			buildingBeginTime.append("minute", e.getBuildingBeginTime().getMinute());
			dbEdificio.append("buildingBeginTime", buildingBeginTime);
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
				.append("puestosTrabajo", this.puestosTrabajo)
				.append("gameStarted", this.gameStarted)));
	}
	
	public void savePuntuacion() {
		WebsocketGameHandler.getColl().updateOne(new Document("_id", getId()), new Document("$set", 
				new Document("puntuacion", this.puntuacion)));
	}
	
	public void saveOfertas() {
		LinkedList<Document> dbOfertas = new LinkedList<>(); //Bson para mongo
		for(Oferta o : this.getOfertas()) {
			Document dbOferta = new Document();
			dbOferta.append("id", o.getId());
			dbOferta.append("playerId", o.getPlayerId());
			dbOferta.append("recurso", o.getRecurso());
			dbOferta.append("cantidad", o.getCantidad());
			dbOferta.append("creditos", o.getCreditos());
			dbOfertas.add(dbOferta);
		}	
		WebsocketGameHandler.getColl().updateOne(new Document("_id", getId()), 
				new Document("$set", new Document("ofertas", dbOfertas)));
	}
}
