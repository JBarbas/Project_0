package es.urjc.practica_2019.ZeroGravity;

import java.util.Date;
import java.util.Properties;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.mail.*;
import javax.mail.internet.*;

import com.sun.mail.smtp.SMTPTransport;

public class SendMailBySite {
	private static Executor executor = Executors.newFixedThreadPool(10);
	// for example, smtp.mailgun.org
	private static Session session;
	private static final String SMTP_SERVER = "smtp.mailtrap.io";
	private static final String USERNAME = "ea563eeee40c43";
	private static final String PASSWORD = "5a0ba6ee17cdba";

	public static void main(String[] args) {

		Properties prop = System.getProperties();
		prop.put("mail.smtp.host", SMTP_SERVER); // optional, defined in SMTPTransport
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.port", "25"); // default port 25
	     
		session = Session.getDefaultInstance(prop, 
                new Authenticator(){
            protected PasswordAuthentication getPasswordAuthentication() {
               return new PasswordAuthentication(USERNAME, PASSWORD);
            }});

	}
	
	private static void SendRecoverMail(String EMAIL_TO,String EMAIL_FROM,String EMAIL_SUBJECT,String EMAIL_TEXT) {
		//synchronized (session) {

			try {
				Message msg = new MimeMessage(session);
				// from
				msg.setFrom(new InternetAddress(EMAIL_FROM));
				// to
				msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(EMAIL_TO, false));
				// subject
				msg.setSubject(EMAIL_SUBJECT);
				// content
				msg.setText(EMAIL_TEXT);
				msg.setSentDate(new Date());
				
				
				Transport.send(msg);

			} catch (MessagingException e) {
				e.printStackTrace();
			}
		//}
	}
	
	public static void SendRecoverMailWrap(String EMAIL_TO,String EMAIL_FROM,String EMAIL_SUBJECT,String EMAIL_TEXT) {
		Runnable runnableTask = () -> {
		    SendRecoverMail(EMAIL_TO, EMAIL_FROM, EMAIL_SUBJECT, EMAIL_TEXT);
		};
		
		executor.execute(runnableTask);
	}
}
