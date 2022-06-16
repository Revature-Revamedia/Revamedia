package com.revature.Revamedia.beans.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.Revamedia.beans.services.UserCommentsService;
import com.revature.Revamedia.beans.services.UserRepliesService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AddReplyDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserComments;
import com.revature.Revamedia.entities.UserReplies;

@WebMvcTest(ReplyController.class)
public class ReplyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepliesService userRepliesService;

    @MockBean
    private UserCommentsService userCommentsService;

    @MockBean
    private UserService userService;

    @Test
    void testSaveAdd() throws Exception {
        AddReplyDto dto = new AddReplyDto();
        dto.setOwner_id(1);
        dto.setComment_id(1);
        dto.setMessage("test");

        UserComments comment = new UserComments();
        comment.setCommentId(1);
        comment.setMessage("test");

        User user = new User();

        when(userCommentsService.getCommentById(1)).thenReturn(comment);

        when(userService.getUserById(1)).thenReturn(user);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(dto);

        mockMvc
                .perform(delete("/reply/add").contentType("application/json").content(json))
                .andExpect(status().isOk());

    }

    @Test
    void testUpdateById()  throws Exception {

        UserReplies reply = new UserReplies();
        reply.setReplyId(1);
        reply.setMessage("test");

        when(userRepliesService.getReplyById(1)).thenReturn(reply);

        mockMvc
            .perform(put("/reply/update/1").contentType("application/json").content("{\"message\":\"test\"}"))
            .andExpect(status().isOk());

        

    }

    @Test
    void testDelete() throws Exception {

        UserReplies reply = new UserReplies();

        when(userRepliesService.getReplyById(1)).thenReturn(reply);

        mockMvc.perform(delete("/reply/delete/1")).andExpect(status().isOk());

    }
}
