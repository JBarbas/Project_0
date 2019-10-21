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
	public static final int[] NIVEL1 = { 1, 10, 15, 300, 2};
	public static final int[] NIVEL2 = { 4, 120, 200, 450, 2};
	public static final int[] NIVEL3 = { 8, 550, 800, 1650, 2};
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};
	
	//Establecemos los recursos que generan según su nivel
	//recurso, tiempo(minutos), colonos
	private final static int[] RECURSOS_NIVEL1 = {4, 2, 1};
	private final static int[] RECURSOS_NIVEL2 = {100, 30, 2};
	private final static int[] RECURSOS_NIVEL3 = {225, 60, 3};
	private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3};
	
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
		this.setColonos(this.getColonos() + 1);
		if (this.getColonos() >= this.RECURSOS_GENERADOS[this.level-1][2]) {
			producir();
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
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, PlataformaExtraccion.COSTS[this.getLevel() - 1][4], msg, callback);
		TASKMASTER.addTask(task);
		this.setEnConstruccion(true);
		this.setBuildingBeginTime(task.getBeginDate());
		return grid;
	}

	public void callbackConstruir() {
		try {
			Thread.currentThread().join();
		} catch (InterruptedException e) {
			System.out.println("Generador " + id + " construido");
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
}
