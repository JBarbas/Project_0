package es.urjc.practica_2019.ZeroGravity;

import java.awt.List;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Map.Entry;
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
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import es.urjc.practica_2019.ZeroGravity.Edificios.*;
import es.urjc.practica_2019.ZeroGravity.Robots.Robot;
import es.urjc.practica_2019.ZeroGravity.Robots.RobotEstandar;

public class WebsocketGameHandler extends TextWebSocketHandler{
	
	/*Puntuaciones: construir edificio, subir de nivel edificio, recolectar recursos, ampliar la base, comprar una oferta*/
	private static final int[] PUNTUACIONES = {2, 4, 1, 10, 2};
	private static final int NIVEL_MAX_EDIFICIO = 3;
	private static final int NUM_MAX_PUNTUACIONES_MOSTRAR = 15;
	
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
					player.setPuntuacion(myPlayer.get("puntuacion", 0));
					player.setEnergia(myPlayer.getInteger("energia", 0));
					player.setMetal(myPlayer.getInteger("metal", 100));
					player.setCeramica(myPlayer.getInteger("ceramica", 100));
					player.setCreditos(myPlayer.getInteger("creditos", 1000));
					player.setUnionCoins(myPlayer.getInteger("unionCoins", 0));
					player.setCosteCelda(myPlayer.getInteger("costeCelda", 0));
					player.setCeldasCompradas(myPlayer.getInteger("celdasCompradas", 0));
					player.setColonos(myPlayer.getInteger("colonos", 0));
					player.setGameStarted(myPlayer.getBoolean("gameStarted", false));
					
					Config config = new Config();
					config.setVolMusic(((Document)myPlayer.get("config")).getInteger("volMusic", 100));
					config.setVolEffects(((Document)myPlayer.get("config")).getInteger("volEffects", 100));
					config.setLang(((Document)myPlayer.get("config")).getString("Language"));
					player.setConfig(config);

					msg.put("event", "LOGGED");
					msg.put("playerId", player.getId().toString());
					msg.put("gameStarted", player.isGameStarted());					
					ObjectNode jsonConfig = mapper.createObjectNode();
					jsonConfig.put("volMusic", config.getVolMusic());
					jsonConfig.put("volEffects", config.getVolEffects());
					jsonConfig.put("lang", config.getLang());
					msg.putPOJO("config", jsonConfig);
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
						msg.put("playerId", player.getId().toString());
						players.put(player.getId(), player);
						player.saveAll();
						
