package es.urjc.practica_2019.ZeroGravity;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.TemporalUnit;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.TextMessage;


public class TaskMaster {
	
	/* TaskMaster tiene una bolsa de tareas con una duracion determinada.
	 * Comprueba cada 1 minuto cuales de esas tareas han acabado
	 * Informa al cliente de que la tarea ha terminado
	 * Ejecuta un callback en caso de que ésta se haya definido
	 */
	
	public static final TaskMaster INSTANCE = new TaskMaster();
	private final static long TICK_DELAY = 10000;
	private AtomicInteger taskId = new AtomicInteger();
	private HashMap<String, Task> tasks = new HashMap<>(); 
	
	private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
	
	private TaskMaster() {
		startLoop();
	}
	
	public boolean addTask(Task task) {
		synchronized (tasks) {
			if (task != null) {
				if (!tasks.containsKey(task.getId())) {
					tasks.put(task.getId(), task);	
					System.out.println("tarea añadida");
					return true;
				}			
			}
			return false;
		}		
	}
	
	public void startLoop() {
		scheduler = Executors.newScheduledThreadPool(1);
		scheduler.scheduleAtFixedRate(() -> tick(), TICK_DELAY, TICK_DELAY, TimeUnit.MILLISECONDS);
	}
	
	public void tick() {
		LocalDateTime currentDate = LocalDateTime.now();
		LinkedList<Task> completedTasks = new LinkedList<>();
		for (Task t : tasks.values()) {
			Duration diff = Duration.between(t.getBeginDate(), currentDate);
			long diffMins = diff.toMinutes();
			if (diffMins >= t.getDuration()) {
				System.out.println("Tarea finalizada");
				try {
					// Informa al cliente de que la tarea ha terminado
					if (t.getPlayer().getSession().isOpen()) {
						synchronized (t.getPlayer().getSession()) {
							t.getPlayer().getSession().sendMessage(new TextMessage(t.getMsg().toString()));
						}
					}
					else {
						Player p = WebsocketGameHandler.getPlayers().get(t.getPlayer().getId());
						if (p != null) {
							if (p.getSession().isOpen()) {
								synchronized (p.getSession()) {
									p.getSession().sendMessage(new TextMessage(t.getMsg().toString()));
								}
							}
						}
					}
					
					System.out.println("Producido");
					
					// Ejecuta una callback en caso de que ésta se haya definido
					if (t.getCallback() != null) {
						t.getCallback().interrupt();
					}
				} catch (IOException e) {
					System.err.println("Exception sending message " + t.getMsg().toString());
					e.printStackTrace(System.err);
				}
				completedTasks.add(t);
			}
		}
		for (Task t : completedTasks) {
			synchronized (tasks) {
				tasks.remove(t.getId());
			}
		}
	}
	
	public void completeTask(String id) {
		synchronized (tasks) {
			Task t = tasks.remove(id);
			try {
				// Informa al cliente de que la tarea ha terminado
				if (t.getPlayer().getSession().isOpen()) {
					synchronized (t.getPlayer().getSession()) {
						t.getPlayer().getSession().sendMessage(new TextMessage(t.getMsg().toString()));
					}
				}
				else {
					Player p = WebsocketGameHandler.getPlayers().get(t.getPlayer().getId());
					if (p != null) {
						if (p.getSession().isOpen()) {
							synchronized (p.getSession()) {
								p.getSession().sendMessage(new TextMessage(t.getMsg().toString()));
							}
						}
					}
				}
				
				// Ejecuta una callback en caso de que ésta se haya definido
				if (t.getCallback() != null) {
					t.getCallback().interrupt();
				}
			} catch (IOException e) {
				System.err.println("Exception sending message " + t.getMsg().toString());
				e.printStackTrace(System.err);
			}
		}
	}
	
	public Task getTask(String id) {
		synchronized (tasks) {
			return tasks.get(id);
		}
	}
}
