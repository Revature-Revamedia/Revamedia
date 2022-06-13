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
        if(!authService.twoFactorAuthEnabled(authDto)){
            return authService.login(authDto);
        }
        else {
            if(authService.login(authDto).getStatusCode().is2xxSuccessful()){
                //return authService.login(authDto);
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("status", "redirect");
                jsonObject.put("username", authDto.getUsername());
                return ResponseEntity.status(HttpStatus.OK).body(jsonObject);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/login/twoFA")
    public ResponseEntity<Object> loginWithTwoFactorAuth(@RequestBody TwoFactorDto twoFactorDto){
        try {
            CookieDto cookieDto = new CookieDto();
            User currentUser = userService.getUserByUsername(twoFactorDto.getUsername());
            cookieDto.setUsername(currentUser.getUsername());
            cookieDto.setUserId(currentUser.getUserId());
            cookieDto.setEmail(currentUser.getEmail());
            if (authService.checkTwoFactorAuthValidity(twoFactorDto)) {
                return ResponseEntity.status(HttpStatus.OK).body(cookieDto);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("code didn't match");
        }
        catch (UnauthorizedUserException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("you are unauthorized");
        }
    }

    @PostMapping("/enable")
    public ResponseEntity<Object> enableTwoFactorAuth(@CookieValue("user_session") String token,@RequestBody TwoFactorAuthDto twoFactorAuthDto){
        try {
            CookieDto cookieDto = jsonWebToken.verify(token);
            return ResponseEntity.status(HttpStatus.OK).body(authService.enableTwoFactorAuth(cookieDto,twoFactorAuthDto));
        }
        catch (UnauthorizedUserException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("you are unauthorized");
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
        catch (WriterException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/disable")
    public ResponseEntity<Object> disableTwoFactorAuth(@CookieValue("user_session") String token, @RequestBody TwoFactorAuthDto twoFactorAuthDto){
        try {
            CookieDto cookieDto = jsonWebToken.verify(token);
            return ResponseEntity.status(HttpStatus.OK).body(authService.disableTwoFactorAuth(cookieDto,twoFactorAuthDto));
        }
        catch (UnauthorizedUserException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("you are unauthorized");
        }

    }

    @PostMapping("/recreate")
    public ResponseEntity<Object> recreateQRCode(@CookieValue("user_session") String token, @RequestBody TwoFactorAuthDto twoFactorAuthDto){
        try {
            CookieDto cookieDto = jsonWebToken.verify(token);
            return ResponseEntity.status(HttpStatus.OK).body(authService.enableTwoFactorAuth(cookieDto,twoFactorAuthDto));
        }
        catch (UnauthorizedUserException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("you are unauthorized");
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
        catch (WriterException e) {
            throw new RuntimeException(e);
        }
    }
}
