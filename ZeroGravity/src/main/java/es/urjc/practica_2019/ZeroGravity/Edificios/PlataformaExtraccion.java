package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

import org.bson.Document;
import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;

public class PlataformaExtraccion extends GeneradorRecursos {
	
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] NIVEL1 = { 3, 0, 0, 0, 2};
	public static final int[] NIVEL2 = { 8, 0, 0, 0, 11};
	public static final int[] NIVEL3 = { 13, 0, 0, 0, 28};
	public static final int[] NIVEL4 = { 18, 0, 0, 0, 52};
	public static final int[] NIVEL5 = { 23, 0, 0, 0, 84};
	public static final int[] NIVEL6 = { 29, 0, 0, 0, 122};
	public static final int[] NIVEL7 = { 34, 0, 0, 0, 169};
	public static final int[] NIVEL8 = { 39, 0, 0, 0, 222};
	public static final int[] NIVEL9 = { 44, 0, 0, 0, 283};
	public static final int[] NIVEL10 = { 49, 0, 0, 0, 351};
	public static final int[] NIVEL11 = { 54, 0, 0, 0, 427};
	public static final int[] NIVEL12 = { 59, 0, 0, 0, 510};
	public static final int[] NIVEL13 = { 64, 0, 0, 0, 600};
	public static final int[] NIVEL14 = { 69, 0, 0, 0, 698};
	public static final int[] NIVEL15 = { 75, 0, 0, 0, 803};
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3, NIVEL4, NIVEL5,
										  NIVEL6, NIVEL7, NIVEL8, NIVEL9, NIVEL10,
										  NIVEL11, NIVEL12, NIVEL13, NIVEL14, NIVEL15};
	
	//Establecemos los recursos que generan según su nivel
	//recurso, tiempo(minutos), colonos
	private final static int[] RECURSOS_NIVEL1 = {4, 2, 1};
	private final static int[] RECURSOS_NIVEL2 = {100, 30, 4};
	private final static int[] RECURSOS_NIVEL3 = {225, 60, 7};
	private final static int[] RECURSOS_NIVEL4 = {225, 60, 10};
	private final static int[] RECURSOS_NIVEL5 = {225, 60, 13};
	private final static int[] RECURSOS_NIVEL6 = {225, 60, 17};
	private final static int[] RECURSOS_NIVEL7 = {225, 60, 20};
	private final static int[] RECURSOS_NIVEL8 = {225, 60, 23};
	private final static int[] RECURSOS_NIVEL9 = {225, 60, 26};
	private final static int[] RECURSOS_NIVEL10 = {225, 60, 29};
	private final static int[] RECURSOS_NIVEL11 = {225, 60, 32};
	private final static int[] RECURSOS_NIVEL12 = {225, 60, 35};
	private final static int[] RECURSOS_NIVEL13 = {225, 60, 38};
	private final static int[] RECURSOS_NIVEL14 = {225, 60, 41};
	private final static int[] RECURSOS_NIVEL15 = {225, 60, 45};
	private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3,
														RECURSOS_NIVEL4, RECURSOS_NIVEL5, RECURSOS_NIVEL6,
														RECURSOS_NIVEL7, RECURSOS_NIVEL8, RECURSOS_NIVEL9,
														RECURSOS_NIVEL10, RECURSOS_NIVEL11, RECURSOS_NIVEL12,
														RECURSOS_NIVEL13, RECURSOS_NIVEL14, RECURSOS_NIVEL15};
	
	private ObjectMapper mapper = new ObjectMapper();
	
