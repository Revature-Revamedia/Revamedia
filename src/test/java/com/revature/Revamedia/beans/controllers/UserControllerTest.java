package com.revature.Revamedia.beans.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.Revamedia.beans.services.UserFollowsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.UpdateUserDto;
import com.revature.Revamedia.dtos.UserFollowDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserFollows;
import org.junit.jupiter.api.BeforeEach;
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
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


/**
 * @Author: Chenxi Zhu
 */

@WebMvcTest(UserController.class)
public class UserControllerTest {
    private MockMvc mockMvc;

    @Autowired
    UserController userController;

    @Mock private BCryptPasswordEncoder mockEncoder;

    @MockBean private UserFollowsService mockUserFollowsService;
    @MockBean private UserService mockUserService;

    @Autowired ObjectMapper mapper;

    @BeforeEach
    public void setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void getAllUsersTest() throws Exception {
        List<User> userListToReturn = new ArrayList<>();
        userListToReturn.add(new User());
        userListToReturn.add(new User());
        when(mockUserService.getAllUsers()).thenReturn(userListToReturn);

        mockMvc.perform(get("/user/allUsers")).andExpect(status().isOk());
        verify(mockUserService, times(1)).getAllUsers();
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
        when(mockUserService.getUserById(id)).thenReturn(user);
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
        when(mockUserService.getUserById(id)).thenReturn(user);
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
        when(mockUserService.update(user)).thenReturn(user);

        ObjectMapper mapper = new ObjectMapper();
        //act
        String content = mapper.writeValueAsString(user);
        //assert
        MvcResult result = this.mockMvc.perform(put("/user/update/1").contentType(MediaType.APPLICATION_JSON).content(content)).andExpect(status().isOk()).andReturn();
        System.out.println(result);
        String jsonResponse = result.getResponse().getContentAsString();
        assertEquals(jsonResponse, content);
    }

    @Test
    public void userFollowsSavesFollower() throws Exception {
        UserFollowDto userFollowDto = new UserFollowDto();
        when(mockUserService.getUserById(any())).thenReturn(new User());

        mockMvc.perform(post("/user/userFollows").contentType("application/json").content(mapper.writeValueAsString(userFollowDto))).andExpect(status().isOk());
        verify(mockUserService, times(1)).save(any());
    }

    @Test
    public void userFollowsReturnsConflict() throws Exception {
        UserFollowDto userFollowDto = new UserFollowDto();
        User user = new User();
        user.setUserId(2);
        Set<UserFollows> userFollowsSet = new HashSet<>();
        UserFollows userFollows = new UserFollows();
        User user2 = new User();
        user2.setUserId(2);
        userFollows.setFollowedId(user2);
        userFollowsSet.add(userFollows);
        user.setFollowing(userFollowsSet);
        when(mockUserService.getUserById(any())).thenReturn(user);

        mockMvc.perform(post("/user/userFollows").contentType("application/json").content(mapper.writeValueAsString(userFollowDto))).andExpect(status().isConflict());
    }

    @Test
    public void deleteFollowingDeletesFollow() throws Exception {
        UserFollowDto userFollowDto = new UserFollowDto();
        User user = new User();
        user.setUserId(2);
        Set<UserFollows> userFollowsSet = new HashSet<>();
        UserFollows userFollows = new UserFollows();
        User user2 = new User();
        user2.setUserId(2);
        userFollows.setFollowedId(user2);
        userFollowsSet.add(userFollows);
        user.setFollowing(userFollowsSet);
        when(mockUserService.getUserById(any())).thenReturn(user);

        mockMvc.perform(post("/user/deleteFollowing").contentType("application/json").content(mapper.writeValueAsString(userFollowDto))).andExpect(status().isOk());
    }

    @Test
    public void deleteFollowingReturnsConflict() throws Exception {
        UserFollowDto userFollowDto = new UserFollowDto();
        User user = new User();
        user.setUserId(5);
        Set<UserFollows> userFollowsSet = new HashSet<>();
        UserFollows userFollows = new UserFollows();
        User user2 = new User();
        user2.setUserId(2);
        userFollows.setFollowedId(user2);
        userFollowsSet.add(userFollows);
        user.setFollowing(userFollowsSet);
        when(mockUserService.getUserById(any())).thenReturn(user);

        mockMvc.perform(post("/user/deleteFollowing").contentType("application/json").content(mapper.writeValueAsString(userFollowDto))).andExpect(status().isConflict());
    }
}
