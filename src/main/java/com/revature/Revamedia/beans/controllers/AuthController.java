package com.revature.Revamedia.beans.controllers;

import com.google.zxing.WriterException;
import com.revature.Revamedia.beans.services.AuthService;
import com.revature.Revamedia.beans.services.JsonWebToken;
import com.revature.Revamedia.dtos.*;
import com.revature.Revamedia.exceptions.UnauthorizedUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;

/**
 * @Author: Giorgi Amirajibi, Mohammad Foroutanyazdian, Fatemeh Goudarzi, Tony Henderson
 * @Contributor: Kenneth Strohm, Randall Hale
 */

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JsonWebToken jsonWebToken;

    @Autowired
    public AuthController(AuthService authService, JsonWebToken jsonWebToken){
        this.authService = authService;
        this.jsonWebToken = jsonWebToken;
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
                return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:4200/auth/login/twoFA")).build();
            }
            return null;
        }
    }

    @PostMapping("/login/twofa")
    public ResponseEntity<Object> loginWithTwoFactorAuth(@CookieValue("user_session") String token, @RequestBody TwoFactorDto twoFactorDto){
        try {
            CookieDto cookieDto = jsonWebToken.verify(token);
            if (authService.checkTwoFactorAuthValidity(cookieDto, twoFactorDto)) {
                return ResponseEntity.status(HttpStatus.OK).body("code is matching");
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
            return ResponseEntity.status(HttpStatus.OK).body(authService.disableTwoFactorAuth(twoFactorAuthDto));
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
