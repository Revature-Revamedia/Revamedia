package com.revature.Revamedia.beans.controllers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.Revamedia.beans.services.UserFollowsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.UpdateUserDto;
import com.revature.Revamedia.dtos.ViewAllUserDto;
import com.revature.Revamedia.entities.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.junit.jupiter.api.Assertions.assertEquals;


import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @Author: Chenxi Zhu
 */

@WebMvcTest(UserController.class)
public class UserControllerTest {
    private final MockMvc mockMvc;

    @Mock
    private BCryptPasswordEncoder mockEncoder;
    @MockBean
    private UserFollowsService userFollowsService;

    @MockBean
    private UserService userServiceMock;



    public UserControllerTest(@Autowired MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    public void getAllUsersTest() throws Exception {
        //arrange
        //ViewAllUserDto viewAllUserDto = new ViewAllUserDto();
        //List<User> users = new ArrayList<>();
        //HttpHeaders httpHeaders = new HttpHeaders();
        //httpHeaders.add("Set-Cookie", "user_session=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJKc29uIjoie1widXNlcklkXCI6NCxcInVzZXJuYW1lXCI6XCJzaGFkeVwifSJ9.LSzPbhNAALEFrBWZPpf8KGvREormRNt3tXFkGMTvnU3-MPHw76JD5cmreZJMYaSwNt7H6YJlALCFAWobPAKWbw; Max-Age=86400; Path=/;");

        // this part solves following casting problem
        //org.springframework.http.ResponseEntity cannot be cast to class java.util.List
        //ResponseEntity<List<User>> responseEntity = ResponseEntity.ok().build();
        List<User> users = new ArrayList<>();
        users.add(new User());
        users.add(new User());
        //-----------------------------------------------------------
        when(userServiceMock.getAllUsers()).thenReturn((users));
        ObjectMapper mapper = new ObjectMapper();
            //act
            //String content = mapper.writeValueAsString(users);
            MvcResult result = this.mockMvc.perform(get("/user/allUsers").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn();
            System.out.println(result.getResponse().getContentAsString());

            //assert
            String jsonResponse = result.getResponse().getContentAsString();
            //json ended up in testing memory location, change to string to test actual value.
//            List<User> returnedUsers = mapper.readValue(result.getResponse().getContentAsString(), new TypeReference<List<User>>(){});
            String userJson = mapper.writeValueAsString(users);
            assertEquals(jsonResponse, userJson);
    }

    @Test
    public void getUserByIdTest() throws Exception {
        //arrange
        User user = new User();
        Integer id = 1;
        HttpHeaders httpHeaders = new HttpHeaders();
        //dont need responseEntity in WebMvcTest, only use response entity in SpringBootTest for serialization
        //in WebMvcTest, we can use ObjectMapper to serialize object
        //ResponseEntity<User> responseEntity = ResponseEntity.ok().headers(httpHeaders).build();
        //User user = responseEntity.getBody();
        when(userServiceMock.getUserById(id)).thenReturn(user);
        ObjectMapper mapper = new ObjectMapper();
        //act
        String content = mapper.writeValueAsString(user);
        MvcResult result = this.mockMvc.perform(get("/user/" + id).contentType(MediaType.APPLICATION_JSON).content(content)).andExpect(status().isAccepted()).andReturn();
        //assert
        String jsonResponse = result.getResponse().getContentAsString();
        assertEquals(jsonResponse, content);
    }

    @Test
    public void updateUserByIdTest(@Autowired UserController userController) throws Exception {
        //arrange
        userController.setEncoder(mockEncoder);
        Integer id = 1;
        UpdateUserDto userToUpdate = new UpdateUserDto("username","profilepic", "firstname","lastname","email","password");
        //HttpHeaders httpHeaders = new HttpHeaders();
        User user = new User();
        when(userServiceMock.getUserById(id)).thenReturn(user);
        user.setUsername(userToUpdate.getUsername());
        user.setProfilePicture(userToUpdate.getProfilePicture());
        user.setEmail(userToUpdate.getEmail());
        user.setFirstName(userToUpdate.getFirstName());
        user.setLastName(userToUpdate.getLastName());
        user.setPassword(userToUpdate.getPassword());
        when(mockEncoder.encode(userToUpdate.getPassword())).thenReturn(userToUpdate.getPassword());
        //ResponseEntity<User> responseEntity = ResponseEntity.ok().build();
        //User updatedUser = responseEntity.getBody();
        //System.out.println(updatedUser);
        when(userServiceMock.update(user)).thenReturn(user);

        ObjectMapper mapper = new ObjectMapper();
        //act
        String content = mapper.writeValueAsString(user);
        //assert
        MvcResult result = this.mockMvc.perform(put("/user/update/1").contentType(MediaType.APPLICATION_JSON).content(content)).andExpect(status().isOk()).andReturn();
        System.out.println(result);
        String jsonResponse = result.getResponse().getContentAsString();
        assertEquals(jsonResponse, content);
    }


}