public PlataformaExtraccion(Player player, int x, int y, Edificio depends, int id) {
		
		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "plataformaExtraccion";
		this.producir();
	}

	public PlataformaExtraccion(int id) {
		
		this.player = null;
		this.id = id;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "plataformaExtraccion";
		this.producir();
	}

	public PlataformaExtraccion(Player player, int x, int y, Edificio depends, int id, boolean lleno, boolean produciendo, Document date) {
		
		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "plataformaExtraccion";
		this.setLleno(lleno);
		this.setProduciendo(produciendo);
		int year = date.getInteger("year");
		int month = date.getInteger("month");
		int day = date.getInteger("day");
		int hour = date.getInteger("hour");
		int minute = date.getInteger("minute");
		this.setProductionBeginTime(LocalDateTime.of(year, month, day, hour, minute));
		
		if (!this.isLleno() && !this.isProduciendo()) {
			this.producir();
		}
	}
	
	@Override
	public void addColono() {
		if (this.getJobs() > 0 && this.player.getColonosMax() - this.player.getColonos() > 0) {
			this.setColonos(this.getColonos() + 1);
			this.player.addColono();
			if (this.getColonos() >= this.RECURSOS_GENERADOS[this.level-1][2]) {
				producir();
			}
		}
	}
	
	@Override
	public void quitarColono() {
		if (this.getColonos() > 0) {
			this.setColonos(this.getColonos() - 1);
			this.player.quitarColono();
		}
	}
	
	@Override
	public String getColonosString() {
		return this.getColonos() + "/" + this.RECURSOS_GENERADOS[this.level-1][2];
	}
	
	@Override
	public boolean needsEnergy() {		
		if (!this.isEnConstruccion()) {
			return this.getEnergia() < PlataformaExtraccion.COSTS[this.level-1][0];
		}
		else {
			return false;
		}
	}
	
	@Override
	public void addEnergy() {
		this.setEnergia(this.getEnergia()+1);
		if (!this.needsEnergy()) {
			this.producir();
		}
	}
	
	@Override
	public void producir() {
		if (this.getColonos() >= this.RECURSOS_GENERADOS[this.level-1][2] && !this.needsEnergy() && !this.getProduciendo()) {
			ObjectNode msg = mapper.createObjectNode();
			msg.put("event", "EDIFICIO PRODUCIENDO");
			msg.put("id", this.id);
			try {
				if (player.getSession().isOpen()) {				
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
			} catch (IOException e) {
				System.err.println("Exception sending message " + msg.toString());
				e.printStackTrace(System.err);
			}
			msg.put("event", "EDIFICIO LLENO");
			Task task = null;
			Thread callback = new Thread(() -> this.callbackProducir());
			callback.start();
			task = new Task(this.player, this.RECURSOS_GENERADOS[this.level-1][1], msg, callback);
			task.setId(player.getId().toString() + this.id + 1); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
			TASKMASTER.addTask(task);
			this.setProduciendo(true);
			this.setProductionBeginTime(task.getBeginDate());
			this.setLevelProduciendo(this.getLevel());
			player.saveEdificios();
		}
	}
	
	@Override
	public void callbackProducir() {
		try {
			Thread.currentThread().join();
		} catch (InterruptedException e) {
			System.out.println("Plataforma de Extracción " + id + " ha producido");
			if (this.player.getSession().isOpen()) {
				this.setLleno(true);
				this.setProduciendo(false);
				this.player.saveEdificios();				
			}
			else {
				Player p = WebsocketGameHandler.getPlayers().get(this.player.getId());
				if (p != null) {
					((GeneradorRecursos) p.getEdificio(this.getId())).setLleno(true);
					((GeneradorRecursos) p.getEdificio(this.getId())).setProduciendo(false);
					p.saveEdificios();
				}
			}
		}
	}
	
	@Override
	public void recolectar() {
		if (this.isLleno()) {
			this.setLleno(false);	
			ObjectNode msg = mapper.createObjectNode();			
			msg.put("event", "CERAMICA RECOLECTADA");
			player.setCeramica(player.getCeramica() + PlataformaExtraccion.RECURSOS_GENERADOS[this.getLevelProduciendo()-1][0]);
			msg.put("ceramica", player.getCeramica());
			try {	
				if (player.getSession().isOpen()) {				
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
			} catch (IOException e) {
				System.err.println("Exception sending message " + msg.toString());
				e.printStackTrace(System.err);
			}
			this.producir();
		}
	}
	
	@Override
	public int getJobs() {
		if (!this.isEnConstruccion()) {
			return this.RECURSOS_GENERADOS[this.level-1][2] - this.getColonos();
		}
		else {
			return 0;
		}
	}
	
	@Override
	public int[][] build(int[][] grid, int x, int y) {
		for (int i = y - this.getHeight() + 1; i <= y; i++) {
			for (int j = x - this.getWidth() + 1; j <= x; j++) {
				if (i > 0 && i < grid.length) {
					if (j > 0 && j < grid[i].length) {
						if (grid[i][j] == 0) {
							grid[i][j] = this.id;
						} else {
							return null;
						}
					} else {
						return null;
					}
				} else {
					return null;
				}
			}
		}
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "CONSTRUYENDO EDIFICIO");
		msg.put("id", this.getId());
		try {
			if (player.getSession().isOpen()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
		msg.put("event", "EDIFICIO CONSTRUIDO");
		msg.put("jobs", this.getJobs());
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, PlataformaExtraccion.COSTS[this.getLevel() - 1][4], msg, callback);
		task.setId(player.getId().toString() + this.id + 0); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
		TASKMASTER.addTask(task);
		this.setEnConstruccion(true);
		this.setBuildingBeginTime(task.getBeginDate());
		return grid;
	}

	public void callbackConstruir() {
		try {
			Thread.currentThread().join();
		} catch (InterruptedException e) {
			if (this.player.getSession().isOpen()) {
				this.setEnConstruccion(false);
				this.player.saveEdificios();
				this.player.getEnergia();
			} else {
				Player p = WebsocketGameHandler.getPlayers().get(this.player.getId());
				if (p != null) {
					p.getEdificio(this.getId()).setEnConstruccion(false);
					p.saveEdificios();
					p.getEnergia();
				}
			}
		}
	}
	
	@Override
	public void logInUpdate() {
		if (player.getSession() != null) {
			if (this.enConstruccion) {
				ObjectNode msg = mapper.createObjectNode();
				msg.put("event", "EDIFICIO CONSTRUIDO");
				msg.put("id", this.getId());
				try {
					if (player.getSession().isOpen()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				} catch (IOException e) {
					System.err.println("Exception sending message " + msg.toString());
					e.printStackTrace(System.err);
				}
				Task task = null;
				Thread callback = new Thread(() -> this.callbackConstruir());
				task = new Task(this.player, BloqueViviendas.COSTS[this.getLevel() - 1][4], msg, callback);
				task.setId(player.getId().toString() + this.id + 0); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
				task.setBeginDate(buildingBeginTime);
				if (TASKMASTER.addTask(task)) {
					callback.start();
				}
			}
			else if (this.isProduciendo()){
				ObjectNode msg = mapper.createObjectNode();
				msg.put("event", "EDIFICIO LLENO");
				msg.put("id", this.id);
				try {
					if (player.getSession().isOpen()) {				
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				} catch (IOException e) {
					System.err.println("Exception sending message " + msg.toString());
					e.printStackTrace(System.err);
				}
				Task task = null;
				Thread callback = new Thread(() -> this.callbackProducir());
				task = new Task(this.player, this.RECURSOS_GENERADOS[this.level-1][1], msg, callback);
				task.setId(player.getId().toString() + this.id + 1); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
				task.setBeginDate(this.getProductionBeginTime());
				if (TASKMASTER.addTask(task)) {
					callback.start();				
				}
			}
			player.saveEdificios();
		}
	}
}
