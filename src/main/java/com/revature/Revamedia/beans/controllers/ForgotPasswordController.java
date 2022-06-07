package com.revature.Revamedia.beans.controllers;


import com.revature.Revamedia.beans.services.JsonWebToken;
import com.revature.Revamedia.beans.services.SendEmailService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AuthDto;
import com.revature.Revamedia.dtos.CookieDto;
import com.revature.Revamedia.dtos.EmailDto;
import com.revature.Revamedia.dtos.ResetPasswordDto;
import com.revature.Revamedia.entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@CrossOrigin
@RequestMapping("/forgot")
public class ForgotPasswordController {

    private final SendEmailService sendEmailService;
    private final UserService userService;
    private final JsonWebToken jsonWebToken;

    public ForgotPasswordController(SendEmailService sendEmailService, UserService userService,JsonWebToken jsonWebToken){
        this.sendEmailService = sendEmailService;
        this.userService = userService;
        this.jsonWebToken = jsonWebToken;
    }

    @PostMapping
    public ResponseEntity<Object> generateEmail(@RequestBody EmailDto emailDto){
        sendEmailService.sendEmail(emailDto.getEmail());
        return ResponseEntity.ok("Email was sent to " + emailDto.getEmail());

    }

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