						ObjectNode jsonConfig = mapper.createObjectNode();
						jsonConfig.put("volMusic", player.getConfig().getVolMusic());
						jsonConfig.put("volEffects", player.getConfig().getVolEffects());
						jsonConfig.put("lang", player.getConfig().getLang());
						msg.putPOJO("config", jsonConfig);
					}
				}
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "UPDATE USERNAME":
				filter = new Document("name", node.get("name").asText());
				myPlayer = coll.find(filter).first();
				if (myPlayer != null) {
					msg.put("event", "UPDATE USERNAME RESPONSE");
					msg.put("resultado", "Ese nombre de usuario ya ha sido utilizado");		
				}
				else if (node.get("name").asText() != "") {
					player.setUsername(node.get("name").asText());
					coll.updateOne(new Document("_id", player.getId()), new Document("$set", 
							new Document("name", player.getUsername())));
					msg.put("event", "UPDATE USERNAME RESPONSE");
					msg.put("resultado", "Tu nuevo nombre de usuario es: " + player.getUsername());					
				}
				else {
					msg.put("event", "UPDATE USERNAME RESPONSE");
					msg.put("data", "Nombre de usuario no válido");	
				}
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "UPDATE PASSWORD":
				if (player.passwordMatches(node.get("oldPassword").asText()) && node.get("newPassword").asText() != "") {
					player.setPassword(node.get("newPassword").asText());
					coll.updateOne(new Document("_id", player.getId()), new Document("$set", 
							new Document("password", player.getPassword())));
					msg.put("event", "UPDATE USERNAME RESPONSE");
					msg.put("resultado", "Contraseña cambiada correctamente");
					player.getSession().sendMessage(new TextMessage(msg.toString()));
					System.out.println("Hola");
				}
				System.out.println("Ciao");
				break;
			case "UPDATE CONFIG":
				Config config = new Config();
				config.setVolMusic(node.get("volMusic").asInt());
				config.setVolEffects(node.get("volEffects").asInt());
				config.setLang(node.get("lang").asText());
				player.setConfig(config);
				player.saveConfig();
				break;
			case "ASK PLAYER INFO":
				if (!player.isGameStarted()) {
					player.setGameStarted(true);
				}
				updateInfo(player, "PLAYER INFO");
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "BUILD":		
				// Construimos el edificio, si se puede
				player.build(node.get("x").asInt(), node.get("y").asInt(), node.get("edificio").asText(), node.get("id").asInt());	
				// Pedimos al cliente que refresque el grid con la nueva info
				updateInfo(player, "REFRESH GRID");
				/*actualizamos la puntuacion del jugador*/
				player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[0]);
				player.savePuntuacion();
				msg.put("event", "ACTUALIZAR PUNTUACION");
				msg.put("punctuacion", player.getPuntuacion());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;	
				
			case "ASK_PLAYER_RESOURCES":
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("punctuacion", player.getPuntuacion());
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
					edificio.getLevel() < NIVEL_MAX_EDIFICIO){
						
						canILevelUp = true;
						player.setColonosMax(player.getColonosMax() - BloqueViviendas.capacidad[edificio.getLevel()-1] + BloqueViviendas.capacidad[edificio.getLevel()]);
						player.setMetal(player.getMetal() - BloqueViviendas.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - BloqueViviendas.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - BloqueViviendas.COSTS[edificio.getLevel()-1][3]);
					}
					break;
					
				case "centroAdministrativo":		
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= CentroAdministrativo.COSTS[edificio.getLevel()][1] &&
					player.getCeramica() >= CentroAdministrativo.COSTS[edificio.getLevel()][2] &&
					player.getCreditos() >= CentroAdministrativo.COSTS[edificio.getLevel()][3] &&
					edificio.getLevel() < NIVEL_MAX_EDIFICIO){
						
						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroAdministrativo.COSTS[edificio.getLevel()][1]);
						player.setCeramica(player.getCeramica() - CentroAdministrativo.COSTS[edificio.getLevel()][2]);
						player.setCreditos(player.getCreditos() - CentroAdministrativo.COSTS[edificio.getLevel()][3]);
						System.out.println(CentroAdministrativo.COSTS[edificio.getLevel()][1]);
					}
					break;
					
				case "centroComercio":			
					//energia, metal, ceramica, creditos
					if(player.getMetal() >= CentroComercio.COSTS[edificio.getLevel()-1][1] &&
					player.getCeramica() >= CentroComercio.COSTS[edificio.getLevel()-1][2] &&
					player.getCreditos() >= CentroComercio.COSTS[edificio.getLevel()-1][3] &&
					edificio.getLevel() < NIVEL_MAX_EDIFICIO){
						
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
					edificio.getLevel() < NIVEL_MAX_EDIFICIO){
						
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
					edificio.getLevel() < NIVEL_MAX_EDIFICIO){
						
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
					edificio.getLevel() < NIVEL_MAX_EDIFICIO){
						
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
					edificio.getLevel() < NIVEL_MAX_EDIFICIO){
						
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
					edificio.getLevel() < NIVEL_MAX_EDIFICIO){
						
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
						edificio.getLevel() < NIVEL_MAX_EDIFICIO){
							
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
					/*actualizamos la puntuacion del jugador*/
					player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[1]);
					player.savePuntuacion();
					msg.put("event", "ACTUALIZAR PUNTUACION");
					msg.put("punctuacion", player.getPuntuacion());
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				msg.put("event", "ANSWER_LEVELUP_BUILDING");
				msg.put("resultado", canILevelUp);
				msg.put("id", node.get("id").asInt());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				

				msg.put("event", "REFRESH MENU");
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				
				msg = mapper.createObjectNode();
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "ASK_LEVELUP_ROBOT":
				canILevelUp = ((Taller) player.getEdificio(node.get("taller").asInt())).getRobot(node.get("id").asInt()).levelUp();
				msg.put("event", "REFRESH MENU");
				msg.put("id", node.get("taller").asInt());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "RECOLECT":
				player.recolect(node.get("id").asInt());
				/*actualizamos la puntuacion del jugador*/
				player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[2]);
				player.savePuntuacion();
				msg.put("event", "ACTUALIZAR PUNTUACION");
				msg.put("punctuacion", player.getPuntuacion());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "RECOLECTAR ROBOT":
				((Taller)  player.getEdificio(node.get("id").asInt())).getRobot(node.get("robotId").asInt()).recolectar();		
				msg.put("event", "METAL RECOLECTADO");
				msg.put("id", node.get("id").asInt());
				ArrayNode arrayNodeRobots = mapper.createArrayNode(); // JSON para el cliente
				for (Robot r : ((Taller)  player.getEdificio(node.get("id").asInt())).getRobots()) {
					ObjectNode jsonRobot = mapper.createObjectNode();
					jsonRobot.put("id", r.getId());
					jsonRobot.put("ausente", r.isAusente());					
					jsonRobot.put("nivel", r.getNivel());	
					jsonRobot.put("carga", r.getCarga());	
					arrayNodeRobots.addPOJO(jsonRobot);
				}
				msg.putPOJO("robots", arrayNodeRobots);
				msg.put("metal", player.getMetal());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "ENVIAR":
				((Taller) player.getEdificio(node.get("tallerId").asInt())).getRobot(node.get("robotId").asInt()).producir();
				msg.put("event", "REFRESH MENU");
				msg.put("id", node.get("tallerId").asInt());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
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
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				msg.put("energia", player.getEdificio(node.get("id").asInt()).getEnergia());
				msg.put("energiaNecesaria", Taller.COSTS[player.getEdificio(node.get("id").asInt()).getLevel()-1][0]);
				ArrayNode arrayNodeRobots2 = mapper.createArrayNode(); // JSON para el cliente
				for (Robot r : ((Taller) player.getEdificio(node.get("id").asInt())).getRobots()) {
					ObjectNode jsonRobot = mapper.createObjectNode();
					jsonRobot.put("id", r.getId());
					jsonRobot.put("ausente", r.isAusente());					
					jsonRobot.put("nivel", r.getNivel());	
					jsonRobot.put("carga", r.getCarga());	
					arrayNodeRobots2.addPOJO(jsonRobot);
				}
				msg.putPOJO("robots", arrayNodeRobots2);
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
				/*actualizamos la puntuacion del jugador*/
				player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[3]);
				player.savePuntuacion();
				msg.put("event", "ACTUALIZAR PUNTUACION");
				msg.put("punctuacion", player.getPuntuacion());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
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
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "CREATE AN OFFER":
				msg.put("event", "RESPUESTA CREAR OFERTA");
				boolean ofertaAceptada = false;
				
				//comprobamos que se tienen los recursos para crear la oferta
				//si es el caso restamos ese material al jugador
				switch(node.get("recurso").asText()) {
				
				case "metal":
					if(player.getMetal() >= node.get("cantidad").asInt()) {
						ofertaAceptada = true;
						player.setMetal(player.getMetal() - node.get("cantidad").asInt());
						player.saveRecursos();
					}
					break;
					
				case "ceramica":
					if(player.getCeramica() >= node.get("cantidad").asInt()) {
						ofertaAceptada = true;
						player.setCeramica(player.getCeramica() - node.get("cantidad").asInt());
						player.saveRecursos();
					}
					break;
					
				default:
					break;
				}
				
				if(ofertaAceptada) {
					synchronized (this) {
						//creamos una oferta con la info del cliente
						Oferta oferta = new Oferta(ObjectId.get(), player.getId(), 
								node.get("recurso").asText(), node.get("cantidad").asInt(), node.get("creditos").asInt());
						//la guardamos en los atributos y bd del jugador
						player.addOferta(oferta);
						player.saveOfertas();
						//la guardamos en la bd comun a todos los jugadores
						Document dbOferta = new Document();
						dbOferta.append("_id", oferta.getId());
						dbOferta.append("playerId", oferta.getPlayerId());
						dbOferta.append("recurso", oferta.getRecurso());
						dbOferta.append("cantidad", oferta.getCantidad());
						dbOferta.append("creditos", oferta.getCreditos());
						collOfertas.insertOne(dbOferta);
	
						//informamos al cliente
						msg.put("respuesta", ofertaAceptada);
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				}else {
					
					msg.put("respuesta", false);
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
				
			case "GIVE ME OFFERS":
				sendOffers(player);
				break;
				
			case "DELETE AN OFFER":
				synchronized (this) {
					ObjectId miOfertaId = new ObjectId(node.get("idOferta").asText());
					
					/*primero devolvemos el valor de la oferta*/
					Oferta oferta = player.getOferta(miOfertaId);
					switch(oferta.getRecurso()) {
					
					case "metal":
						player.setMetal(player.getMetal() + oferta.getCantidad());
						break;
					
					case "ceramica":
						player.setCeramica(player.getCeramica() + oferta.getCantidad());
						break;
					
					default:
						break;
					}
					player.saveRecursos();
					
					/*borramos la oferta de la base de datos del jugador*/
					player.deleteOferta(miOfertaId);
					player.saveOfertas();
				
					/*borramos la oferta de la base de datos comun a todos los jugadores*/
					collOfertas.deleteOne(new Document("_id", miOfertaId));
				}
				
				msg.put("event", "DELETED OFFER");
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "BUY AN OFFER":
				synchronized (this) {
					boolean puedoComprar = false;
					
					ObjectId myOfferId = new ObjectId(node.get("idOferta").asText());
					
					/*recogemos la oferta de la bd*/			
					Document myOffer = collOfertas.find(new Document("_id", myOfferId)).first();
					
					/*si puedo comprarla actualizo mis recursos*/
					if(player.getCreditos() >= Integer.parseInt(myOffer.get("creditos").toString())) {
						puedoComprar = true;
						player.setCreditos(player.getCreditos() - Integer.parseInt(myOffer.get("creditos").toString()));
						switch(myOffer.get("recurso").toString()) {					
						case "metal":
							player.setMetal(player.getMetal() + Integer.parseInt(myOffer.get("cantidad").toString()));
							break;					
						case "ceramica":
							player.setCeramica(player.getCeramica() + Integer.parseInt(myOffer.get("cantidad").toString()));
							break;			
						default:
							break;
						}
						player.saveRecursos();
						
						/*le doy el dinero al vendedor de la oferta*/
						Player playerVendedor = players.get(new ObjectId(myOffer.get("playerId").toString()));
						playerVendedor.deleteOferta(myOfferId);
						playerVendedor.setCreditos(playerVendedor.getCreditos() + Integer.parseInt(myOffer.get("creditos").toString()));
						playerVendedor.saveOfertas();
						playerVendedor.saveRecursos();
						player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[4]);
						player.savePuntuacion();
						/*si el usuario al que le han comprado está conectado hay darle retroalimentacion*/
						if(playerVendedor.getSession().isOpen()) {
							msg.put("event", "GET_PLAYER_RESOURCES");
							msg.put("energia", playerVendedor.getEnergia());
							msg.put("metal", playerVendedor.getMetal());
							msg.put("ceramica", playerVendedor.getCeramica());
							msg.put("creditos", playerVendedor.getCreditos());
							msg.put("unionCoins", playerVendedor.getUnionCoins());
							msg.put("colonos", playerVendedor.getColonos() + "/" + playerVendedor.getColonosMax());
							msg.put("punctuacion", playerVendedor.getPuntuacion());
							playerVendedor.getSession().sendMessage(new TextMessage(msg.toString()));
							
							msg = mapper.createObjectNode();
							msg.put("event", "REFRESH COMERCIO");
							playerVendedor.getSession().sendMessage(new TextMessage(msg.toString()));
	
						}
						/*borramos la oferta de la base de datos comun a todos los jugadores*/
						collOfertas.deleteOne(new Document("_id", myOfferId));
						
						msg = mapper.createObjectNode();
						msg.put("event", "OFFER PURCHASED");
						msg.put("respuesta", puedoComprar);
						player.getSession().sendMessage(new TextMessage(msg.toString()));
						msg = mapper.createObjectNode();
						
					}else {
						msg.put("respuesta", puedoComprar);
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				}
				break;
				
			case "I AM HERE":
				msg.put("event", "OK");
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			
			case "GIVE ME PUNCTUATIONS":
				sendPunctuations(player);
				break;
			case "REFRESH MY MENU":
				msg.put("event", "REFRESH MENU");
				msg.put("id", node.get("edificioId").asInt());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			default:
				break;
			}

		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}
	
	/*Enviamos las ofertas al cliente*/
	private synchronized void sendOffers(Player player) {
		ObjectNode msg = mapper.createObjectNode();
		try {
			
			ArrayNode offers = mapper.createArrayNode();
			ObjectNode oferta;
			MongoCursor<Document> cursor = collOfertas.find().iterator();
			try {
				while(cursor.hasNext()) {
					oferta = mapper.createObjectNode();
					Document next = cursor.next();
					oferta.put("id", next.getObjectId("_id").toString());
					oferta.put("playerId", next.getObjectId("playerId").toString());
					oferta.put("recurso", next.getString("recurso"));
					oferta.put("cantidad", next.getInteger("cantidad"));
					oferta.put("creditos", next.getInteger("creditos"));
					offers.addPOJO(oferta);
				}
			}finally {
				cursor.close();
			}
			
			msg.put("event", "SEND OFFERS");
			msg.putPOJO("ofertas", offers);
			player.getSession().sendMessage(new TextMessage(msg.toString()));

		} catch (Exception e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
	}
	
	/*Enviamos las puntuaciones maximas ordenas al jugador*/
	private void sendPunctuations(Player player) {
		
		ObjectNode msg = mapper.createObjectNode();
		HashMap<String, Integer>puntuaciones = new HashMap<>();
		String todasLasPuntuaciones = "";
        int numMaxPuntuaciones = 0;
		
		/*extraemos los nombres y las puntuaciones de los jugadores en un mapa*/
		try {
			MongoCursor<Document> cursor = coll.find().iterator();
			try {
				while(cursor.hasNext()) {
					Document next = cursor.next();
					puntuaciones.put(next.getString("name"), next.getInteger("puntuacion"));
				}
			}finally {
				cursor.close();
			}

		} catch (Exception e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
		
		/*ordenamos el mapa
		 * solucion parcialmente sacada de: https://www.mkyong.com/java/how-to-sort-a-map-in-java/*/
		LinkedList<Map.Entry<String, Integer>> list = new LinkedList<Map.Entry<String, Integer>>(puntuaciones.entrySet());
		
		Collections.sort(list, new Comparator<Map.Entry<String, Integer>>(){
			public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
				return (o1.getValue()).compareTo(o2.getValue());
			}
		});
		Collections.reverse(list);
		Map<String, Integer> sortedMap = new LinkedHashMap<String, Integer>();
        for (Map.Entry<String, Integer> entry : list) {
        	sortedMap.put(entry.getKey(), entry.getValue());
        }
        
        /*con las puntuaciones ordenadas se las mandamos al cliente en un String*/
        for(Map.Entry<String, Integer> entry : sortedMap.entrySet()) {         
        	if(numMaxPuntuaciones < NUM_MAX_PUNTUACIONES_MOSTRAR) {
        		todasLasPuntuaciones += entry.getKey() + "\n" + entry.getValue() + "\n";
                numMaxPuntuaciones++;
        	}else {
        		break;
        	}
        }
                
		try {
			msg.put("event", "ALL PUNCTUATIONS");
	        msg.put("todasLasPuntuaciones", todasLasPuntuaciones);
			player.getSession().sendMessage(new TextMessage(msg.toString()));
			msg = mapper.createObjectNode();
			msg.put("event", "ACTUALIZAR PUNTUACION");
			msg.put("punctuacion", player.getPuntuacion());
			player.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (IOException e) {
			e.printStackTrace();
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
					jsonEdificio.put("levelProduciendo", ((GeneradorRecursos) e).getLevelProduciendo());
					jsonEdificio.put("dateYear", ((GeneradorRecursos) e).getProductionBeginTime().getYear());
					jsonEdificio.put("dateMonth", ((GeneradorRecursos) e).getProductionBeginTime().getMonthValue());
					jsonEdificio.put("dateDay", ((GeneradorRecursos) e).getProductionBeginTime().getDayOfMonth());
					jsonEdificio.put("dateHour", ((GeneradorRecursos) e).getProductionBeginTime().getHour());
					jsonEdificio.put("dateMinute", ((GeneradorRecursos) e).getProductionBeginTime().getMinute());
					if (e instanceof Taller) {
						ArrayNode arrayNodeRobots = mapper.createArrayNode(); // JSON para el cliente
						for (Robot r :  ((Taller) e).getRobots()) {
							ObjectNode jsonRobot = mapper.createObjectNode();
							jsonRobot.put("id", r.getId());
							jsonRobot.put("ausente", r.isAusente());
							jsonRobot.put("nivel", r.getNivel());
							jsonRobot.put("carga", r.getCarga());
							jsonRobot.put("dateYear", r.getProductionBeginTime().getYear());
							jsonRobot.put("dateMonth", r.getProductionBeginTime().getMonthValue());
							jsonRobot.put("dateDay", r.getProductionBeginTime().getDayOfMonth());
							jsonRobot.put("dateHour", r.getProductionBeginTime().getHour());
							jsonRobot.put("dateMinute", r.getProductionBeginTime().getMinute());
							arrayNodeRobots.addPOJO(jsonRobot);
						}
						jsonEdificio.putPOJO("robots", arrayNodeRobots);
					}
				}
				jsonEdificio.put("sprite", e.getSprite());
				jsonEdificio.put("level", e.getLevel());
				jsonEdificio.put("enConstruccion", e.isEnConstruccion());
				jsonEdificio.put("construccionDateYear", e.getBuildingBeginTime().getYear());
				jsonEdificio.put("construccionDateMonth", e.getBuildingBeginTime().getMonthValue());
				jsonEdificio.put("construccionDateDay", e.getBuildingBeginTime().getDayOfMonth());
				jsonEdificio.put("construccionDateHour", e.getBuildingBeginTime().getHour());
				jsonEdificio.put("construccionDateMinute", e.getBuildingBeginTime().getMinute());
				arrayNodeEdificios.addPOJO(jsonEdificio);

			}
			msg.putPOJO("edificios", arrayNodeEdificios);
			msg.put("metal", player.getMetal());
			msg.put("energia", player.getEnergia());
			msg.put("ceramica", player.getCeramica());
			msg.put("creditos", player.getCreditos());
			msg.put("unionCoins", player.getUnionCoins());
			msg.put("puntuacion", player.getPuntuacion());
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
