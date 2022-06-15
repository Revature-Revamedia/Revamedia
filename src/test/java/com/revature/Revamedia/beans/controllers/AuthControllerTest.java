package com.revature.Revamedia.beans.controllers;

import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.servlet.http.Cookie;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.Revamedia.beans.services.AuthService;
import com.revature.Revamedia.beans.services.JsonWebToken;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AuthDto;
import com.revature.Revamedia.dtos.CookieDto;
import com.revature.Revamedia.dtos.TwoFactorAuthDto;
import com.revature.Revamedia.dtos.TwoFactorDto;
import com.revature.Revamedia.dtos.UserRegisterDto;
import com.revature.Revamedia.exceptions.UnauthorizedUserException;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private AuthService authServiceMock;

    @MockBean
    private UserService userServiceMock;

    @MockBean
    private JsonWebToken jsonWebTokenMock;

    public AuthControllerTest(@Autowired MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    public void testRegister() throws Exception {
        UserRegisterDto userRegisterDto = new UserRegisterDto("username", "password", "email", "firstName", "lastName");

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(userRegisterDto);

        when(authServiceMock.register(userRegisterDto)).thenReturn(ResponseEntity.status(HttpStatus.OK).body(null));

        mockMvc.perform(
                post("/auth/register")
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isOk());

    }

    @Test
    public void testLoginSuccess() throws Exception {
        AuthDto authDto = new AuthDto("username", "password");

        when(authServiceMock.twoFactorAuthEnabled(authDto)).thenReturn(false);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(authDto);

        when(authServiceMock.login(authDto)).thenReturn(ResponseEntity.status(HttpStatus.OK).body(null));

        mockMvc.perform(
                post("/auth/login")
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginFailure() throws Exception {
        AuthDto authDto = new AuthDto("username", "password");

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(authDto);

        when(authServiceMock.twoFactorAuthEnabled(authDto)).thenReturn(true);

        when(authServiceMock.login(authDto)).thenReturn(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null));

        mockMvc.perform(
                post("/auth/login")
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginTwoFactor() throws Exception {
        TwoFactorDto twoFactorDto = new TwoFactorDto();

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(twoFactorDto);

        when(authServiceMock.checkTwoFactorAuthValidity(twoFactorDto)).thenReturn(anyBoolean());

        when(authServiceMock.loginWithTwoFactor(twoFactorDto))
                .thenReturn(ResponseEntity.status(HttpStatus.OK).body(null));

        mockMvc.perform(
                post("/auth/login/twoFA")
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginTwoFactorFailure() throws Exception {
        TwoFactorDto twoFactorDto = new TwoFactorDto();

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(twoFactorDto);

        when(authServiceMock.checkTwoFactorAuthValidity(twoFactorDto)).thenReturn(false);

        when(authServiceMock.loginWithTwoFactor(twoFactorDto))
                .thenReturn(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null));

        mockMvc.perform(
                post("/auth/login/twoFA")
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isOk());

    }

    @Test
    public void testEnableTwoFactor() throws Exception {
        JSONObject jsonObject = new JSONObject();

        CookieDto cookieDto = new CookieDto();
        cookieDto.setUserId(1);
        cookieDto.setUsername("username");
        when(jsonWebTokenMock.verify(anyString())).thenReturn(cookieDto);

        when(authServiceMock.twoFactorAuthEnabled(anyString())).thenReturn(true);

        jsonObject.put("error", "you have two factor auth already enabled");
        String json = jsonObject.toString();

        Cookie cookie = new Cookie("user_session", "token");

        MockHttpServletRequestBuilder request = post("/auth/enable")
                .contentType("application/json")
                .content(json)
                .cookie(cookie);

        mockMvc.perform(request)
                .andExpect(status().isOk());

    }

    @Test
    public void testEnableTwoFactorSuccess() throws Exception {
        JSONObject jsonObject = new JSONObject();

        TwoFactorAuthDto twoFactorAuthDto = new TwoFactorAuthDto();

        CookieDto cookieDto = new CookieDto();
        cookieDto.setUserId(1);
        cookieDto.setUsername("username");
        when(jsonWebTokenMock.verify(anyString())).thenReturn(cookieDto);

        when(authServiceMock.twoFactorAuthEnabled(anyString())).thenReturn(false);

        when(authServiceMock.enableTwoFactorAuth(cookieDto, twoFactorAuthDto))
                .thenReturn(ResponseEntity.status(HttpStatus.OK).body(null));

        jsonObject.put("error", "you have two factor auth already enabled");
        String json = jsonObject.toString();

        Cookie cookie = new Cookie("user_session", "token");

        MockHttpServletRequestBuilder request = post("/auth/enable")
                .contentType("application/json")
                .content(json)
                .cookie(cookie);

        mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    public void testEnableTwoFactorFailure() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("error", "you are unauthorized");

        when(jsonWebTokenMock.verify(anyString())).thenThrow(UnauthorizedUserException.class);

        String json = jsonObject.toString();

        Cookie cookie = new Cookie("user_session", "token");

        MockHttpServletRequestBuilder request = post("/auth/enable")
                .contentType("application/json")
                .content(json)
                .cookie(cookie);

        mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    public void testDisableTwoFactor() throws Exception {

        CookieDto cookieDto = new CookieDto();

        TwoFactorAuthDto twoFactorAuthDto = new TwoFactorAuthDto();

        when(jsonWebTokenMock.verify(anyString())).thenReturn(cookieDto);

        when(authServiceMock.disableTwoFactorAuth(cookieDto, twoFactorAuthDto))
                .thenReturn(ResponseEntity.status(HttpStatus.OK).body(null));

        mockMvc.perform(
                post("/auth/disable")
                        .contentType("application/json")
                        .cookie(new Cookie("user_session", "token")))
                .andExpect(status().isOk());
    }

    @Test
    public void testDisableTwoFactorFailure() throws Exception {

        when(jsonWebTokenMock.verify(anyString())).thenThrow(UnauthorizedUserException.class);

        mockMvc.perform(
                post("/auth/disable")
                        .contentType("application/json")
                        .cookie(new Cookie("user_session", "token")))
                .andExpect(status().isOk());

    }

    @Test
    public void testRecreate() throws Exception {
        CookieDto cookieDto = new CookieDto();
        TwoFactorAuthDto twoFactorAuthDto = new TwoFactorAuthDto();
        when(jsonWebTokenMock.verify(anyString())).thenReturn(cookieDto);

        when(authServiceMock.enableTwoFactorAuth(cookieDto, twoFactorAuthDto))
                .thenReturn(ResponseEntity.status(HttpStatus.OK).body(null));
        

        mockMvc.perform(
                post("/auth/recreate")
                        .contentType("application/json")
                        .cookie(new Cookie("user_session", "token")))
                .andExpect(status().isOk());
    }
}
