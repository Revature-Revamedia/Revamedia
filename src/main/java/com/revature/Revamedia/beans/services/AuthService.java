package com.revature.Revamedia.beans.services;

import com.amazonaws.util.IOUtils;
import com.google.zxing.WriterException;
import com.revature.Revamedia.dtos.*;
import com.revature.Revamedia.entities.User;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import java.sql.Timestamp;

/**
 * @Author: Giorgi Amirajibi, Mohammad Foroutanyazdian, Fatemeh Goudarzi, Tony Henderson
 * @Contributor: Kenneth Strohm, Randall Hale
 */
@Service
public class AuthService {

    private final UserService userService;
    private final JsonWebToken jwt;
    private final TwoFactorAuthentication twoFactorAuthentication;

    BCryptPasswordEncoder encoder;

    @Autowired
    public AuthService(UserService userService, JsonWebToken jwt, TwoFactorAuthentication twoFactorAuthentication){
        this.jwt=jwt;
        this.userService = userService;
        this.twoFactorAuthentication = twoFactorAuthentication;
        this.encoder =  new BCryptPasswordEncoder(10);

    }

    public ResponseEntity<Object> register(UserRegisterDto userRegisterDto){

        if (!userService.existsByUsername(userRegisterDto.getUsername())){
            User user = new User();
            user.setUsername(userRegisterDto.getUsername());
            user.setPassword(encoder.encode(userRegisterDto.getPassword()));
            user.setFirstName(userRegisterDto.getFirstName());
            user.setLastName(userRegisterDto.getLastName());
            user.setEmail(userRegisterDto.getEmail());
            user.setDateCreated(new Timestamp(System.currentTimeMillis()));
            user.setProfilePicture("https://randomuser.me/api/portraits/lego/1.jpg");
            userService.save(user);
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("The username or email is not unique");
        }
    }

    /**
     * @Author: Terrell Crawford
     */
    public ResponseEntity<Object> login(AuthDto authDto) {
        //If user exists check stored password hash against given password else respond with code 404
        if (userService.existsByUsername((authDto.getUsername()))) {
            //loads user with matching username into user object
            User user = userService.findUserByUsername(authDto.getUsername());
            if (encoder.matches(authDto.getPassword(), user.getPassword())) {
                String headerValue = jwt.sign(new CookieDto(user));
                HttpHeaders headers= new HttpHeaders();
                headers.add("Set-Cookie", "user_session="+ headerValue +"; Max-Age=86400; Path=/;");
                //If the give password matches hashed password in DB t
                return new ResponseEntity<>(jwt.verify(headerValue), headers, HttpStatus.OK);
            } else {
                //throw new UnauthorizedUserException("Unauthorized!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //handle exceptions

    public ResponseEntity<Object> enableTwoFactorAuth(CookieDto cookieDto,TwoFactorAuthDto twoFactorAuthDto) throws IOException, WriterException {
        User currentUser = userService.getUserById(cookieDto.getUserId());
        if (!currentUser.isTwoFactorAuth()){
            currentUser.setTwoFactorAuth(twoFactorAuthDto.isTwoFactorAuth());
            String secretForCurrentUser = twoFactorAuthentication.generateSecretKey();
            currentUser.setSecretTwoFactorKey(secretForCurrentUser);
            String email = cookieDto.getEmail();
            String companyName = "Revamedia";
            String barCodeUrl = twoFactorAuthentication.getGoogleAuthenticatorBarCode(secretForCurrentUser, email, companyName);
            ByteArrayOutputStream out = twoFactorAuthentication.createQRCode(barCodeUrl,100,100);
            ByteArrayInputStream inStream = new ByteArrayInputStream(out.toByteArray());
            byte [] byteArray = IOUtils.toByteArray(inStream);
            //fileUploadService.uploadFile("image.png",inStream);
            //byte[] byteArray = IOUtils.toByteArray(fileUploadService.getFile("","image.png").getObjectContent());
            currentUser.setQRCodeImage(byteArray);
            //String QRCodeUrl = fileUploadService.getFileUrl("","image.png");
            //currentUser.setQRCodeUrl(QRCodeUrl);
            userService.update(currentUser);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("data", byteArray);
            // else should be just enable it in the database
            return ResponseEntity.status(HttpStatus.OK).body(jsonObject);
        }
        return ResponseEntity.ok("Two Factor Authentication is already enabled");
    }

    public ResponseEntity<Object> disableTwoFactorAuth(CookieDto cookieDto, TwoFactorAuthDto twoFactorAuthDto){
        User currentUser = userService.getUserById(cookieDto.getUserId());
        if (currentUser.isTwoFactorAuth()){
            currentUser.setTwoFactorAuth(false);
            userService.update(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body("Two factor authentication was disabled");
        }
        return ResponseEntity.ok("Two Factor Authentication is already disabled");
    }

    public boolean twoFactorAuthEnabled(AuthDto authDto){
        return userService.existsByTwoFactorAuth(authDto.getUsername());
    }

    public boolean checkTwoFactorAuthValidity(TwoFactorDto twoFactorDto){
        User currentUser = userService.getUserByUsername(twoFactorDto.getUsername());
        String currentUserSecretTwoFactorKey = currentUser.getSecretTwoFactorKey();
        return twoFactorDto.getSixDigitCode().equals(twoFactorAuthentication.getTOTPCode(currentUserSecretTwoFactorKey));
    }


    public void setEncoder(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }
}
