package com.revature.Revamedia.beans.services;

import com.revature.Revamedia.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import java.security.SecureRandom;

@Component
public class SendEmailService {

    private final JavaMailSender emailSender;
    private final UserService userService;
    private final JsonWebToken jsonWebToken;

    @Autowired
    public SendEmailService(JavaMailSender emailSender,UserService userService, JsonWebToken jsonWebToken){
        this.emailSender = emailSender;
        this.userService = userService;
        this.jsonWebToken = jsonWebToken;
    }

    public ResponseEntity<Object> sendEmail(String email){
        SimpleMailMessage message = new SimpleMailMessage();

        String stringToRandomize = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        SecureRandom random = new SecureRandom();
        StringBuilder token = new StringBuilder(100);

        for(int i = 0; i < 100; i++){
            token.append(stringToRandomize.charAt(random.nextInt(stringToRandomize.length())));
        }

        System.out.println(token);

        if (userService.existsByEmail(email)){
            User user = userService.findByEmail(email);
            user.setResetPasswordToken(token.toString());
            userService.save(user);
            message.setFrom("Nolovexx@gmail.com");
            message.setTo(email);
            message.setSubject("Password Reset");
            message.setText("Please click on this link to reset your password http://localhost:8080/forgot/" + token);
            emailSender.send(message);
        }

        return ResponseEntity.status(HttpStatus.OK).body("Email was sent");
    }
}
