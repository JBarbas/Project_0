package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.io.IOException;
import java.time.LocalDateTime;

import org.bson.Document;
import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.*;

public class LaboratorioInvestigacion extends GeneradorRecursos {

		private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;
	
	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
		public static final int[] NIVEL1 = { 4, 0, 0, 0, 2};
		public static final int[] NIVEL2 = { 8, 0, 0, 0, 16};
		public static final int[] NIVEL3 = { 13, 0, 0, 0, 43};
		public static final int[] NIVEL4 = { 17, 0, 0, 0, 83};
		public static final int[] NIVEL5 = { 22, 0, 0, 0, 134};
		public static final int[] NIVEL6 = { 26, 0, 0, 0, 198};
		public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3, NIVEL4, NIVEL5, NIVEL6};
		
		//Establecemos los recursos que generan según su nivel
		//recurso, tiempo(minutos), colonos
		private final static int[] RECURSOS_NIVEL1 = {0, 0, 5};
		private final static int[] RECURSOS_NIVEL2 = {0, 0, 8};
		private final static int[] RECURSOS_NIVEL3 = {0, 0, 12};
		private final static int[] RECURSOS_NIVEL4 = {0, 0, 15};
		private final static int[] RECURSOS_NIVEL5 = {0, 0, 19};
		private final static int[] RECURSOS_NIVEL6 = {0, 0, 22};
		private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3, 
															RECURSOS_NIVEL4, RECURSOS_NIVEL5, RECURSOS_NIVEL6};
	
		private ObjectMapper mapper = new ObjectMapper();
		
	public LaboratorioInvestigacion(Player player, int x, int y, Edificio depends, int id) {
		
		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 2;
		this.level = 0;
		this.buildingDependsOn = depends;
		this.sprite = "laboratorioInvestigacion";
		//this.producir();
		this.maxLevel = 6;
	}
	
	public LaboratorioInvestigacion(int id) {
		
		this.id = id;	
		this.height = 1;
		this.width = 2;
		this.level = 0;
		this.buildingDependsOn = null;
		this.sprite = "laboratorioInvestigacion";
		//this.producir();
		this.maxLevel = 6;
	}
	
	public LaboratorioInvestigacion(Player player, int x, int y, Edificio depends, int id, boolean lleno, boolean produciendo, Document date) {
		
		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 2;
		this.level = 0;
		this.maxLevel = 15;
		this.buildingDependsOn = depends;
		this.sprite = "laboratorioInvestigacion";
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
		if (this.getLevel() > 0) {
			this.setColonos(this.getColonos() + 1);
			if (this.getColonos() >= this.RECURSOS_GENERADOS[this.level-1][2]) {
				producir();
			}
		}
	}
	
	@Override
	public String getColonosString() {
		if (this.getLevel() > 0) {
			return this.getColonos() + "/" + this.RECURSOS_GENERADOS[this.level-1][2];
		}
		else {
			return "";
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
		if (!this.enConstruccion && this.getLevel() > 0) {
			if (this.getColonos() >= this.RECURSOS_GENERADOS[this.level-1][2] && !this.needsEnergy() && !this.getProduciendo() && !this.isLleno() && !this.isEnConstruccion()) {
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
	}
	
	@Override
	public void callbackProducir() {
		try {
			Thread.currentThread().join();
		} catch (InterruptedException e) {
			System.out.println("Laboratorio Investigación " + id + " ha producido");
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
			msg.put("event", "CREDITOS RECOLECTADOS");
			player.setCreditos(player.getCreditos() + LaboratorioInvestigacion.RECURSOS_GENERADOS[this.getLevelProduciendo()-1][0]);
			msg.put("creditos", player.getCreditos());
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
		if (!this.isEnConstruccion() && this.getLevel() > 0) {
			return this.RECURSOS_GENERADOS[this.level-1][2] - this.getColonos();
		}
		else {
			return 0;
		}
	}
	
	@Override
	public boolean needsEnergy() {		
		if (!this.isEnConstruccion() && this.getLevel() > 0) {
			return this.getEnergia() < LaboratorioInvestigacion.COSTS[this.level-1][0];
		}
		else {
			return false;
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
		msg.put("construccionDateYear", this.getBuildingBeginTime().getYear());
		msg.put("construccionDateMonth", this.getBuildingBeginTime().getMonthValue());
		msg.put("construccionDateDay", this.getBuildingBeginTime().getDayOfMonth());
		msg.put("construccionDateHour", this.getBuildingBeginTime().getHour());
		msg.put("construccionDateMinute", this.getBuildingBeginTime().getMinute());
		try {
			if (player.getSession().isOpen()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
		msg.put("event", "EDIFICIO CONSTRUIDO");
		msg.put("level", this.getLevel()+1);
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, LaboratorioInvestigacion.COSTS[this.getLevel()][4], msg, callback);
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
			this.setLevel(this.getLevel()+1);
			if (this.player.getSession().isOpen()) {
				this.setEnConstruccion(false);
				this.player.saveEdificios();
				this.player.getEnergia();
				WebsocketGameHandler.updateInfo(player, "REFRESH GRID", player.getSession());
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
	public void levelUp() {
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "EDIFICIO CONSTRUIDO");
		msg.put("id", this.getId());
		msg.put("level", this.getLevel()+1);
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, LaboratorioInvestigacion.COSTS[this.getLevel()][4], msg.deepCopy(), callback);
		task.setId(player.getId().toString() + this.id + 0); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
		TASKMASTER.addTask(task);
		this.setEnConstruccion(true);
		this.setBuildingBeginTime(task.getBeginDate());
		msg.put("event", "CONSTRUYENDO EDIFICIO");
		msg.put("construccionDateYear", this.getBuildingBeginTime().getYear());
		msg.put("construccionDateMonth", this.getBuildingBeginTime().getMonthValue());
		msg.put("construccionDateDay", this.getBuildingBeginTime().getDayOfMonth());
		msg.put("construccionDateHour", this.getBuildingBeginTime().getHour());
		msg.put("construccionDateMinute", this.getBuildingBeginTime().getMinute());
		try {
			if (player.getSession().isOpen()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
	}
	
	@Override
	public void logInUpdate() {
		if (player.getSession() != null) {
			if (this.enConstruccion) {
				ObjectNode msg = mapper.createObjectNode();
				msg.put("event", "EDIFICIO CONSTRUIDO");
				msg.put("level", this.getLevel()+1);
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
				task = new Task(this.player, LaboratorioInvestigacion.COSTS[this.getLevel()][4], msg, callback);
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
