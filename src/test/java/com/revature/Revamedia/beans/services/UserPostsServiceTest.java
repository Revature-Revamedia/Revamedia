/**
 * Author(s): @Brandon Le, @Arun Mohan, @Anthony Pilletti
 * Contributor(s): @Stan Savelev, @William Bjerke, @Tony Henderson
 * Purpose: Test class to test the functions in the UserPostsService.
 */
package com.revature.Revamedia.beans.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.revature.Revamedia.dtos.UpdatePostLikesDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserPostsRepository;
import com.revature.Revamedia.beans.repositories.UserRepository;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserPosts;

/**
* @Author Qiang Gao
*/
@ExtendWith(MockitoExtension.class)
public class UserPostsServiceTest {
    UserPostsService userPostsService;

    @Mock
    UserPostsRepository userPostsRepositoryMock;
    @Mock
    UserRepository userRepositoryMock;

    @BeforeEach
    public void beforeEach() {
        userPostsService = new UserPostsService(userPostsRepositoryMock, userRepositoryMock);
    }

    @Test
    public void getPostByIdTest() {
        UserPosts post = new UserPosts();
        post.setPostId(1);

        when(userPostsRepositoryMock.getById(1)).thenReturn(post);

        assert (userPostsService.getPostById(1).getPostId() == 1);

    }

    @Test
    public void testSave() {
        UserPosts post = new UserPosts();
        post.setPostId(1);

        when(userPostsRepositoryMock.save(post)).thenReturn(post);

        assertEquals(userPostsService.save(post), post);
    }

    @Test
    public void testUpdate() {
        UserPosts post = new UserPosts();
        post.setPostId(1);

        when(userPostsRepositoryMock.save(post)).thenReturn(post);

        assertEquals(userPostsService.update(post), post);
    }

    @Test
    public void testGetPostsByUserId() {
        List<UserPosts> posts = new ArrayList<>();

        User user = new User();
        user.setUserId(1);
        UserPosts post = new UserPosts();
        post.setPostId(1);
        post.setOwnerId(user);
        UserPosts post2 = new UserPosts();
        post2.setPostId(2);
        post2.setOwnerId(user);

        posts.add(post);
        posts.add(post2);

        when(userPostsRepositoryMock.getUserPostsByUser(1)).thenReturn(posts);

        assertEquals(userPostsService.getPostsByUser(1), posts);
    }

    @Test
    public void getAllPosts() {
        List<UserPosts> posts = new ArrayList<>();

        User user = new User();
        user.setUserId(1);
        UserPosts post = new UserPosts();
        post.setPostId(1);
        post.setOwnerId(user);
        UserPosts post2 = new UserPosts();
        post2.setPostId(2);
        post2.setOwnerId(user);

        posts.add(post);
        posts.add(post2);

        when(userPostsRepositoryMock.findAll()).thenReturn(posts);

        assertEquals(userPostsService.getAllPosts(), posts);
    }

    @Test
    public void TestDeleteAllPosts() {
        List<UserPosts> posts = new ArrayList<>();

        User user = new User();
        user.setUserId(1);
        UserPosts post = new UserPosts();
        post.setPostId(1);
        post.setOwnerId(user);
        UserPosts post2 = new UserPosts();
        post2.setPostId(2);
        post2.setOwnerId(user);

        posts.add(post);
        posts.add(post2);

        doAnswer(invocation -> {
            posts.clear();
            return null;
        }).when(userPostsRepositoryMock).deleteAll();

        userPostsService.deleteAllPosts(posts);

        assertEquals(posts.size(), 0);
    }

    @Test
    public void testDeletePost() {
        List<UserPosts> posts = new ArrayList<>();
        UserPosts post = new UserPosts();
        post.setPostId(1);
        posts.add(post);

        doAnswer(invocation -> {
            posts.remove(post);
            return null;
        }).when(userPostsRepositoryMock).delete(post);

        userPostsService.delete(post);

        assertEquals(posts.size(), 0);
    }

