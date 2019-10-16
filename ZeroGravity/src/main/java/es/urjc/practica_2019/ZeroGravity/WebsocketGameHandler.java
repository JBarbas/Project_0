package es.urjc.practica_2019.ZeroGravity;

import java.awt.List;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoClientURI;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import es.urjc.practica_2019.ZeroGravity.Edificios.*;
import es.urjc.practica_2019.ZeroGravity.Robots.Robot;
import es.urjc.practica_2019.ZeroGravity.Robots.RobotEstandar;

public class WebsocketGameHandler extends TextWebSocketHandler{
	
	private static final String PLAYER_ATTRIBUTE = "PLAYER";
	private ObjectMapper mapper = new ObjectMapper();
	

	private static MongoClientURI uri = new MongoClientURI(
		    "mongodb+srv://ZeroGravity:webyrrss@polaris-u3pvb.mongodb.net/POLARIS?retryWrites=true&w=majority");

	private static MongoClient mongoClient = new MongoClient(uri);
	private static MongoDatabase database = mongoClient.getDatabase("POLARIS");

	private static MongoCollection<Document> coll = database.getCollection("Users", Document.class);
	private static MongoCollection<Document> collOfertas = database.getCollection("Ofertas", Document.class);
	
	private static HashMap<ObjectId, Player> players = new HashMap<>();
	private static HashMap<ObjectId, Oferta> ofertas = new HashMap<>();
	
	public static MongoCollection<Document> getColl() {
		return coll;
	}
	
	public static HashMap<ObjectId, Player> getPlayers() {
		return players;
	}
	
	public static MongoCollection<Document> getCollOfertas() {
		return collOfertas;
	}
	
