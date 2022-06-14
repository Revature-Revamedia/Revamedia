package com.revature.Revamedia.beans.controllers;

import com.google.zxing.WriterException;
import com.revature.Revamedia.beans.services.AuthService;
import com.revature.Revamedia.beans.services.JsonWebToken;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.*;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.exceptions.UnauthorizedUserException;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.io.IOException;

/**
 * @Author: Giorgi Amirajibi, Mohammad Foroutanyazdian, Fatemeh Goudarzi, Tony Henderson
 * @Contributor: Kenneth Strohm, Randall Hale
 */

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final JsonWebToken jsonWebToken;
    private final String error = "error";

    @Autowired
    public AuthController(AuthService authService, JsonWebToken jsonWebToken, UserService userService){
        this.authService = authService;
        this.jsonWebToken = jsonWebToken;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody UserRegisterDto userRegisterDto) {
        userRegisterDto.setEmail(userRegisterDto.getEmail().toLowerCase());
        return authService.register(userRegisterDto);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody AuthDto authDto) {
        JSONObject jsonObject = new JSONObject();
        if(!authService.twoFactorAuthEnabled(authDto)){
            return authService.login(authDto);
        }
        else {
            if(authService.login(authDto).getStatusCode().is2xxSuccessful()){
                jsonObject.put("status", "redirect");
                jsonObject.put("username", authDto.getUsername());
                return ResponseEntity.status(HttpStatus.OK).body(jsonObject);
            }
            jsonObject.put(error,"your credentials are incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonObject);
        }
    }

    @PostMapping("/login/twoFA")
    public ResponseEntity<Object> loginWithTwoFactorAuth(@RequestBody TwoFactorDto twoFactorDto){
        JSONObject jsonObject = new JSONObject();
        try {
            if (authService.checkTwoFactorAuthValidity(twoFactorDto)) {
                System.out.println("We are supposed to set cookie here");
                return authService.loginWithTwoFactor(twoFactorDto);
            }
            jsonObject.put(error,"code didn't match");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonObject);
        }
        catch (UnauthorizedUserException e){
            jsonObject.put(error,"you are inauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonObject);
        }
    }

    @PostMapping("/enable")
    public ResponseEntity<Object> enableTwoFactorAuth(@CookieValue("user_session") String token,@RequestBody TwoFactorAuthDto twoFactorAuthDto){
        JSONObject jsonObject = new JSONObject();
        try {
            CookieDto cookieDto = jsonWebToken.verify(token);
            if (authService.twoFactorAuthEnabled(cookieDto.getUsername())){
                jsonObject.put("error","you have two factor auth already enabled");
                return ResponseEntity.ok().body(jsonObject);
            }
            return ResponseEntity.status(HttpStatus.OK).body(authService.enableTwoFactorAuth(cookieDto,twoFactorAuthDto));
        }
        catch (UnauthorizedUserException e) {
            jsonObject.put(error,"you are unauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonObject);
        }
        catch (IOException e) {
            jsonObject.put(error,"qr code was not created successfully");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonObject);
        }
        catch (WriterException e) {
            jsonObject.put(error,"qr code was not created successfully");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonObject);
        }
    }

    @PostMapping("/disable")
    public ResponseEntity<Object> disableTwoFactorAuth(@CookieValue("user_session") String token, @RequestBody TwoFactorAuthDto twoFactorAuthDto){
        System.out.println("we are in disable method");
        JSONObject jsonObject = new JSONObject();
        try {
            CookieDto cookieDto = jsonWebToken.verify(token);
            return ResponseEntity.status(HttpStatus.OK).body(authService.disableTwoFactorAuth(cookieDto,twoFactorAuthDto));
        }
        catch (UnauthorizedUserException e) {
            jsonObject.put(error,"you are unauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonObject);
        }

    }

    @PostMapping("/recreate")
    public ResponseEntity<Object> recreateQRCode(@CookieValue("user_session") String token, @RequestBody TwoFactorAuthDto twoFactorAuthDto){
        JSONObject jsonObject = new JSONObject();
        try {
            CookieDto cookieDto = jsonWebToken.verify(token);
            return ResponseEntity.status(HttpStatus.OK).body(authService.enableTwoFactorAuth(cookieDto,twoFactorAuthDto));
        }
        catch (UnauthorizedUserException e) {
            jsonObject.put(error,"you are unauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonObject);
        }
        catch (IOException e) {
            jsonObject.put(error,"qr code was not created successfully");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonObject);
        }
        catch (WriterException e) {
            jsonObject.put(error,"qr code was not created successfully");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonObject);
        }
    }
}
