/**
 * Author(s): @Brandon Le, @Arun Mohan, @Anthony Pilletti
 * Contributor(s): @Stan Savelev, @William Bjerke
 * Purpose: Test class to test the functions in the UserPostsController.
 */
package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.UserPostsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.*;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserPosts;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.persistence.EntityNotFoundException;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserPostsControllerTest {

    User user;
    UserPosts userPosts;


    @MockBean
    UserPostsService userPostsService;

    @MockBean
    UserService userService;

    @BeforeEach
    public void beforeEach(){
        user = new User();
        user.setUserId(1);

        userPosts = new UserPosts();
        userPosts.setPostId(1);

    }

    @Test
    public void updatePostLikesSuccess(@Autowired UserPostsController userPostsController){
        UpdatePostLikesDto dto = new UpdatePostLikesDto(user.getUserId(), userPosts.getPostId());
        ResponseEntity<UserPosts> responseEntity = new ResponseEntity<>(userPosts, HttpStatus.OK);

        when(userPostsService.updatePostLikes(dto)).thenReturn(userPosts);

        ResponseEntity returnedResponse = userPostsController.updatePostLikes(dto);

        Assertions.assertEquals(responseEntity, returnedResponse);
        verify(userPostsService, times(1)).updatePostLikes(dto);
    }

    @Test
    public void updatePostLikesFailed(@Autowired UserPostsController userPostsController){
        UpdatePostLikesDto dto = new UpdatePostLikesDto(user.getUserId(), 2);
        ResponseEntity<UserPosts> responseEntity = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        when(userPostsService.updatePostLikes(dto)).thenThrow(new EntityNotFoundException("No post exists"));

        ResponseEntity returnedResponse = userPostsController.updatePostLikes(dto);

        Assertions.assertEquals(responseEntity, returnedResponse);
        verify(userPostsService, times(1)).updatePostLikes(dto);
    }

    @Test
    public void shareYoutubeSavesPostAndUser(@Autowired UserPostsController userPostsController) {
        shareYoutubeDto dto = new shareYoutubeDto(1, "message", "Link");
        when(userService.getUserById(any())).thenReturn(new User());

        userPostsController.shareYoutube(dto);

        verify(userPostsService, times(1)).save(any());
        verify(userService, times(1)).save(any());
    }

    @Test
    public void editYoutubeUpdatesPost(@Autowired UserPostsController userPostsController) {
        EditYoutubeDto editYoutubeDto = new EditYoutubeDto("message", "Link");
        when(userPostsService.getPostById(any())).thenReturn(new UserPosts());

        userPostsController.editYoutube(editYoutubeDto);

        verify(userPostsService, times(1)).update(any());
    }

    @Test
    public void deleteYoutubeDeletesInfoOnPost(@Autowired UserPostsController userPostsController){
        when(userPostsService.getPostById(any())).thenReturn(new UserPosts());

        userPostsController.deleteYoutube(4);

        verify(userPostsService, times(1)).delete(any());
    }

    @Test
    public void createPostSavesPostAndUser(@Autowired UserPostsController userPostsController) {
        when(userService.getUserById(any())).thenReturn(new User());

        userPostsController.createPost(new CreateUserPostsDto());

        verify(userPostsService, times(1)).save(any(UserPosts.class));
        verify(userService, times(1)).save(any(User.class));
    }

    @Test
    public void updatePostUpdatesPost(@Autowired UserPostsController userPostsController) {
        when(userPostsService.getPostById(any())).thenReturn(new UserPosts());

        userPostsController.updatePost(new UpdateUserPostsDto());

        verify(userPostsService, times(1)).update(any());
    }

    @Test
    public void deletePostDeletesLikesAndPost(@Autowired UserPostsController userPostsController) {
        userPostsController.deletePost(4);

        verify(userService, times(1)).deleteAllPostLikes(any());
        verify(userPostsService, times(1)).deleteById(any());
    }

    @Test
    public void getPostByPostIdGetsPost(@Autowired UserPostsController userPostsController) {
        when(userPostsService.getPostById(any())).thenReturn(new UserPosts());

        ResponseEntity response = userPostsController.getPostByPostId(4);

        assertEquals(response.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void getPostByPostIdThrowsNotFound(@Autowired UserPostsController userPostsController) {
        when(userPostsService.getPostById(any())).thenThrow(EntityNotFoundException.class);

        ResponseEntity response = userPostsController.getPostByPostId(4);

        assertEquals(response.getStatusCode(), HttpStatus.NOT_FOUND);
    }
}
