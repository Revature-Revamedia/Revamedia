package com.revature.Revamedia.beans.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;


import com.google.zxing.WriterException;
import com.revature.Revamedia.dtos.*;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.revature.Revamedia.entities.User;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@SpringBootTest
public class AuthServiceTest {
    private final AuthService authService;

    @MockBean
    private UserService mockUserService;

    @MockBean
    private JsonWebToken mockJwt;
    @MockBean
    private TwoFactorAuthentication mockTwoFactorAuthentication;

    @Mock
    private BCryptPasswordEncoder mockBCryptPasswordEncoder;

    public AuthServiceTest(@Autowired AuthService authService){
         this.authService=authService;
    }

    @BeforeEach
    public void beforeEach() {
        authService.setEncoder(mockBCryptPasswordEncoder);
    }

    @Test
    public void loginPassesWhenUsernameAndPasswordMatchInDB(){

        User exampleUser = new User();
        exampleUser.setUserId(4);
        exampleUser.setUsername("shady");
        exampleUser.setPassword("Password1!");
        exampleUser.setFirstName("Terrell");
        exampleUser.setLastName("Crawford");
        AuthDto userToLogin = new AuthDto("shady", "Password1!");

        when(mockUserService.existsByUsername(any())).thenReturn(true);
        when(mockUserService.findUserByUsername(any())).thenReturn(exampleUser);
        when(mockBCryptPasswordEncoder.matches(any(), any())).thenReturn(true);
        when(mockJwt.sign(any())).thenReturn("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJKc29uIjoie1widXNlcklkXCI6NCxcInVzZXJuYW1lXCI6XCJzaGFkeVwifSJ9.LSzPbhNAALEFrBWZPpf8KGvREormRNt3tXFkGMTvnU3-MPHw76JD5cmreZJMYaSwNt7H6YJlALCFAWobPAKWbw");
        authService.login(userToLogin);
        assertNotEquals(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(), authService.login(userToLogin));
        assertNotEquals(ResponseEntity.status(HttpStatus.NOT_FOUND).build(), authService.login(userToLogin));
    }

    @Test
    public void loginFailsWhenUserDoesntExist(){
        User exampleUser = new User();
        exampleUser.setUserId(4);
        exampleUser.setUsername("shady");
        exampleUser.setPassword("Password1!");
        exampleUser.setFirstName("Terrell");
        exampleUser.setLastName("Crawford");
        AuthDto userToLogin = new AuthDto("shady", "Password1!");

        when(mockUserService.existsByUsername(any())).thenReturn(false);
        when(mockUserService.findUserByUsername(any())).thenReturn(exampleUser);
        when(mockJwt.sign(any())).thenReturn("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJKc29uIjoie1widXNlcklkXCI6NCxcInVzZXJuYW1lXCI6XCJzaGFkeVwifSJ9.LSzPbhNAALEFrBWZPpf8KGvREormRNt3tXFkGMTvnU3-MPHw76JD5cmreZJMYaSwNt7H6YJlALCFAWobPAKWbw");
        authService.login(userToLogin);
        assertNotEquals(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(), authService.login(userToLogin));
        assertEquals(ResponseEntity.status(HttpStatus.NOT_FOUND).build(), authService.login(userToLogin));
    }

    @Test
    public void loginFailsWhenGivenWrongPassword(){
        User exampleUser = new User();
        exampleUser.setUserId(4);
        exampleUser.setUsername("shady");
        exampleUser.setPassword("Password0!");
        exampleUser.setFirstName("Terrell");
        exampleUser.setLastName("Crawford");
        AuthDto userToLogin = new AuthDto("shady", "Password1!");
        when(mockBCryptPasswordEncoder.matches(any(), any())).thenReturn(false);
        when(mockUserService.existsByUsername(any())).thenReturn(true);
        when(mockUserService.findUserByUsername(any())).thenReturn(exampleUser);
        when(mockJwt.sign(any())).thenReturn("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJKc29uIjoie1widXNlcklkXCI6NCxcInVzZXJuYW1lXCI6XCJzaGFkeVwifSJ9.LSzPbhNAALEFrBWZPpf8KGvREormRNt3tXFkGMTvnU3-MPHw76JD5cmreZJMYaSwNt7H6YJlALCFAWobPAKWbw");
        authService.login(userToLogin);
        assertEquals(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(), authService.login(userToLogin));
        assertNotEquals(ResponseEntity.status(HttpStatus.NOT_FOUND).build(), authService.login(userToLogin));
    }