	public static HashMap<ObjectId, Oferta> getOfertas() {
		return ofertas;
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Player player = new Player(session, ObjectId.get());
		session.getAttributes().put(PLAYER_ATTRIBUTE, player);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {		
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode msg = mapper.createObjectNode();
			Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
			
			switch (node.get("event").asText()) {
			case "LOG IN":
				player.setUsername(node.get("name").asText());
				player.setPassword(node.get("password").asText());
				Bson filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				Document myPlayer = coll.find(filter).first();
				if (myPlayer != null) {
					player.setId(myPlayer.getObjectId("_id"));
					players.put(player.getId(), player);
					player.updateGrid((Collection<Document>) myPlayer.get("grid"));
					player.setEdificioId(myPlayer.getInteger("edificioId", 0));
					player.updateEdificios((Collection<Document>) myPlayer.get("edificios"));
					player.updateOfertas((Collection<Document>) myPlayer.get("ofertas"));
					player.setEnergia(myPlayer.getInteger("energia", 0));
					player.setMetal(myPlayer.getInteger("metal", 100));
					player.setCeramica(myPlayer.getInteger("ceramica", 100));
					player.setCreditos(myPlayer.getInteger("creditos", 1000));
					player.setUnionCoins(myPlayer.getInteger("unionCoins", 0));
					player.setCosteCelda(myPlayer.getInteger("costeCelda", 0));
					player.setCeldasCompradas(myPlayer.getInteger("celdasCompradas", 0));
					player.setColonos(myPlayer.getInteger("colonos", 0));

					msg.put("event", "LOGGED");
				}
				else {
					msg.put("event", "LOGIN FAILED");
					msg.put("data", "Usuario y contraseña no válidos");		
				}
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "REGISTER":	
				filter = new Document("name", node.get("name").asText());
				myPlayer = coll.find(filter).first();
				if (myPlayer != null) {
					msg.put("event", "LOGIN FAILED");
					msg.put("data", "Ese nombre de usuario ya ha sido utilizado");					
				}
				else {
					filter = new Document("email", node.get("email").asText());
					myPlayer = coll.find(filter).first();
					if (myPlayer != null) {
						msg.put("event", "LOGIN FAILED");
						msg.put("data", "Ese email ya ha sido utilizado");
					}
					else {
						player.setUsername(node.get("name").asText());
						player.setEmail(node.get("email").asText());
						player.setPassword(node.get("password").asText());
						Document dbPlayer = new Document();
						dbPlayer.append("_id", player.getId());
						dbPlayer.append("name", player.getUsername());			
						dbPlayer.append("email", player.getEmail());		
						dbPlayer.append("password", player.getPassword());		
						coll.insertOne(dbPlayer);				
						msg.put("event", "LOGGED");
						players.put(player.getId(), player);
					}
				}
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "ASK PLAYER INFO":
				updateInfo(player, "PLAYER INFO");
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "BUILD":		
				// Construimos el edificio, si se puede
				player.build(node.get("x").asInt(), node.get("y").asInt(), node.get("edificio").asText(), node.get("id").asInt());	
				// Pedimos al cliente que refresque el grid con la nueva info
				updateInfo(player, "REFRESH GRID");
				break;	
				
			case "ASK_PLAYER_RESOURCES":
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "LEVELUP_BUILDING":
				Edificio edificio = player.getEdificio(node.get("id").asInt());
				Boolean canILevelUp = false;
				switch(edificio.getSprite()) {
				
				case "bloqueViviendas":	
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= BloqueViviendas.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= BloqueViviendas.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= BloqueViviendas.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < 3){
						
						canILevelUp = true;
						player.setColonosMax(player.getColonosMax() - BloqueViviendas.capacidad[edificio.getLevel()-1] + BloqueViviendas.capacidad[edificio.getLevel()]);
						player.setMetal(player.getMetal() - BloqueViviendas.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - BloqueViviendas.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - BloqueViviendas.COSTS[edificio.getLevel()-1][3]);
					}
					break;
					
				case "centroAdministrativo":		
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= CentroAdministrativo.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= CentroAdministrativo.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= CentroAdministrativo.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < 3){
						
						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroAdministrativo.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - CentroAdministrativo.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - CentroAdministrativo.COSTS[edificio.getLevel()-1][3]);
					}
					break;
					
				case "centroComercio":			
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= CentroComercio.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= CentroComercio.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= CentroComercio.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < 3){
						
						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroComercio.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - CentroComercio.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - CentroComercio.COSTS[edificio.getLevel()-1][3]);
					}
					break;
					
				case "centroDeMando":
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= CentroMando.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= CentroMando.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= CentroMando.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < 3){
						
						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroMando.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - CentroMando.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - CentroMando.COSTS[edificio.getLevel()-1][3]);
					}
					break;
					
				case "centroOperaciones":
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= CentroOperaciones.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= CentroOperaciones.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= CentroOperaciones.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < 3){
						
						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroOperaciones.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - CentroOperaciones.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - CentroOperaciones.COSTS[edificio.getLevel()-1][3]);
					}
					break;
					
				case "generador":
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= Generador.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= Generador.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= Generador.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < 3){
						
						canILevelUp = true;
						player.setMetal(player.getMetal() - Generador.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - Generador.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - Generador.COSTS[edificio.getLevel()-1][3]);
					}
					break;
					
				case "laboratorioInvestigacion":	
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= LaboratorioInvestigacion.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= LaboratorioInvestigacion.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= LaboratorioInvestigacion.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < 3){
						
						canILevelUp = true;
						player.setMetal(player.getMetal() - LaboratorioInvestigacion.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - LaboratorioInvestigacion.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - LaboratorioInvestigacion.COSTS[edificio.getLevel()-1][3]);
					}
					break;
					
				case "plataformaExtraccion":
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= PlataformaExtraccion.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= PlataformaExtraccion.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= PlataformaExtraccion.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < 3){
						
						canILevelUp = true;
						player.setMetal(player.getMetal() - PlataformaExtraccion.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - PlataformaExtraccion.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - PlataformaExtraccion.COSTS[edificio.getLevel()-1][3]);
					}
					break;

				case "taller":
					//energia, metal, ceramica, creditos
					if(	player.getMetal() >= Taller.COSTS[edificio.getLevel()-1][1] &&
						player.getCeramica() >= Taller.COSTS[edificio.getLevel()-1][2] &&
						player.getCreditos() >= Taller.COSTS[edificio.getLevel()-1][3] &&
						edificio.getLevel() < 3){
							
						canILevelUp = true;
						player.setMetal(player.getMetal() - Taller.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - Taller.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - Taller.COSTS[edificio.getLevel()-1][3]);
					}
					break;
								
				default:
					break;
				}
				if(canILevelUp) {
					edificio.levelUp();	
					player.saveEdificios();
					player.saveRecursos();
				}
				msg.put("event", "ANSWER_LEVELUP_BUILDING");
				msg.put("resultado", canILevelUp.toString());
				msg.put("id", node.get("id").asInt());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "RECOLECT":
				player.recolect(node.get("id").asInt());
				break;
			case "ENVIAR":
				((Taller) player.getEdificio(node.get("tallerId").asInt())).getRobot(node.get("robotId").asInt()).producir();
				player.saveEdificios();
				break;
			case "GET PLATAFORMA EXTRACCION MENU":
				msg.put("event", "PLATAFORMA EXTRACCION MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				msg.put("produciendo", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getProduciendo());
				msg.put("energia", player.getEdificio(node.get("id").asInt()).getEnergia());
				msg.put("energiaNecesaria", PlataformaExtraccion.COSTS[player.getEdificio(node.get("id").asInt()).getLevel()-1][0]);
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "GET LABORATORIO INVESTIGACION MENU":
				msg.put("event", "LABORATORIO INVESTIGACION MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				msg.put("produciendo", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getProduciendo());
				msg.put("energia", player.getEdificio(node.get("id").asInt()).getEnergia());
				msg.put("energiaNecesaria", LaboratorioInvestigacion.COSTS[player.getEdificio(node.get("id").asInt()).getLevel()-1][0]);
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "GET BLOQUE VIVIENDAS MENU":
				msg.put("event", "BLOQUE VIVIENDAS MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((BloqueViviendas) player.getEdificio(node.get("id").asInt())).getColonosString());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "GET GENERADOR MENU":
				msg.put("event", "GENERADOR MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "GET TALLER MENU":
				msg.put("event", "TALLER MENU");
				msg.put("id", node.get("id").asInt());
				ArrayNode arrayNodeRobots = mapper.createArrayNode(); // JSON para el cliente
				for (Robot r : ((Taller) player.getEdificio(node.get("id").asInt())).getRobots()) {
					ObjectNode jsonRobot = mapper.createObjectNode();
					jsonRobot.put("id", r.getId());
					jsonRobot.put("ausente", r.isAusente());					
					jsonRobot.put("nivel", r.getNivel());	
					jsonRobot.put("carga", r.getCarga());	
					arrayNodeRobots.addPOJO(jsonRobot);
				}
				msg.putPOJO("robots", arrayNodeRobots);
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "GET JOBS":
				msg.put("event", "JOBS");
				msg.put("jobs", player.getJobs());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "BUY CELL":
				player.buyCell(node.get("i").asInt(), node.get("j").asInt());
				updateInfo(player, "REFRESH GRID");
				break;
			case "PEDIR COLONOS":
				player.requestColonos();
				msg.put("event", "ENVIO DE COLONOS");
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				msg.put("jobs", player.getJobs());
				player.getSession().sendMessage(new TextMessage(msg.toString()));				
				msg = mapper.createObjectNode();
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "CREATE AN OFFER":
				//creamos una oferta con la info del cliente
				Oferta oferta = new Oferta(ObjectId.get(), player.getId(), 
						node.get("recurso").asText(), node.get("cantidad").asInt(), node.get("creditos").asInt());
				//la guardamos en los atributos y bd del jugador
				player.addOferta(oferta);
				player.saveOfertas();
				//la guardamos en la bd comun a todos los jugadores
				Document dbOferta = new Document();
				dbOferta.append("id", oferta.getId());
				dbOferta.append("playerId", oferta.getPlayerId());
				dbOferta.append("recurso", oferta.getRecurso());
				dbOferta.append("cantidad", oferta.getCantidad());
				dbOferta.append("creditos", oferta.getCreditos());
				collOfertas.insertOne(dbOferta);
				break;
			case "I AM HERE":
				msg.put("event", "OK");
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			default:
				break;
			}

		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}
	
	// Informa al cliente y a la BDD de una actualizacion en la informacion del jugador (Grid y edificios)
	private void updateInfo(Player player, String event) {
		ObjectNode msg = mapper.createObjectNode();
		try {
			msg.put("event", event);
			ArrayNode playerGrid = mapper.createArrayNode(); // JSON para el cliente
			int[][] grid = player.getGrid();
			for (int i = 0; i < grid.length; i++) {
				ArrayNode gridColumn = mapper.createArrayNode();
				for (int j = 0; j < grid[i].length; j++) {						
					gridColumn.add(grid[i][j]);
				}
				playerGrid.addPOJO(gridColumn);
			}
			msg.putPOJO("grid", playerGrid);
			ArrayNode arrayNodeEdificios = mapper.createArrayNode(); // JSON para el cliente
			for (Edificio e : player.getEdificios()) {
				
				ObjectNode jsonEdificio = mapper.createObjectNode();
				jsonEdificio.put("id", e.getId());
				jsonEdificio.put("x", e.getX());
				jsonEdificio.put("y", e.getY());
				if (e instanceof GeneradorRecursos) {
					jsonEdificio.put("lleno", ((GeneradorRecursos) e).isLleno());
					jsonEdificio.put("dateYear", ((GeneradorRecursos) e).getProductionBeginTime().getYear());
					jsonEdificio.put("dateMonth", ((GeneradorRecursos) e).getProductionBeginTime().getMonthValue());
					jsonEdificio.put("dateDay", ((GeneradorRecursos) e).getProductionBeginTime().getDayOfMonth());
					jsonEdificio.put("dateHour", ((GeneradorRecursos) e).getProductionBeginTime().getHour());
					jsonEdificio.put("dateMinute", ((GeneradorRecursos) e).getProductionBeginTime().getMinute());
				}
				jsonEdificio.put("sprite", e.getSprite());
				jsonEdificio.put("level", e.getLevel());
				arrayNodeEdificios.addPOJO(jsonEdificio);

			}
			msg.putPOJO("edificios", arrayNodeEdificios);
			msg.put("metal", player.getMetal());
			msg.put("energia", player.getEnergia());
			msg.put("ceramica", player.getCeramica());
			msg.put("creditos", player.getCreditos());
			msg.put("unionCoins", player.getUnionCoins());
			msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
			// Enviamos el mensaje al cliente
			player.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (Exception e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
		player.saveAll();
	}
}
