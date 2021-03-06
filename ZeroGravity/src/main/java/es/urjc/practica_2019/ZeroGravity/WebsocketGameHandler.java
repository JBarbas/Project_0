package es.urjc.practica_2019.ZeroGravity;

import java.awt.List;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Properties;
import java.util.Map.Entry;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;

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
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
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
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Updates;

import java.util.regex.*;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

import es.urjc.practica_2019.ZeroGravity.Edificios.*;
import es.urjc.practica_2019.ZeroGravity.Mailing.ConfirmEmailHandler;
import es.urjc.practica_2019.ZeroGravity.Mailing.RecoverPasswordHandler;
import es.urjc.practica_2019.ZeroGravity.Mailing.RecoverUserNameHandler;
import es.urjc.practica_2019.ZeroGravity.Mailing.validateEmailHandler;
import es.urjc.practica_2019.ZeroGravity.Robots.Robot;
import es.urjc.practica_2019.ZeroGravity.Robots.RobotEstandar;

public class WebsocketGameHandler extends TextWebSocketHandler {

	/*
	 * Puntuaciones: construir edificio, subir de nivel edificio, recolectar
	 * recursos, ampliar la base, comprar una oferta
	 */
	private static final int[] PUNTUACIONES = { 2, 4, 1, 10, 2 };
	private static final int NIVEL_MAX_EDIFICIO = 3;
	private static final int NUM_MAX_PUNTUACIONES_MOSTRAR = 15;
	
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;

	private static final String PLAYER_ATTRIBUTE = "PLAYER";
	private static ObjectMapper mapper = new ObjectMapper();

	private static MongoClientURI uri = new MongoClientURI(
			"mongodb+srv://ZeroGravity:webyrrss@polaris-u3pvb.mongodb.net/POLARIS?retryWrites=true&w=majority");

	private static MongoClient mongoClient = new MongoClient(uri);
	private static MongoDatabase database = mongoClient.getDatabase("POLARIS-PRUEBAS");

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

	@Autowired
	private RecoverPasswordHandler recoverPasswordHandler;

	@Autowired
	private RecoverUserNameHandler recoverUserNameHandler;

	@Autowired
	private validateEmailHandler validateEmailHandler;

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
					player.setCaBlocked(myPlayer.getBoolean("caBlocked", true));

					Config config = new Config();
					config.setVolMusic(((Document) myPlayer.get("config")).getInteger("volMusic", 100));
					config.setVolEffects(((Document) myPlayer.get("config")).getInteger("volEffects", 100));
					config.setLang(((Document) myPlayer.get("config")).getString("Language"));
					player.setConfig(config);