    @Test
    public void registerSucceedsAndReturnsUserWhenUsernameIsNotTaken(@Autowired AuthService authService) {
        UserRegisterDto userRegisterDtoToPassIn = new UserRegisterDto("username", "password", "John", "Doe", "email@email.com");
        when(mockBCryptPasswordEncoder.encode(userRegisterDtoToPassIn.getPassword())).thenReturn(userRegisterDtoToPassIn.getPassword());
        User user = new User();
        user.setUsername(userRegisterDtoToPassIn.getUsername());
        user.setPassword(userRegisterDtoToPassIn.getPassword());
        user.setFirstName(userRegisterDtoToPassIn.getFirstName());
        user.setLastName(userRegisterDtoToPassIn.getLastName());
        user.setEmail(userRegisterDtoToPassIn.getEmail());
        when(mockUserService.existsByUsername(any())).thenReturn(false);
        when(mockUserService.save(any())).thenReturn(user); // User passed in to mock will not be the same as actual method. New User is created in actual method.
        ResponseEntity<Object> responseToCheck = ResponseEntity.ok().build();

        ResponseEntity<Object> response = authService.register(userRegisterDtoToPassIn);

        assertEquals(response, responseToCheck);
    }

    @Test
    public void registerReturnsResponseEntityStatusConflictWhenUsernameIsTaken(@Autowired AuthService authService) {
        UserRegisterDto userRegisterDtoToPassIn = new UserRegisterDto("username", "password", "John", "Doe", "email@email.com");
        when(mockBCryptPasswordEncoder.encode(userRegisterDtoToPassIn.getPassword())).thenReturn(userRegisterDtoToPassIn.getPassword());
        User user = new User();
        user.setUsername(userRegisterDtoToPassIn.getUsername());
        user.setPassword(userRegisterDtoToPassIn.getPassword());
        user.setFirstName(userRegisterDtoToPassIn.getFirstName());
        user.setLastName(userRegisterDtoToPassIn.getLastName());
        user.setEmail(userRegisterDtoToPassIn.getEmail());
        when(mockUserService.existsByUsername(any())).thenReturn(true);
        when(mockUserService.save(any())).thenReturn(user);
        ResponseEntity<String> responseToCheck = ResponseEntity.status(HttpStatus.CONFLICT).body("The username or email is not unique");

        ResponseEntity<Object> response = authService.register(userRegisterDtoToPassIn);

        assertEquals(response, responseToCheck);
    }

