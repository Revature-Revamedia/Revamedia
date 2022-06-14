package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.SendEmailService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AuthDto;
import com.revature.Revamedia.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/forgot")
public class ForgotPasswordController {

    private final SendEmailService sendEmailService;
    private final UserService userService;

    @Autowired
    public ForgotPasswordController(SendEmailService sendEmailService, UserService userService){
        this.sendEmailService = sendEmailService;
        this.userService = userService;
    }

    @PostMapping("/email")
    public ResponseEntity<Object> generateEmail(@RequestBody String email){
        if(userService.existsByEmail(email)){
            sendEmailService.sendEmail(email);
            return ResponseEntity.ok("Email was sent to " + email);
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such email");
        }

    }

    //this needs to move to service
    @PostMapping("/reset")
    public ResponseEntity<Object> resetPassword(@RequestBody AuthDto authDto){
        if (userService.existsByUsername(authDto.getUsername())){
            User currentUser = userService.getUserByUsername(authDto.getUsername());
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
            currentUser.setPassword(encoder.encode(authDto.getPassword()));
            currentUser.setResetPasswordToken(null);
            userService.update(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body("Password reset was successful");
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such user");
        }
    }

    @GetMapping("/{token}")
    public ResponseEntity<Object> redirectToPassReset(@PathVariable String token){
        if (userService.existsByResetPasswordToken(token)){
            System.out.println("Good Token");
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:4200/forgot/reset")).build();
        }
        else {
            System.out.println("Bad Token");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Problem with token");
        }
    }


}
