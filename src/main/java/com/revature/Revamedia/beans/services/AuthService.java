package com.revature.Revamedia.beans.services;

import com.amazonaws.util.IOUtils;
import com.google.zxing.WriterException;
import com.revature.Revamedia.dtos.AuthDto;
import com.revature.Revamedia.dtos.CookieDto;
import com.revature.Revamedia.dtos.TwoFactorAuthDto;
import com.revature.Revamedia.dtos.UserRegisterDto;
import com.revature.Revamedia.entities.User;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;

/**
 * @Author: Giorgi Amirajibi, Mohammad Foroutanyazdian, Fatemeh Goudarzi, Tony Henderson
 * @Contributor: Kenneth Strohm, Randall Hale
 */
@Service
public class AuthService {

    private final UserService userService;
    private final JsonWebToken jwt;
    private final TwoFactorAuthentication twoFactorAuthentication;
    private final FileUploadService fileUploadService;

    BCryptPasswordEncoder encoder;

    @Autowired
    public AuthService(UserService userService, JsonWebToken jwt, TwoFactorAuthentication twoFactorAuthentication, FileUploadService fileUploadService){
        this.jwt=jwt;
        this.userService = userService;
        this.twoFactorAuthentication = twoFactorAuthentication;
        this.fileUploadService = fileUploadService;
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
            System.out.println("User in register");
            System.out.println(user);
            System.out.println(ResponseEntity.ok(user));
            userService.save(user);
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
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
                return ResponseEntity.ok().headers(headers).build();
            } else {
                //throw new UnauthorizedUserException("Unauthorized!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //handle exceptions
    public ResponseEntity<Object> enableTwoFactorAuth(TwoFactorAuthDto twoFactorAuthDto) throws IOException, WriterException {
        User currentUser = userService.getUserById(twoFactorAuthDto.getUserId());
        currentUser.setTwoFactorAuth(true);
        String secretForCurrentUser = twoFactorAuthentication.generateSecretKey();
        currentUser.setSecretTwoFactorKey(secretForCurrentUser);
        String email = "revamedia@gmail.com";
        String companyName = "Revamedia";
        String barCodeUrl = twoFactorAuthentication.getGoogleAuthenticatorBarCode(secretForCurrentUser, email, companyName);
        ByteArrayOutputStream out = twoFactorAuthentication.createQRCode(barCodeUrl,400,400);
        ByteArrayInputStream inStream = new ByteArrayInputStream(out.toByteArray());
        //fileUploadService.uploadFile("image.png",inStream);
        byte[] byteArray = IOUtils.toByteArray(fileUploadService.getFile("fileholderbucket","image.png").getObjectContent());
        currentUser.setQRCodeImage(byteArray);
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArray);
        BufferedImage bufferedImage = ImageIO.read(byteArrayInputStream);
        ImageIO.write(bufferedImage, "png", new File("/Users/Laflammex/IdeaProjects/Project3/QRCode.png"));
        String QRCodeUrl = fileUploadService.getFileUrl("fileholderbucket","image.png");
        currentUser.setQRCodeUrl(QRCodeUrl);
        userService.update(currentUser);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("data", byteArray);
        return ResponseEntity.status(HttpStatus.OK).body(jsonObject);

    }

    public ResponseEntity<Object> disableTwoFactorAuth(TwoFactorAuthDto twoFactorAuthDto){
        User currentUser = userService.getUserById(twoFactorAuthDto.getUserId());
        currentUser.setTwoFactorAuth(false);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    public void setEncoder(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }
}