    @Test
    public void loginWithTwoFactorReturnsSuccessfulGivingUserTheirSessionCookie(){
        TwoFactorDto twoFactorDtoToPassIn = new TwoFactorDto("123456", "username123");

        User userToReturnFromUserService = new User();
        userToReturnFromUserService.setUsername(twoFactorDtoToPassIn.getUsername());
        when(mockUserService.findUserByUsername(twoFactorDtoToPassIn.getUsername())).thenReturn(userToReturnFromUserService);

        ResponseEntity<Object> responseFromAct = authService.loginWithTwoFactor(twoFactorDtoToPassIn);

        assertTrue(responseFromAct.getHeaders().containsKey("Set-Cookie"));
        assertEquals(responseFromAct.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void enableTwoFactorAuthReturnsImageAndUpdatesUser() throws IOException, WriterException {
        TwoFactorAuthDto twoFactorAuthDtoToPassIn = new TwoFactorAuthDto(true, null);
        User userToReturnFromUserService = new User();
        userToReturnFromUserService.setUserId(4);
        userToReturnFromUserService.setTwoFactorAuth(false);
        userToReturnFromUserService.setSecretTwoFactorKey(null);
        CookieDto cookieDtoToPassIn = new CookieDto(userToReturnFromUserService);
        when(mockUserService.getUserById(4)).thenReturn(userToReturnFromUserService);
        when(mockUserService.update(any(User.class))).thenReturn(null);
        when(mockTwoFactorAuthentication.generateSecretKey()).thenReturn("Secret Key");
        when(mockTwoFactorAuthentication.getGoogleAuthenticatorBarCode(anyString(), any(), anyString())).thenReturn("Barcode");
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(10);
        when(mockTwoFactorAuthentication.createQRCode(anyString(), anyInt(), anyInt())).thenReturn(byteArrayOutputStream);

        // Act
        ResponseEntity<Object> responseFromAct = authService.enableTwoFactorAuth(cookieDtoToPassIn, twoFactorAuthDtoToPassIn);
        net.minidev.json.JSONObject jsonObject = (net.minidev.json.JSONObject) responseFromAct.getBody();

        //Assert
        assertEquals(responseFromAct.getStatusCode(), HttpStatus.OK);
        assertInstanceOf(byte[].class, jsonObject.get("data"));
        verify(mockUserService, times(1)).update(any(User.class));
    }
    @Test
    public void enableTwoFactorAuthEnablesTwoFactorAuthReturnsExistingImage() throws IOException, WriterException {
        TwoFactorAuthDto twoFactorAuthDtoToPassIn = new TwoFactorAuthDto(true, "null");
        User userToReturnFromUserService = new User();
        userToReturnFromUserService.setUserId(4);
        userToReturnFromUserService.setTwoFactorAuth(true);
        userToReturnFromUserService.setSecretTwoFactorKey(null);
        userToReturnFromUserService.setQRCodeImage(new byte[]{1,2,3});
        CookieDto cookieDtoToPassIn = new CookieDto(userToReturnFromUserService);

        when(mockUserService.getUserById(4)).thenReturn(userToReturnFromUserService);
        when(mockUserService.update(any(User.class))).thenReturn(null);

        // Act
        ResponseEntity<Object> responseFromAct = authService.enableTwoFactorAuth(cookieDtoToPassIn, twoFactorAuthDtoToPassIn);
        net.minidev.json.JSONObject jsonObject = (net.minidev.json.JSONObject) responseFromAct.getBody();

        //Assert
        assertEquals(responseFromAct.getStatusCode(), HttpStatus.OK);
        assertInstanceOf(byte[].class, jsonObject.get("data"));
        verify(mockUserService, times(1)).update(any(User.class));
    }

    @Test
    public void disableTwoFactorAuthDisablesTwoFactorAuthForUser(){
        User user = new User();
        user.setUserId(4);
        user.setTwoFactorAuth(true);
        CookieDto cookieDtoToPassIn = new CookieDto(user);
        TwoFactorAuthDto twoFactorAuthDtoToPassIn = new TwoFactorAuthDto(false, "null");
        when(mockUserService.getUserById(4)).thenReturn(user);
        when(mockUserService.update(user)).thenReturn(null);

        ResponseEntity<Object> responseFromAct = authService.disableTwoFactorAuth(cookieDtoToPassIn, twoFactorAuthDtoToPassIn);

        assertEquals(responseFromAct.getStatusCode(), HttpStatus.OK);
        assertFalse(user.getTwoFactorAuth());
        verify(mockUserService, times(1)).update(user);
    }

    @Test
    public void disableTwoFactorAuthDoesNothingIfUserTwoFactorIsAlreadyDisabled() {
        User user = new User();
        user.setUserId(4);
        user.setTwoFactorAuth(false);

        CookieDto cookieDtoToPassIn = new CookieDto(user);
        TwoFactorAuthDto twoFactorAuthDtoToPassIn = new TwoFactorAuthDto(false, "null");

        when(mockUserService.getUserById(4)).thenReturn(user);

        ResponseEntity<Object> responseFromAct = authService.disableTwoFactorAuth(cookieDtoToPassIn, twoFactorAuthDtoToPassIn);

        assertEquals(responseFromAct.getStatusCode(), HttpStatus.OK);
        assertFalse(user.getTwoFactorAuth());
        verify(mockUserService, times(0)).update(any(User.class));
    }

    @Test
    public void twoFactorAuthEnabledCallsUserServiceAndReturnsBoolean() {
        boolean bool = true;
        String username = "username101";
        AuthDto authDtoToPassIn = new AuthDto(username, "password");
        when(mockUserService.existsByTwoFactorAuth(username)).thenReturn(bool);

        boolean returnedFromAct = authService.twoFactorAuthEnabled(authDtoToPassIn);

        assertInstanceOf(Boolean.class, bool);
        verify(mockUserService, times(1)).existsByTwoFactorAuth(username);
    }

    @Test
    public void twoFactorAuthEnabledWhenProvidedAUsernameCallsUserServiceAndReturnsBoolean() {
        String usernameToPassIn = "username101";
        boolean bool = false;
        when(mockUserService.existsByTwoFactorAuth(usernameToPassIn)).thenReturn(bool);

        boolean returnedFromAct = authService.twoFactorAuthEnabled(usernameToPassIn);

        assertInstanceOf(Boolean.class, bool);
        verify(mockUserService, times(1)).existsByTwoFactorAuth(usernameToPassIn);
    }

    @Test
    public void checkTwoFactorAuthValidityVerifiesSixDigitCode() {
        String username = "username";
        String sixDigitCode = "123987";
        String secretKey = "SecretKey";
        TwoFactorDto twoFactorDtoToPassIn = new TwoFactorDto(sixDigitCode, username);
        User userToReturnFromService = new User();
        userToReturnFromService.setSecretTwoFactorKey(secretKey);
        when(mockUserService.getUserByUsername(username)).thenReturn(userToReturnFromService);
        when(mockTwoFactorAuthentication.getTOTPCode(secretKey)).thenReturn(sixDigitCode);

        boolean returnedFromAct = authService.checkTwoFactorAuthValidity(twoFactorDtoToPassIn);

        assertInstanceOf(Boolean.class, returnedFromAct);
    }
 }






