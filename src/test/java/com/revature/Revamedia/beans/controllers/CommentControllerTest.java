package com.revature.Revamedia.beans.controllers;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.hamcrest.Matchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.Cookie;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.Revamedia.beans.services.AuthService;
import com.revature.Revamedia.beans.services.JsonWebToken;
import com.revature.Revamedia.beans.services.UserCommentsService;
import com.revature.Revamedia.beans.services.UserPostsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.CookieDto;
import com.revature.Revamedia.dtos.UserCommentsDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserComments;
import com.revature.Revamedia.entities.UserPosts;

/**
* @Author: Qiang Gao
*/
@WebMvcTest(CommentController.class)
public class CommentControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private UserCommentsService userCommentsService;
    @MockBean
    private UserService userServiceMock;
    @MockBean
    private UserPostsService userPostsServiceMock;
    @MockBean
    private AuthService authServiceMock;
    @MockBean
    private JsonWebToken jsonWebTokenMock;

    public CommentControllerTest(@Autowired MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    public void testGetById() throws Exception {
        UserComments comment = new UserComments();

        User user = new User();
        user.setUserId(1);

        UserPosts post = new UserPosts();
        post.setPostId(1);

        comment.setCommentId(1);
        comment.setOwnerId(user);
        comment.setPostId(post);

        when(userCommentsService.getCommentById(1)).thenReturn(comment);

        when(userCommentsService.getCommentById(2)).thenThrow(EntityNotFoundException.class);

        this.mockMvc.perform(get("/comment/1")).andExpect(status().isOk());

    }

    @Test
    public void testGetAll() throws Exception {
        List<UserComments> comments = new ArrayList<>();

        when(userCommentsService.getAllComment()).thenReturn(comments);

        this.mockMvc.perform(get("/comment/all")).andExpect(status().isOk());
    }

    @Test
    public void testAdd() throws Exception {
        UserComments comment = new UserComments();
        comment.setMessage("Test");

        UserComments newComment = new UserComments();
        newComment.setMessage("Test");
        newComment.setCommentId(1);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(comment);

        when(userCommentsService.save(comment)).thenReturn(newComment);

        MediaType MEDIA_TYPE_JSON_UTF8 = new MediaType(
                "application",
                "json",
                java.nio.charset.Charset.forName("UTF-8"));

        MockHttpServletRequestBuilder request = post("/comment/add");
        request.content(json);
        request.locale(Locale.JAPANESE);
        request.accept(MEDIA_TYPE_JSON_UTF8);
        request.contentType(MEDIA_TYPE_JSON_UTF8);

        this.mockMvc
                .perform(request)
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdate() throws Exception {
        UserComments comment = new UserComments();
        comment.setMessage("Test");
        comment.setCommentId(1);

        when(userCommentsService.getCommentById(1)).thenReturn(comment);

        when(userCommentsService.update(comment)).thenReturn(comment);

        CookieDto cookieDto = new CookieDto();
        cookieDto.setUserId(1);
        when(jsonWebTokenMock.verify(anyString())).thenReturn(cookieDto);

        User user = new User();
        user.setUserId(1);
        when(userServiceMock.getUserById(1)).thenReturn(user);

        UserCommentsDto updatedComment = new UserCommentsDto();
        updatedComment.setComment_id(1);
        updatedComment.setMessage("Test");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(updatedComment);

        MediaType MEDIA_TYPE_JSON_UTF8 = new MediaType(
                "application",
                "json",
                java.nio.charset.Charset.forName("UTF-8"));

        Cookie cookie = new Cookie("user_session", "test");

        MockHttpServletRequestBuilder request = put("/comment/update");
        request.content(json);
        request.accept(MEDIA_TYPE_JSON_UTF8);
        request.contentType(MEDIA_TYPE_JSON_UTF8);
        request.cookie(cookie);

        this.mockMvc
                .perform(request)
                .andExpect(status().isOk());
    }

    @Test
    public void testDelete() throws Exception {

        UserComments comment = new UserComments();
        comment.setMessage("Test");
        comment.setCommentId(1);

        when(userCommentsService.getCommentById(1)).thenReturn(comment);

        doNothing().when(userCommentsService).delete(comment);

        CookieDto cookieDto = new CookieDto();
        cookieDto.setUserId(1);
        when(jsonWebTokenMock.verify(anyString())).thenReturn(cookieDto);

        User user = new User();
        user.setUserId(1);
        when(userServiceMock.getUserById(1)).thenReturn(user);

        Cookie cookie = new Cookie("user_session", "test");

        MockHttpServletRequestBuilder request = delete("/comment/delete/1");
        request.cookie(cookie);

        this.mockMvc
                .perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", is("Comment successfully deleted.")))
                .andExpect(jsonPath("$.statusCode", is(200)));
    }

}
