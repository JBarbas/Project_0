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
	private static final int[] nivel1 = { 1, 0, 0, 0 };
	private static final int[] nivel2 = { 2, 0, 0, 0 };
	private static final int[] nivel3 = { 3, 0, 0, 0 };
	private static final int[][] costs = { nivel1, nivel2, nivel3 };

	// Establecemos los recursos que generan según su nivel (unidades, duracion en mins)
	private final static int[] recursosNivel1 = { 4, 20 };
	private final static int[] recursosNivel2 = { 0, 0 };
	private final static int[] recursosNivel3 = { 0, 0 };
	private final static int[][] recursosGenerados = { recursosNivel1, recursosNivel2, recursosNivel3 };
	
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
	public void levelUp() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void showMenu() {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void producir() {
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
		switch (this.level) {
		case 1:
			task = new Task(this.player, this.recursosNivel1[1], msg, callback);
			break;
		case 2:
			break;
		case 3:
			break;
		default:
			break;
		}
		TASKMASTER.addTask(task);
		this.setProduciendo(true);
		this.setProductionBeginTime(task.getBeginDate());
		player.saveEdificios();
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
			switch (this.level) {
			case 1:
				player.setCeramica(player.getCeramica() + this.recursosNivel1[0]);
				break;
			case 2:
				player.setCeramica(player.getCeramica() + this.recursosNivel2[0]);
				break;
			case 3:
				player.setCeramica(player.getCeramica() + this.recursosNivel3[0]);
				break;
			default:
				break;
			}
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
}
