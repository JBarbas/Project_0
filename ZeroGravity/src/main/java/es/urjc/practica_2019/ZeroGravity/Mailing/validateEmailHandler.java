package es.urjc.practica_2019.ZeroGravity.Mailing;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Random;
import java.util.concurrent.Executors;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;

import com.mongodb.client.MongoCollection;

import es.urjc.practica_2019.ZeroGravity.MailContentBuilder;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;
import es.urjc.practica_2019.ZeroGravity.Mailing.RecoverPasswordHandler;


@Controller
public class validateEmailHandler extends MailingHandler{
	
	@Autowired
	private validateEmailHandler(){
		super();
		this.subject = "Validate Email";//Aqui lo mismmo que arriba pero con el asunto.	
		this.layout = "ConfirmEmail";//Nombre del archivo que sirve de plantilla en la carpeta resources/templates	
	}
		 
	public void execute(String to) {
		executor.execute(()->validateEmailHandler(to));
	}
	
	private void validateEmailHandler(String to){
		System.out.println("Entra o que");
		//Añadimos la contraseña al mensaje y lo mandamos
		HashMap<String,String> auxHashmap =  new HashMap<String, String>(fixedContentAtributes);
		
		String code = RecoverPasswordHandler.generatePassword();
		String content = MailContentBuilder.build(auxHashmap,layout);
		emailService.prepareAndSend(to,from, subject,content,fixedResourcesEmbebed);
		
		//Crear fichero
		//File original = new File("src/test/resources/copiedWithIo.txt");
		File copied = new File("src/main/resources/static/validate/" + code + ".html");
	    try (
	      InputStream in = new BufferedInputStream(
	        new FileInputStream("src/main/resources/static/assets/text/validateMenu.html"));
	      OutputStream out = new BufferedOutputStream(
	        new FileOutputStream(copied))) {
	  
	        byte[] buffer = new byte[1024];
	        int lengthRead;
	        while ((lengthRead = in.read(buffer)) > 0) {
	            out.write(buffer, 0, lengthRead);
	            out.flush();
	        }
	    }catch(FileNotFoundException e) {
	    	System.out.println("Que passsaa");
	    	e.printStackTrace();
	    }
	    catch(IOException e) {
	    	System.out.println("Barbitas");
	    	e.printStackTrace();
	    }
	  
	    /*assertThat(copied).exists();
	    assertThat(Files.readAllLines(original.toPath())
	      .equals(Files.readAllLines(copied.toPath())));*/
	}
}