					msg.put("event", "LOGGED");
					msg.put("playerId", player.getId().toString());
					msg.put("email", myPlayer.getString("email"));
					msg.put("gameStarted", player.isGameStarted());	
					msg.put("tutorialIntro", myPlayer.getBoolean("tutorialIntro", false));
					msg.put("cityName", myPlayer.get("cityName", "your city").toString());
					msg.put("validatedAccount", myPlayer.getBoolean("validatedAccount", false));
					ObjectNode jsonConfig = mapper.createObjectNode();
					jsonConfig.put("volMusic", config.getVolMusic());
					jsonConfig.put("volEffects", config.getVolEffects());
					jsonConfig.put("lang", config.getLang());
					msg.putPOJO("config", jsonConfig);
				} else {
					msg.put("event", "LOGIN FAILED");
					msg.put("data", "Usuario y contraseña no válidos");
				}
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "REGISTER":
				filter = new Document("name", node.get("name").asText());
				myPlayer = coll.find(filter).first();
				if (myPlayer != null) {
					msg.put("event", "LOGIN FAILED");
					msg.put("data", "Ese nombre de usuario ya ha sido utilizado");
				} else {
					filter = new Document("email", node.get("email").asText());
					myPlayer = coll.find(filter).first();
					if (myPlayer != null) {
						msg.put("event", "LOGIN FAILED");
						msg.put("data", "Ese email ya ha sido utilizado");
					} else {
						player.setUsername(node.get("name").asText());
						player.setEmail(node.get("email").asText());
						player.setPassword(node.get("password").asText());
						Document dbPlayer = new Document();
						dbPlayer.append("_id", player.getId());
						dbPlayer.append("name", player.getUsername());
						dbPlayer.append("email", player.getEmail());
						dbPlayer.append("password", player.getPassword());
						dbPlayer.append("validatedAccount", false);
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
						
						//Aqui mandamos un mensaje de correo electronico
						validateEmailHandler.execute(player.getEmail());
					}
				}
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "UPDATE USERNAME":
				filter = new Document("name", node.get("name").asText());
				myPlayer = coll.find(filter).first();
				if (myPlayer != null) {
					msg.put("resultado", false);
				} else if (node.get("name").asText() != "") {
					player.setUsername(node.get("name").asText());
					coll.updateOne(new Document("_id", player.getId()),
							new Document("$set", new Document("name", player.getUsername())));

					msg.put("resultado", true);
				} else {
					msg.put("resultado", false);
				}
				msg.put("event", "UPDATE USERNAME RESPONSE");
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "UPDATE PASSWORD":
				if (player.passwordMatches(node.get("oldPassword").asText())
						&& node.get("newPassword").asText() != "") {
					player.setPassword(node.get("newPassword").asText());
					coll.updateOne(new Document("_id", player.getId()),
							new Document("$set", new Document("password", player.getPassword())));
					msg.put("event", "UPDATE USERNAME RESPONSE");
					msg.put("resultado", "Contraseña cambiada correctamente");
					synchronized (player.getSession()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
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
			case "UPDATE EMAIL":
				if (node.get("email").asText() != "") {//el nuevo email debe ser valido
					Bson filterEmail3 = new Document("email", node.get("email").asText());
					Document myPlayerEmail3 = coll.find(filterEmail3).first();
					// Si el email no esta en uso
					if (myPlayerEmail3 == null) {
						player.setEmail(node.get("email").asText());// Se cambia en el server
						player.saveEmail();// Se guarda en base de datos
						msg.put("resultado", true);
					} else {
						msg.put("resultado", false);
					}
				} else {
					msg.put("resultado", false);
				}
				msg.put("event", "UPDATE EMAIL RESPONSE");
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "ASK PLAYER INFO":
				if (!player.isGameStarted()) {
					player.setGameStarted(true);
				}
				updateInfo(player, "PLAYER INFO", player.getSession());
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;

			case "BUILD":
				// Construimos el edificio, si se puede
				player.build(node.get("x").asInt(), node.get("y").asInt(), node.get("edificio").asText(),
						node.get("id").asInt());
				// Pedimos al cliente que refresque el grid con la nueva info
				updateInfo(player, "REFRESH GRID", player.getSession());
				/*actualizamos la puntuacion del jugador*/
				player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[0]);
				player.savePuntuacion();
				msg.put("event", "ACTUALIZAR PUNTUACION");
				msg.put("punctuacion", player.getPuntuacion());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "EDIT":
				Iterator<JsonNode> edificios = node.get("edificios").iterator();
				while (edificios.hasNext()) {
					JsonNode e = edificios.next();
					player.build(e.get("x").asInt(), e.get("y").asInt(), e.get("edificio").asText(),
							e.get("id").asInt());
				}
				updateInfo(player, "REFRESH GRID", player.getSession());
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
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;

			case "LEVELUP_BUILDING":
				Edificio edificio = player.getEdificio(node.get("id").asInt());
				Boolean canILevelUp = false;
				switch (edificio.getSprite()) {

				case "bloqueViviendas":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= BloqueViviendas.COSTS[edificio.getLevel() - 1][1]
							&& player.getCeramica() >= BloqueViviendas.COSTS[edificio.getLevel() - 1][2]
							&& player.getCreditos() >= BloqueViviendas.COSTS[edificio.getLevel() - 1][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						
						player.setMetal(player.getMetal() - BloqueViviendas.COSTS[edificio.getLevel() - 1][1]);
						player.setCeramica(player.getCeramica() - BloqueViviendas.COSTS[edificio.getLevel() - 1][2]);
						player.setCreditos(player.getCreditos() - BloqueViviendas.COSTS[edificio.getLevel() - 1][3]);
					}
					break;

				case "centroAdministrativo":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= CentroAdministrativo.COSTS[edificio.getLevel()][1]
							&& player.getCeramica() >= CentroAdministrativo.COSTS[edificio.getLevel()][2]
							&& player.getCreditos() >= CentroAdministrativo.COSTS[edificio.getLevel()][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroAdministrativo.COSTS[edificio.getLevel()][1]);
						player.setCeramica(player.getCeramica() - CentroAdministrativo.COSTS[edificio.getLevel()][2]);
						player.setCreditos(player.getCreditos() - CentroAdministrativo.COSTS[edificio.getLevel()][3]);
						System.out.println(CentroAdministrativo.COSTS[edificio.getLevel()][1]);
					}
					break;

				case "centroComercio":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= CentroComercio.COSTS[edificio.getLevel() - 1][1]
							&& player.getCeramica() >= CentroComercio.COSTS[edificio.getLevel() - 1][2]
							&& player.getCreditos() >= CentroComercio.COSTS[edificio.getLevel() - 1][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroComercio.COSTS[edificio.getLevel() - 1][1]);
						player.setCeramica(player.getCeramica() - CentroComercio.COSTS[edificio.getLevel() - 1][2]);
						player.setCreditos(player.getCreditos() - CentroComercio.COSTS[edificio.getLevel() - 1][3]);
					}
					break;

				case "centroDeMando":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= CentroMando.COSTS[edificio.getLevel() - 1][1]
							&& player.getCeramica() >= CentroMando.COSTS[edificio.getLevel() - 1][2]
							&& player.getCreditos() >= CentroMando.COSTS[edificio.getLevel() - 1][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroMando.COSTS[edificio.getLevel() - 1][1]);
						player.setCeramica(player.getCeramica() - CentroMando.COSTS[edificio.getLevel() - 1][2]);
						player.setCreditos(player.getCreditos() - CentroMando.COSTS[edificio.getLevel() - 1][3]);
					}
					break;

				case "centroOperaciones":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= CentroOperaciones.COSTS[edificio.getLevel() - 1][1]
							&& player.getCeramica() >= CentroOperaciones.COSTS[edificio.getLevel() - 1][2]
							&& player.getCreditos() >= CentroOperaciones.COSTS[edificio.getLevel() - 1][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						player.setMetal(player.getMetal() - CentroOperaciones.COSTS[edificio.getLevel() - 1][1]);
						player.setCeramica(player.getCeramica() - CentroOperaciones.COSTS[edificio.getLevel() - 1][2]);
						player.setCreditos(player.getCreditos() - CentroOperaciones.COSTS[edificio.getLevel() - 1][3]);
					}
					break;

				case "generador":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= Generador.COSTS[edificio.getLevel() - 1][1]
							&& player.getCeramica() >= Generador.COSTS[edificio.getLevel() - 1][2]
							&& player.getCreditos() >= Generador.COSTS[edificio.getLevel() - 1][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						player.setMetal(player.getMetal() - Generador.COSTS[edificio.getLevel() - 1][1]);
						player.setCeramica(player.getCeramica() - Generador.COSTS[edificio.getLevel() - 1][2]);
						player.setCreditos(player.getCreditos() - Generador.COSTS[edificio.getLevel() - 1][3]);
					}
					break;

				case "laboratorioInvestigacion":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= LaboratorioInvestigacion.COSTS[edificio.getLevel() - 1][1]
							&& player.getCeramica() >= LaboratorioInvestigacion.COSTS[edificio.getLevel() - 1][2]
							&& player.getCreditos() >= LaboratorioInvestigacion.COSTS[edificio.getLevel() - 1][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						player.setMetal(player.getMetal() - LaboratorioInvestigacion.COSTS[edificio.getLevel() - 1][1]);
						player.setCeramica(
								player.getCeramica() - LaboratorioInvestigacion.COSTS[edificio.getLevel() - 1][2]);
						player.setCreditos(
								player.getCreditos() - LaboratorioInvestigacion.COSTS[edificio.getLevel() - 1][3]);
					}
					break;

				case "plataformaExtraccion":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= PlataformaExtraccion.COSTS[edificio.getLevel() - 1][1]
							&& player.getCeramica() >= PlataformaExtraccion.COSTS[edificio.getLevel() - 1][2]
							&& player.getCreditos() >= PlataformaExtraccion.COSTS[edificio.getLevel() - 1][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						player.setMetal(player.getMetal() - PlataformaExtraccion.COSTS[edificio.getLevel() - 1][1]);
						player.setCeramica(
								player.getCeramica() - PlataformaExtraccion.COSTS[edificio.getLevel() - 1][2]);
						player.setCreditos(
								player.getCreditos() - PlataformaExtraccion.COSTS[edificio.getLevel() - 1][3]);
					}
					break;

				case "taller":
					// energia, metal, ceramica, creditos
					if (player.getMetal() >= Taller.COSTS[edificio.getLevel() - 1][1]
							&& player.getCeramica() >= Taller.COSTS[edificio.getLevel() - 1][2]
							&& player.getCreditos() >= Taller.COSTS[edificio.getLevel() - 1][3]
							&& edificio.getLevel() < edificio.getMaxLevel()) {

						canILevelUp = true;
						player.setMetal(player.getMetal() - Taller.COSTS[edificio.getLevel() - 1][1]);
						player.setCeramica(player.getCeramica() - Taller.COSTS[edificio.getLevel() - 1][2]);
						player.setCreditos(player.getCreditos() - Taller.COSTS[edificio.getLevel() - 1][3]);
					}
					break;

				default:
					break;
				}
				if (canILevelUp) {
					edificio.levelUp();
					player.saveEdificios();
					player.saveRecursos();
					/* actualizamos la puntuacion del jugador */
					player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[1]);
					player.savePuntuacion();
					msg.put("event", "ACTUALIZAR PUNTUACION");
					msg.put("punctuacion", player.getPuntuacion());
					synchronized (player.getSession()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				}
				msg.put("event", "ANSWER_LEVELUP_BUILDING");
				msg.put("resultado", canILevelUp);
				msg.put("id", node.get("id").asInt());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}

				msg.put("event", "REFRESH MENU");
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}

				msg = mapper.createObjectNode();
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "ASK_LEVELUP_ROBOT":
				canILevelUp = ((Taller) player.getEdificio(node.get("taller").asInt())).getRobot(node.get("id").asInt())
						.levelUp();
				msg.put("event", "REFRESH MENU");
				msg.put("id", node.get("taller").asInt());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "RECOLECT":
				player.recolect(node.get("id").asInt());
				/* actualizamos la puntuacion del jugador */
				player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[2]);
				player.savePuntuacion();
				msg.put("event", "ACTUALIZAR PUNTUACION");
				msg.put("punctuacion", player.getPuntuacion());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "RECOLECTAR ROBOT":
				((Taller) player.getEdificio(node.get("id").asInt())).getRobot(node.get("robotId").asInt())
						.recolectar();
				msg.put("event", "METAL RECOLECTADO");
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
				msg.put("metal", player.getMetal());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "ENVIAR":
				((Taller) player.getEdificio(node.get("tallerId").asInt())).getRobot(node.get("robotId").asInt())
						.producir();
				msg.put("event", "REFRESH MENU");
				msg.put("id", node.get("tallerId").asInt());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				player.saveEdificios();
				break;
			case "GET TUTORIAL INTRO":
				filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				myPlayer = coll.find(filter).first();
				boolean tutOpened = myPlayer.getBoolean("TutorialIntro", false);
				if (!tutOpened) {
					coll.updateOne(new Document("_id", player.getId()), new Document("$set", 
							new Document("tutorialIntro", true)));
				}
				msg.put("event", "TUTORIAL INTRO");
				msg.put("tutorialOpened", tutOpened);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET CENTRO DE MANDO MENU":
				filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				myPlayer = coll.find(filter).first();
				boolean cdmOpened = myPlayer.getBoolean("tutorialCDM", false);
				if (!cdmOpened) {
					coll.updateOne(new Document("_id", player.getId()), new Document("$set", 
							new Document("tutorialCDM", true)));
				}
				msg.put("event", "CENTRO DE MANDO MENU");
				msg.put("tutorialOpened", cdmOpened);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET CENTRO ADMINISTRATIVO MENU":
				filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				myPlayer = coll.find(filter).first();
				boolean caOpened = myPlayer.getBoolean("tutorialCA", false);
				if (!caOpened) {
					coll.updateOne(new Document("_id", player.getId()), new Document("$set", 
							new Document("tutorialCA", true)));
				}
				msg.put("event", "CENTRO ADMINISTRATIVO MENU");
				msg.put("tutorialOpened", caOpened);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET CENTRO DE COMERCIO MENU":
				filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				myPlayer = coll.find(filter).first();
				boolean cdcOpened = myPlayer.getBoolean("tutorialCDC", false);
				if (!cdcOpened) {
					coll.updateOne(new Document("_id", player.getId()), new Document("$set", 
							new Document("tutorialCDC", true)));
				}
				msg.put("event", "CENTRO DE COMERCIO MENU");
				msg.put("tutorialOpened", cdcOpened);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET CENTRO DE OPERACIONES MENU":
				filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				myPlayer = coll.find(filter).first();
				boolean cdoOpened = myPlayer.getBoolean("tutorialCDO", false);
				if (!cdoOpened) {
					coll.updateOne(new Document("_id", player.getId()), new Document("$set", 
							new Document("tutorialCDO", true)));
				}
				msg.put("event", "CENTRO DE OPERACIONES MENU");
				msg.put("tutorialOpened", cdoOpened);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET PLATAFORMA EXTRACCION MENU":
				msg.put("event", "PLATAFORMA EXTRACCION MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				msg.put("produciendo",
						((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getProduciendo());
				msg.put("energia", player.getEdificio(node.get("id").asInt()).getEnergia());
				msg.put("stock", 
						((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getStock());
				msg.put("energiaNecesaria",
						PlataformaExtraccion.COSTS[player.getEdificio(node.get("id").asInt()).getLevel() - 1][0]);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET LABORATORIO INVESTIGACION MENU":
				msg.put("event", "LABORATORIO INVESTIGACION MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				msg.put("produciendo",
						((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getProduciendo());
				msg.put("energia", player.getEdificio(node.get("id").asInt()).getEnergia());
				msg.put("energiaNecesaria",
						LaboratorioInvestigacion.COSTS[player.getEdificio(node.get("id").asInt()).getLevel() - 1][0]);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET BLOQUE VIVIENDAS MENU":
				msg.put("event", "BLOQUE VIVIENDAS MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((BloqueViviendas) player.getEdificio(node.get("id").asInt())).getColonosString());
				msg.put("energy", ((BloqueViviendas) player.getEdificio(node.get("id").asInt())).getEnergia());
				msg.put("energiaNecesaria", 
						BloqueViviendas.COSTS[player.getEdificio(node.get("id").asInt()).getLevel() - 1][0]);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET GENERADOR MENU":
				msg.put("event", "GENERADOR MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET TALLER MENU":
				msg.put("event", "TALLER MENU");
				msg.put("id", node.get("id").asInt());
				msg.put("colonos", ((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).getColonosString());
				msg.put("energia", player.getEdificio(node.get("id").asInt()).getEnergia());
				msg.put("energiaNecesaria", Taller.COSTS[player.getEdificio(node.get("id").asInt()).getLevel() - 1][0]);
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
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET CONSTRUCCION MENU":
				msg.put("event", "CONSTRUCCION MENU");
				msg.put("caBlocked", player.isCaBlocked());
				filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				myPlayer = coll.find(filter).first();
				msg.put("cdcBlocked", myPlayer.getBoolean("cdcBlocked", true));
				msg.put("cdoBlocked", myPlayer.getBoolean("cdoBlocked", true));
				msg.put("labBlocked", myPlayer.getBoolean("labBlocked", true));
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "GET JOBS":
				msg.put("event", "JOBS");
				msg.put("jobs", player.getJobs());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "BUY CELL":
				player.buyCell(node.get("i").asInt(), node.get("j").asInt());
				updateInfo(player, "REFRESH GRID", player.getSession());
				/*actualizamos la puntuacion del jugador*/
				player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[3]);
				player.savePuntuacion();
				msg.put("event", "ACTUALIZAR PUNTUACION");
				msg.put("punctuacion", player.getPuntuacion());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "REFRESH GRID":
				updateInfo(player, "REFRESH GRID", player.getSession());
				break;
			case "PEDIR COLONOS":
				player.requestColonos();
				msg.put("event", "ENVIO DE COLONOS");
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				msg.put("jobs", player.getJobs());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				msg = mapper.createObjectNode();
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "ADD COLONO":
				((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).addColono();
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				player.saveEdificios();
				player.saveRecursos();
				break;
			case "QUITAR COLONO":
				((GeneradorRecursos) player.getEdificio(node.get("id").asInt())).quitarColono();
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				player.saveEdificios();
				player.saveRecursos();
				break;
			case "CREATE AN OFFER":
				msg.put("event", "RESPUESTA CREAR OFERTA");
				boolean ofertaAceptada = false;

				// comprobamos que se tienen los recursos para crear la oferta
				// si es el caso restamos ese material al jugador
				switch (node.get("recurso").asText()) {

				case "metal":
					if (player.getMetal() >= node.get("cantidad").asInt()) {
						ofertaAceptada = true;
						player.setMetal(player.getMetal() - node.get("cantidad").asInt());
						player.saveRecursos();
					}
					break;

				case "ceramica":
					if (player.getCeramica() >= node.get("cantidad").asInt()) {
						ofertaAceptada = true;
						player.setCeramica(player.getCeramica() - node.get("cantidad").asInt());
						player.saveRecursos();
					}
					break;

				default:
					break;
				}

				if (ofertaAceptada) {
					synchronized (this) {
						// creamos una oferta con la info del cliente
						Oferta oferta = new Oferta(ObjectId.get(), player.getId(), node.get("recurso").asText(),
								node.get("cantidad").asInt(), node.get("creditos").asInt());
						// la guardamos en los atributos y bd del jugador
						player.addOferta(oferta);
						player.saveOfertas();
						// la guardamos en la bd comun a todos los jugadores
						Document dbOferta = new Document();
						dbOferta.append("_id", oferta.getId());
						dbOferta.append("playerId", oferta.getPlayerId());
						dbOferta.append("recurso", oferta.getRecurso());
						dbOferta.append("cantidad", oferta.getCantidad());
						dbOferta.append("creditos", oferta.getCreditos());
						collOfertas.insertOne(dbOferta);

						// informamos al cliente
						msg.put("respuesta", ofertaAceptada);
						synchronized (player.getSession()) {
							player.getSession().sendMessage(new TextMessage(msg.toString()));
						}
					}
				} else {

					msg.put("respuesta", false);
					synchronized (player.getSession()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				}
				break;

			case "GIVE ME OFFERS":
				sendOffers(player);
				break;

			case "DELETE AN OFFER":
				synchronized (this) {
					ObjectId miOfertaId = new ObjectId(node.get("idOferta").asText());

					/* primero devolvemos el valor de la oferta */
					Oferta oferta = player.getOferta(miOfertaId);
					switch (oferta.getRecurso()) {

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

					/* borramos la oferta de la base de datos del jugador */
					player.deleteOferta(miOfertaId);
					player.saveOfertas();

					/* borramos la oferta de la base de datos comun a todos los jugadores */
					collOfertas.deleteOne(new Document("_id", miOfertaId));
				}

				msg.put("event", "DELETED OFFER");
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;

			case "BUY AN OFFER":
				synchronized (this) {
					boolean puedoComprar = false;

					ObjectId myOfferId = new ObjectId(node.get("idOferta").asText());

					/* recogemos la oferta de la bd */
					Document myOffer = collOfertas.find(new Document("_id", myOfferId)).first();

					/* si puedo comprarla actualizo mis recursos */
					if (player.getCreditos() >= Integer.parseInt(myOffer.get("creditos").toString())) {
						puedoComprar = true;
						player.setCreditos(player.getCreditos() - Integer.parseInt(myOffer.get("creditos").toString()));
						switch (myOffer.get("recurso").toString()) {
						case "metal":
							player.setMetal(player.getMetal() + Integer.parseInt(myOffer.get("cantidad").toString()));
							break;
						case "ceramica":
							player.setCeramica(
									player.getCeramica() + Integer.parseInt(myOffer.get("cantidad").toString()));
							break;
						default:
							break;
						}
						player.saveRecursos();

						/* le doy el dinero al vendedor de la oferta */
						Player playerVendedor = players.get(new ObjectId(myOffer.get("playerId").toString()));
						playerVendedor.deleteOferta(myOfferId);
						playerVendedor.setCreditos(
								playerVendedor.getCreditos() + Integer.parseInt(myOffer.get("creditos").toString()));
						playerVendedor.saveOfertas();
						playerVendedor.saveRecursos();
						player.setPuntuacion(player.getPuntuacion() + PUNTUACIONES[4]);
						player.savePuntuacion();
						/*
						 * si el usuario al que le han comprado está conectado hay darle
						 * retroalimentacion
						 */
						if (playerVendedor.getSession().isOpen()) {
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
						/* borramos la oferta de la base de datos comun a todos los jugadores */
						collOfertas.deleteOne(new Document("_id", myOfferId));

						msg = mapper.createObjectNode();
						msg.put("event", "OFFER PURCHASED");
						msg.put("respuesta", puedoComprar);
						synchronized (player.getSession()) {
							player.getSession().sendMessage(new TextMessage(msg.toString()));
						}
						msg = mapper.createObjectNode();

					} else {
						msg.put("respuesta", puedoComprar);
						synchronized (player.getSession()) {
							player.getSession().sendMessage(new TextMessage(msg.toString()));
						}
					}
				}
				break;

			case "I AM HERE":
				msg.put("event", "OK");
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;

			case "GIVE ME PUNCTUATIONS":
				sendRankingGlobal(getRanking(), player);
				break;
			case "GIVE ME FRIEND PUNCTUATIONS":
				sendRankingAmigos(getRanking(), player);
				break;
			case "RECOVER PASSWORD":
				System.out.println("Hey");
				// Solo se manda el correo si se cumple que el email esta registrado
				Bson filterEmail = new Document("email", node.get("email").asText());
				Document myPlayerEmail = coll.find(filterEmail).first();
				if (myPlayerEmail != null) {
					System.out.println("Hey");
					recoverPasswordHandler.execute(node.get("email").asText());
					//node.get("email").asText()
				}
				break;
			case "RECOVER USERNAME":
				// Solo se manda el correo si se cumple que el email esta registrado
				Bson filterEmail2 = new Document("email", node.get("email").asText());
				Document myPlayerEmail2 = coll.find(filterEmail2).first();
				if (myPlayerEmail2 != null) {
					recoverUserNameHandler.execute(node.get("email").asText());
				}
				break;
			case "SEARCH USERS":
				coll.createIndex(Indexes.text("name"));
				Bson filterUsers = new Document("name", node.get("search").asText());
				BasicDBObject q = new BasicDBObject();
				q.put("name",  java.util.regex.Pattern.compile(node.get("search").asText(), Pattern.CASE_INSENSITIVE));
				FindIterable<Document> users = coll.find(q);
				Iterator itUsers = users.iterator();
				Collection<ObjectId> friends = player.getFriends();
				ArrayNode arrayNodeUsers = mapper.createArrayNode(); // JSON para el cliente
				while (itUsers.hasNext()) {
					Document user = (Document) itUsers.next();
					if (!user.getString("name").equals(player.getUsername()) && !friends.contains(user.getObjectId("_id"))) {
						ObjectNode jsonUser = mapper.createObjectNode();
						jsonUser.put("id", user.getObjectId("_id").toString());
						jsonUser.put("name", user.getString("name"));		
						arrayNodeUsers.addPOJO(jsonUser);
					}
				}
				msg.put("event", "USERS FOUND");
				msg.putPOJO("users", arrayNodeUsers);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "REQUEST FRIENDSHIP":
				coll.updateOne(new Document("_id", new ObjectId(node.get("idReceiver").asText())), 
						Updates.addToSet("friendRequests", new ObjectId(node.get("idTransmitter").asText())));
				break;
			case "SHOW FRIEND REQUESTS":
				ArrayNode arrayNodeRequests = mapper.createArrayNode(); // JSON para el cliente
				for (ObjectId id : player.getFriendRequests()) {					
					ObjectNode jsonRequest = mapper.createObjectNode();
					jsonRequest.put("id", id.toString());
					Bson filterRequest = new Document("_id", id);
					jsonRequest.put("name", coll.find(filterRequest).first().getString("name"));		
					arrayNodeRequests.addPOJO(jsonRequest);
				}
				msg.put("event", "USERS FOUND");
				msg.putPOJO("users", arrayNodeRequests);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "ACCEPT FRIEND":
				coll.updateOne(new Document("_id", new ObjectId(node.get("idTransmitter").asText())), 
						Updates.addToSet("friends", new ObjectId(node.get("idReceiver").asText())));
				coll.updateOne(new Document("_id", new ObjectId(node.get("idReceiver").asText())), 
						Updates.addToSet("friends", new ObjectId(node.get("idTransmitter").asText())));
				coll.updateOne(new Document("_id", new ObjectId(node.get("idReceiver").asText())),
						Updates.pull("friendRequests", new ObjectId(node.get("idTransmitter").asText())));
				coll.updateOne(new Document("_id", new ObjectId(node.get("idTransmitter").asText())),
						Updates.pull("friendRequests", new ObjectId(node.get("idReceiver").asText())));
				arrayNodeRequests = mapper.createArrayNode(); // JSON para el cliente
				for (ObjectId id : player.getFriendRequests()) {					
					ObjectNode jsonRequest = mapper.createObjectNode();
					jsonRequest.put("id", id.toString());
					Bson filterRequest = new Document("_id", id);
					jsonRequest.put("name", coll.find(filterRequest).first().getString("name"));		
					arrayNodeRequests.addPOJO(jsonRequest);
				}
				msg.put("event", "USERS FOUND");
				msg.putPOJO("users", arrayNodeRequests);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "DELETE FRIEND":
				coll.updateOne(new Document("_id", new ObjectId(node.get("idReceiver").asText())),
						Updates.pull("friends", new ObjectId(node.get("idTransmitter").asText())));
				coll.updateOne(new Document("_id", new ObjectId(node.get("idTransmitter").asText())),
						Updates.pull("friends", new ObjectId(node.get("idReceiver").asText())));
			case "SHOW FRIENDS":
				arrayNodeRequests = mapper.createArrayNode(); // JSON para el cliente
				for (ObjectId id : player.getFriends()) {					
					ObjectNode jsonRequest = mapper.createObjectNode();
					jsonRequest.put("id", id.toString());
					Bson filterRequest = new Document("_id", id);
					jsonRequest.put("name", coll.find(filterRequest).first().getString("name"));		
					arrayNodeRequests.addPOJO(jsonRequest);
				}
				msg.put("event", "USERS FOUND");
				msg.putPOJO("users", arrayNodeRequests);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "SHOW CITY":
				ObjectId idHost = new ObjectId(node.get("id").asText());
				Player host = players.get(idHost);
				filter = new Document("_id", idHost);
				Document dbHost = coll.find(filter).first();
				if (host == null && dbHost != null) {
					host = new Player(null, idHost);
					host.setUsername(dbHost.getString("name"));
					host.updateGrid((Collection<Document>) dbHost.get("grid"));
					host.setEdificioId(dbHost.getInteger("edificioId", 0));
					host.updateEdificios((Collection<Document>) dbHost.get("edificios"));
					host.updateOfertas((Collection<Document>) dbHost.get("ofertas"));
					host.setPuntuacion(dbHost.get("puntuacion", 0));
					host.setEnergia(dbHost.getInteger("energia", 0));
					host.setMetal(dbHost.getInteger("metal", 100));
					host.setCeramica(dbHost.getInteger("ceramica", 100));
					host.setCreditos(dbHost.getInteger("creditos", 1000));
					host.setUnionCoins(dbHost.getInteger("unionCoins", 0));
					host.setCosteCelda(dbHost.getInteger("costeCelda", 0));
					host.setCeldasCompradas(dbHost.getInteger("celdasCompradas", 0));
					host.setColonos(dbHost.getInteger("colonos", 0));
					host.setGameStarted(dbHost.getBoolean("gameStarted", false));
					host.setCaBlocked(dbHost.getBoolean("caBlocked", true));
				}
				if (host != null) {
					msg.put("event", "VISITOR CITY NAME");
					msg.put("name", dbHost.get("cityName", "Unknown city"));
					msg.put("username", host.getUsername());
					synchronized (player.getSession()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
					updateInfo(host, "PLAYER INFO", player.getSession());
				}
				break;
			case "CHANGE CITY NAME":
				String cityName = node.get("name").asText();
				if (cityName.length() <= 15) {
					WebsocketGameHandler.getColl().updateOne(new Document("_id", player.getId()), 
							new Document("$set", new Document("cityName", cityName)));
					msg.put("event", "CITY NAME CHANGED");
					msg.put("name", cityName);
					synchronized (player.getSession()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				}
				break;
			case "GET FINISH CONSTRUCTION PRICE":
				edificio = player.getEdificio(node.get("id").asInt());
				LocalDateTime currentDate = LocalDateTime.now();
				Duration diff = Duration.between(edificio.getBuildingBeginTime(), currentDate);
				long diffMins = diff.toMinutes();
				int duration = TASKMASTER.getTask(player.getId().toString() + edificio.getId() + 0).getDuration();
				int price = (int) ((duration - diffMins) * 2);
				msg.put("event",  "FINISH CONSTRUCTION PRICE");
				msg.put("id", edificio.getId());
				msg.put("price", price);
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "FINISH CONSTRUCTION":
				edificio = player.getEdificio(node.get("id").asInt());
				currentDate = LocalDateTime.now();
				diff = Duration.between(edificio.getBuildingBeginTime(), currentDate);
				diffMins = diff.toMinutes();
				duration = TASKMASTER.getTask(player.getId().toString() + edificio.getId() + 0).getDuration();
				price = (int) ((duration - diffMins) * 2);
				if (player.getUnionCoins() >= price) {
					player.setUnionCoins(player.getUnionCoins() - price);
					TASKMASTER.completeTask(player.getId().toString() + edificio.getId() + 0);
					msg.put("event", "REFRESH MENU");
					msg.put("id", edificio.getId());
					synchronized (player.getSession()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				}
				break;
			case "DEBUG":
				System.out.println("The Debug message was received");
				break;
			case "REFRESH MY MENU":
				msg.put("event", "REFRESH MENU");
				msg.put("id", node.get("edificioId").asInt());
				synchronized (player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
			default:
				break;
			}

		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}

	/* Enviamos las ofertas al cliente */
	private synchronized void sendOffers(Player player) {
		ObjectNode msg = mapper.createObjectNode();
		try {

			ArrayNode offers = mapper.createArrayNode();
			ObjectNode oferta;
			MongoCursor<Document> cursor = collOfertas.find().iterator();
			try {
				while (cursor.hasNext()) {
					oferta = mapper.createObjectNode();
					Document next = cursor.next();
					oferta.put("id", next.getObjectId("_id").toString());
					oferta.put("playerId", next.getObjectId("playerId").toString());
					oferta.put("recurso", next.getString("recurso"));
					oferta.put("cantidad", next.getInteger("cantidad"));
					oferta.put("creditos", next.getInteger("creditos"));
					offers.addPOJO(oferta);
				}
			} finally {
				cursor.close();
			}

			msg.put("event", "SEND OFFERS");
			msg.putPOJO("ofertas", offers);
			synchronized (player.getSession()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}

		} catch (Exception e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
	}

	/* Enviamos las puntuaciones maximas ordenas al jugador */
	private Map<String, Integer> getRanking() {

		HashMap<String, Integer> puntuaciones = new HashMap<>();

		/* extraemos los nombres y las puntuaciones de los jugadores en un mapa */
		try {
			MongoCursor<Document> cursor = coll.find().iterator();
			try {
				while (cursor.hasNext()) {
					Document next = cursor.next();
					puntuaciones.put(next.getString("name"), next.getInteger("puntuacion"));
				}
			} finally {
				cursor.close();
			}

		} catch (Exception e) {
			System.err.println("Exception sending ranking message");
			e.printStackTrace(System.err);
		}

		/*
		 * ordenamos el mapa solucion parcialmente sacada de:
		 * https://www.mkyong.com/java/how-to-sort-a-map-in-java/
		 */
		LinkedList<Map.Entry<String, Integer>> list = new LinkedList<Map.Entry<String, Integer>>(
				puntuaciones.entrySet());

		Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
			public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
				return (o1.getValue()).compareTo(o2.getValue());
			}
		});
		Collections.reverse(list);
		Map<String, Integer> sortedMap = new LinkedHashMap<String, Integer>();
		for (Map.Entry<String, Integer> entry : list) {
			sortedMap.put(entry.getKey(), entry.getValue());
		}
		return sortedMap;
	}
	
	private void sendRankingGlobal(Map<String, Integer> sortedMap, Player player) {
		ObjectNode msg = mapper.createObjectNode();
		String todasLasPuntuaciones = "";
		int numMaxPuntuaciones = 0;
		/* con las puntuaciones ordenadas se las mandamos al cliente en un String */
		for (Map.Entry<String, Integer> entry : sortedMap.entrySet()) {
			if (numMaxPuntuaciones < NUM_MAX_PUNTUACIONES_MOSTRAR) {
				todasLasPuntuaciones += entry.getKey() + "\n" + entry.getValue() + "\n";
				numMaxPuntuaciones++;
			} else {
				break;
			}
		}

		try {
			msg.put("event", "ALL PUNCTUATIONS");
			msg.put("todasLasPuntuaciones", todasLasPuntuaciones);
			synchronized (player.getSession()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
			msg = mapper.createObjectNode();
			msg.put("event", "ACTUALIZAR PUNTUACION");
			msg.put("punctuacion", player.getPuntuacion());
			synchronized (player.getSession()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private void sendRankingAmigos(Map<String, Integer> sortedMap, Player player) {
		HashMap <ObjectId, String> friends = new HashMap<>();
		for (ObjectId key : player.getFriends()) {
			Bson filter = new Document("_id", key);
			Document dbFriend = coll.find(filter).first();
			friends.put(key, dbFriend.getString("name"));
		}
		
		ObjectNode msg = mapper.createObjectNode();
		String todasLasPuntuaciones = "";
		int numMaxPuntuaciones = 0;
		/* con las puntuaciones ordenadas se las mandamos al cliente en un String */
		for (Map.Entry<String, Integer> entry : sortedMap.entrySet()) {
			if (numMaxPuntuaciones < NUM_MAX_PUNTUACIONES_MOSTRAR) {
				if (friends.containsValue(entry.getKey()) || entry.getKey().equals(player.getUsername())) {
					todasLasPuntuaciones += entry.getKey() + "\n" + entry.getValue() + "\n";
					numMaxPuntuaciones++;
				}
			} else {
				break;
			}
		}

		try {
			msg.put("event", "ALL PUNCTUATIONS");
			msg.put("todasLasPuntuaciones", todasLasPuntuaciones);
			synchronized (player.getSession()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
			msg = mapper.createObjectNode();
			msg.put("event", "ACTUALIZAR PUNTUACION");
			msg.put("punctuacion", player.getPuntuacion());
			synchronized (player.getSession()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	// Informa al cliente y a la BDD de una actualizacion en la informacion del jugador (Grid y edificios)
	public static void updateInfo(Player player, String event, WebSocketSession session) {
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
					jsonEdificio.put("jobs", ((GeneradorRecursos) e).getJobs());
					jsonEdificio.put("numColonos", ((GeneradorRecursos) e).getColonos());
					if (e instanceof Taller) {
						ArrayNode arrayNodeRobots = mapper.createArrayNode(); // JSON para el cliente
						for (Robot r : ((Taller) e).getRobots()) {
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
			synchronized (session) {
				session.sendMessage(new TextMessage(msg.toString()));
			}
		} catch (Exception e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
		player.saveAll();
	}
	
}
