package es.urjc.practica_2019.ZeroGravity;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.MailException;

//Esta tomada de un tutorial de mailing en Springboot

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;
    
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    
    public void prepareAndSend(String to ,String from , String subject, String content, HashMap<String,org.springframework.core.io.Resource> resources ) {
    	try {
    			// Prepare message using a Spring helper
        		final MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
        		MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");// true = multipart						
        		message.setSubject(subject);
        		message.setFrom(from);
        		message.setTo(to);

        		// Create the HTML body using Thymeleaf
    	        message.setText(content, true); // true = isHtml
    	        
    	       
    	       //Añadimos los recursos embebidos (generalmente imagenes)
    	        for(String key: resources.keySet()) {
    	        	message.addInline(key,resources.get(key));
    	        }  
    	        //message.addInline("logo", new ClassPathResource("mailing/images/logo.png"), "image/png");
    	        
    	        javaMailSender.send(mimeMessage);
    	        
    	} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
    	}
    }
}