    @Test
    public void testGetPostByOwnerId() {
        List<UserPosts> posts = new ArrayList<>();
        UserPosts post = new UserPosts();
        post.setPostId(1);
        posts.add(post);

        doAnswer(invocation -> {
            posts.remove(post);
            return null;
        }).when(userPostsRepositoryMock).deleteById(1);

        userPostsService.deleteById(1);

        assertEquals(posts.size(), 0);

    }

     @Test
     public void testUpdatePostLikesRemovesTheirLikeIfTheyAreAlreadyLikingCurrentPost() {
         UpdatePostLikesDto dtoToPassIn = new UpdatePostLikesDto();
         dtoToPassIn.setUserId(1);
         dtoToPassIn.setPostId(4);

         UserPosts postReturnedFromPostsRepo = new UserPosts();
         postReturnedFromPostsRepo.setOwnerId(new User());
         when(userPostsRepositoryMock.getById(4)).thenReturn(postReturnedFromPostsRepo);

         User userReturnedFromUserRepo = new User();
         userReturnedFromUserRepo.setUserId(1);
         List<UserPosts> likedPosts = new ArrayList<>();
         likedPosts.add(postReturnedFromPostsRepo);
         userReturnedFromUserRepo.setLikedPosts(likedPosts);
         when(userRepositoryMock.getById(1)).thenReturn(userReturnedFromUserRepo);

         Set<User> usersLiked = postReturnedFromPostsRepo.getLikes();
         usersLiked.remove(userReturnedFromUserRepo);
         postReturnedFromPostsRepo.setLikes(usersLiked);
         when(userPostsRepositoryMock.save(postReturnedFromPostsRepo)).thenReturn(postReturnedFromPostsRepo);

         List<UserPosts> postsLiked = userReturnedFromUserRepo.getLikedPosts(); // List liked posts
         postsLiked.remove(postReturnedFromPostsRepo);
         userReturnedFromUserRepo.setLikedPosts((postsLiked));

         // Act
         UserPosts postReturnedFromAct = userPostsService.updatePostLikes(dtoToPassIn);

         // Assert
         assertEquals(postReturnedFromPostsRepo, postReturnedFromAct);
         verify(userRepositoryMock, times(1)).save(userReturnedFromUserRepo);
         verify(userPostsRepositoryMock, times(1)).save(postReturnedFromPostsRepo);
     }

     @Test
     public void testUpdatePostLikesAddsTheirLikeIfTheyAreNotCurrentlyLikingPost() {
         UpdatePostLikesDto dtoToPassIn = new UpdatePostLikesDto();
         dtoToPassIn.setUserId(1);
         dtoToPassIn.setPostId(4);

         UserPosts postReturnedFromPostsRepo = new UserPosts();
         postReturnedFromPostsRepo.setOwnerId(new User());
         when(userPostsRepositoryMock.getById(4)).thenReturn(postReturnedFromPostsRepo);

         User userReturnedFromUserRepo = new User();
         userReturnedFromUserRepo.setUserId(1);
//         List<UserPosts> likedPosts = new ArrayList<>();
//         likedPosts.add(postReturnedFromPostsRepo);
//         userReturnedFromUserRepo.setLikedPosts(likedPosts);
         when(userRepositoryMock.getById(1)).thenReturn(userReturnedFromUserRepo);

         Set<User> usersLiked = postReturnedFromPostsRepo.getLikes(); // Set
         usersLiked.add(userReturnedFromUserRepo);
         postReturnedFromPostsRepo.setLikes(usersLiked);
         when(userPostsRepositoryMock.save(postReturnedFromPostsRepo)).thenReturn(postReturnedFromPostsRepo);

         List<UserPosts> postsLiked = userReturnedFromUserRepo.getLikedPosts(); // List liked posts
         postsLiked.add(postReturnedFromPostsRepo);
         userReturnedFromUserRepo.setLikedPosts((postsLiked));

         // Act
         UserPosts postReturnedFromAct = userPostsService.updatePostLikes(dtoToPassIn);

         // Assert
         assertEquals(postReturnedFromPostsRepo, postReturnedFromAct);
         verify(userRepositoryMock, times(1)).save(userReturnedFromUserRepo);
         verify(userPostsRepositoryMock, times(1)).save(postReturnedFromPostsRepo);
     }
}
