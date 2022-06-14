package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.SendEmailService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AuthDto;
import com.revature.Revamedia.entities.User;
import net.minidev.json.JSONObject;
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
        JSONObject jsonObject = new JSONObject();
        if(userService.existsByEmail(email)){
            sendEmailService.sendEmail(email);
            jsonObject.put("success","Email was sent successfully");
            return ResponseEntity.ok("Email was sent to " + email);
        }
        else {
            jsonObject.put("error","No such email");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonObject);
        }

    }

    //this needs to move to service
    @PostMapping("/reset")
    public ResponseEntity<Object> resetPassword(@RequestBody AuthDto authDto){
        JSONObject jsonObject = new JSONObject();
        if (userService.existsByUsername(authDto.getUsername())){
            User currentUser = userService.getUserByUsername(authDto.getUsername());
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
            currentUser.setPassword(encoder.encode(authDto.getPassword()));
            currentUser.setResetPasswordToken(null);
            userService.update(currentUser);
            jsonObject.put("success","Password reset was successful");
            return ResponseEntity.status(HttpStatus.OK).body("Password reset was successful");
        }
        else {
            jsonObject.put("error","No such user");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonObject);
        }
    }

    @GetMapping("/{token}")
    public ResponseEntity<Object> redirectToPassReset(@PathVariable String token){
        if (userService.existsByResetPasswordToken(token)){
            System.out.println("Good Token");
//            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:4200/forgot/reset")).build();
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://220328-revamedia-ui.s3-website-us-east-1.amazonaws.com/forgot/reset")).build();
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Problem with token");
        }
    }


}
