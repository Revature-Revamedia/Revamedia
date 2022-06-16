package com.revature.Revamedia.beans.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.Revamedia.beans.services.AuthService;
import com.revature.Revamedia.beans.services.JsonWebToken;
import com.revature.Revamedia.beans.services.UserGroupsService;
import com.revature.Revamedia.beans.services.UserPostsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AddGroupPostDto;
import com.revature.Revamedia.dtos.NewGroupDto;
import com.revature.Revamedia.dtos.UpdateGroupDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserGroups;
import com.revature.Revamedia.entities.UserPosts;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/**
* @Author Qiang Gao
*/
@WebMvcTest(GroupController.class)
public class GroupControllerTest {

    private MockMvc mockMvc;

    @Autowired
    GroupController groupController;

    @MockBean
    private UserGroupsService userGroupsService;
    @MockBean
    private UserService userService;
    @MockBean
    private AuthService authService;
    @MockBean
    private JsonWebToken jsonWebToken;
    @MockBean
    private UserPostsService userPostsService;

    @BeforeEach
    public void setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(groupController).build();
    }

    @Test
    void testAllGroups() throws Exception {
        List<UserGroups> groups = new ArrayList<>();

        when(userGroupsService.getAllGroups()).thenReturn(groups);

        mockMvc.perform(get("/groups/allGroups")).andExpect(status().isOk());
    }

    @Test
    void testGetGroupById() throws Exception {
        UserGroups group = new UserGroups();

        when(userGroupsService.getGroupById(1)).thenReturn(group);

        mockMvc.perform(get("/groups/1")).andExpect(status().isAccepted());
    }

    @Test
    void testNewGroup() throws Exception {
        NewGroupDto dto = new NewGroupDto(
                1,
                "title",
                "description",
                "imageUrl");

        when(userService.getUserById(1)).thenReturn(new User());

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(dto);

        mockMvc
                .perform(post("/groups/newGroup").contentType("application/json").content(json))
                .andExpect(status().isCreated());
    }

    @Test
    void testDeleteGroup() throws Exception {
        UserGroups group = new UserGroups();
        group.setGroupId(1);

        when(userGroupsService.getGroupById(1)).thenReturn(group);

        mockMvc.perform(delete("/groups/delete/1")).andExpect(status().isAccepted());

    }

    @Test
    void testUpdateGroup() throws Exception {
        UpdateGroupDto dto = new UpdateGroupDto(
                1,
                "title",
                "description",
                "imageUrl");

        UserGroups group = new UserGroups();

        when(userGroupsService.getGroupById(1)).thenReturn(group);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(dto);


        mockMvc
                .perform(put("/groups/update")
                .contentType("application/json")
                .content(json))
                .andExpect(status().isOk());
    }


    @Test
    void testAddPost() throws Exception {

        AddGroupPostDto dto = new AddGroupPostDto(
                1,
                1,
                "message",
                "image",
                new Timestamp(System.currentTimeMillis()));

        User user = new User();
        UserGroups group = new UserGroups();
        UserPosts post = new UserPosts();

        when(userService.getUserById(1)).thenReturn(user);
        when(userGroupsService.getGroupById(1)).thenReturn(group);


        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(dto);

        mockMvc
                .perform(post("/groups/addPost")
                .contentType("application/json")
                .content(json))
                .andExpect(status().isCreated());
    }
}
