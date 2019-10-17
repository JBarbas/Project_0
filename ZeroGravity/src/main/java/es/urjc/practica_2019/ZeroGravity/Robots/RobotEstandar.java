package es.urjc.practica_2019.ZeroGravity.Robots;

import java.io.IOException;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;
import es.urjc.practica_2019.ZeroGravity.Edificios.GeneradorRecursos;
import es.urjc.practica_2019.ZeroGravity.Edificios.Taller;

public class RobotEstandar extends Robot {

	//coste Metal, coste UnionCoins, vidaMax, fuerza, capacidadCarga, duracion
	private static final int[] nivel1 = {0, 0, 10, 3, 5, 1}; // t = 120 mins
	private static final int[] nivel2 = {0, 0, 20, 7, 12, 300};
	private static final int[] nivel3 = {0, 0, 30, 15, 20, 420};
	private static final int[][] infoPorNivel = {nivel1, nivel2, nivel3};
	
	private ObjectMapper mapper = new ObjectMapper();
	private Taller taller;
	
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;
	
	public RobotEstandar(int id, Taller taller) {
		this.setId(id);
		this.taller = taller;
	}
	
	@Override
	public void subirNivel() {
		
	}
	
	@Override
	public void producir() {
		if (!this.isAusente()) {
			ObjectNode msg = mapper.createObjectNode();
			msg.put("event", "ROBOT AUSENTE");
			msg.put("id", this.getId());
			msg.put("taller", this.taller.getId());
			try {
				if (taller.getPlayer().getSession().isOpen()) {				
					taller.getPlayer().getSession().sendMessage(new TextMessage(msg.toString()));
				}
			} catch (IOException e) {
				System.err.println("Exception sending message " + msg.toString());
				e.printStackTrace(System.err);
			}
			msg.put("event", "ROBOT DE VUELTA");
			Task task = null;
			Thread callback = new Thread(() -> this.callbackProducir());
			callback.start();
			task = new Task(this.taller.getPlayer(), RobotEstandar.infoPorNivel[this.getNivel()-1][5], msg, callback);
			TASKMASTER.addTask(task);
			this.setAusente(true);
			this.setProductionBeginTime(task.getBeginDate());
		}
	}
	
	public void callbackProducir() {
		int carga = 0;
		try {
			carga = RobotEstandar.infoPorNivel[this.getNivel()-1][4];
			Thread.currentThread().join();
		} catch (InterruptedException e) {
			System.out.println("Robot " + this.getId() + " ha producido");
			if (this.taller.getPlayer().getSession().isOpen()) {
				this.setAusente(false);
				this.setCarga(carga);
				this.taller.getPlayer().saveEdificios();
			}
			else {
				Player p = WebsocketGameHandler.getPlayers().get(this.taller.getPlayer().getId());
				if (p != null) {
					((Taller) p.getEdificio(this.taller.getId())).getRobot(this.getId()).setAusente(false);
					((Taller) p.getEdificio(this.taller.getId())).getRobot(this.getId()).setCarga(carga);
					p.saveEdificios();
				}
			}
		}
	}

	@Override
	public synchronized void recolectar() {
		this.taller.getPlayer().setMetal(this.taller.getPlayer().getMetal() + this.getCarga());
		this.setCarga(0);
	}
}
