package es.urjc.practica_2019.ZeroGravity.Mailing;

import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import javax.mail.Quota.Resource;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoCollection;

import es.urjc.practica_2019.ZeroGravity.EmailService;
import es.urjc.practica_2019.ZeroGravity.MailContentBuilder;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;


//Patron Singleton utilizado
@Controller
public class RecoverPasswordHandler {

	//private static RecoverPasswordHandler recoverpasswordhandeler; 
	private Executor executor;
	private String from , subject, layout;
	private HashMap<String,String> fixedContentAtributes;
	private HashMap<String, org.springframework.core.io.Resource> fixedResourcesEmbebed;
	
	/*
	 public  static RecoverPasswordHandler getRecoverPassword() {
		 if (recoverpasswordhandeler==null) {
			 recoverpasswordhandeler=new RecoverPasswordHandler();
		 }
		 return recoverpasswordhandeler;
		 }
	*/
	
	@Autowired
	private RecoverPasswordHandler(){
		this.executor = Executors.newFixedThreadPool(10);
		this.from = "zerogravity@exampleEmail.com"; //Aqui se debe aportar el email de zero gravity (aunque quiza mejor leerlo de algun archivo)
		this.subject = "Este es un ejemplo de asunto";//Aqui lo mismmo que arriba pero con el asunto.	
		this.layout = "EmailRecover";//Nombre del archivo que sirve de plantilla en la carpeta resources/templates
		this.fixedContentAtributes = new HashMap<String,String>();
		this.fixedResourcesEmbebed = new HashMap<String,org.springframework.core.io.Resource>();
		
		//Añadimos los atributos fijos de este tipo de mensajes, principalmente imagenes
		fixedContentAtributes.put("logo", "logo");
		fixedContentAtributes.put("cabecera", "cabecera");
		fixedContentAtributes.put("twitter", "twitter");
		fixedContentAtributes.put("youtube", "youtube");
		fixedContentAtributes.put("instagram", "instagram");
		fixedContentAtributes.put("mail", "mail");
		
		//Añadimos la referencia a los archivos(resources)
		fixedResourcesEmbebed.put("logo",new ClassPathResource("mailing/images/logo.png"));
		fixedResourcesEmbebed.put("cabecera",new ClassPathResource("mailing/images/cabecera.png"));
		fixedResourcesEmbebed.put("twitter",new ClassPathResource("mailing/images/twitter-circle-colored.png"));
		fixedResourcesEmbebed.put("youtube",new ClassPathResource("mailing/images/youtube-circle-colored.png"));
		fixedResourcesEmbebed.put("instagram",new ClassPathResource("mailing/images/instagram-circle-colored.png"));
		fixedResourcesEmbebed.put("mail",new ClassPathResource("mailing/images/mail-circle-colored.png"));
		
	}
		 
	@Autowired
    private EmailService emailService;
	
	public void execute(String to) {
		executor.execute(()->RecoverPassword(to));
	}
	
	private void RecoverPassword(String to) {
		
		String newPassword = GeneratePassword();
		
		byte [] passwordBytes = newPassword.getBytes();
		try {
			passwordBytes = MessageDigest.getInstance("MD5").digest(passwordBytes);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		MongoCollection<Document> mongoCollection = WebsocketGameHandler.getColl();
		Bson filterEmail = new Document("email", to);
		Document myPlayerEmail = mongoCollection.find(filterEmail).first();
		ObjectId objectId = myPlayerEmail.getObjectId("_id");
		mongoCollection.updateOne(new Document("_id", objectId), 
                new Document("$set", new Document("password", passwordBytes)));
		
		HashMap<String,String> auxHashmap =  new HashMap<String, String>(fixedContentAtributes);
		
		auxHashmap.put("pass", newPassword);
		
		
		String content = MailContentBuilder.build(auxHashmap,layout);
		emailService.prepareAndSend(to,from, subject,content,fixedResourcesEmbebed);
	}
	
	private String GeneratePassword() {
		String password = null;
		byte [] passwordBytes = null;
		try {
		String[] symbols = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"};
		int length = 10;
		Random random;
		
		random = SecureRandom.getInstanceStrong();
		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
		    int indexRandom = random.nextInt( symbols.length );
		    sb.append( symbols[indexRandom] );
		}
		password = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} // as of JDK 8, this should return the strongest algorithm available to the JVM
		return password;
	}
	
}
