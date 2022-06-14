/**
 * Author(s): @Brandon Le, @Arun Mohan, @Anthony Pilletti
 * Contributor(s): @Stan Savelev, @William Bjerke
 * Purpose: Test class to test the functions in the UserPostsService.
 */
package com.revature.Revamedia.beans.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserPostsRepository;
import com.revature.Revamedia.beans.repositories.UserRepository;
import com.revature.Revamedia.dtos.UpdatePostLikesDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserPosts;

/**
* @Author: Qiang Gao
*/
@ExtendWith(MockitoExtension.class)
public class UserPostsServiceTest {
    UserPostsService userPostsService;

    @Mock
    UserPostsRepository userPostsRepository;

    @Mock
    UserRepository userRepository;

    @BeforeEach
    public void beforeEach() {
        userPostsService = new UserPostsService(userPostsRepository, userRepository);

    }

    @Test
    public void getPostByIdTest() {
        UserPosts post = new UserPosts();
        post.setPostId(1);

        when(userPostsRepository.getById(1)).thenReturn(post);

        assert (userPostsService.getPostById(1).getPostId() == 1);

    }

    @Test
    public void testSave() {
        UserPosts post = new UserPosts();
        post.setPostId(1);

        when(userPostsRepository.save(post)).thenReturn(post);

        assertEquals(userPostsService.save(post), post);
    }

    @Test
    public void testUpdate() {
        UserPosts post = new UserPosts();
        post.setPostId(1);

        when(userPostsRepository.save(post)).thenReturn(post);

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

        when(userPostsRepository.getUserPostsByUser(1)).thenReturn(posts);

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

        when(userPostsRepository.findAll()).thenReturn(posts);

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
        }).when(userPostsRepository).deleteAll();

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
        }).when(userPostsRepository).delete(post);

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
        }).when(userPostsRepository).deleteById(1);

        userPostsService.deleteById(1);

        assertEquals(posts.size(), 0);

    }

    // @Disabled
    // @Test
    // public void testUpdatePostLikes() {
    //     UpdatePostLikesDto dto = new UpdatePostLikesDto();
    //     dto.setUserId(1);

    //     UserPosts post = new UserPosts();

    //     User user = new User();
    //     user.setUserId(1);

    //     Set<User> users = new HashSet<>();
    //     users.add(user);

    //     List<UserPosts> posts = new ArrayList<>();
    //     posts.add(post);

    //     post.setLikes(users);

    //     user.setLikedPosts(posts);

    //     when(userPostsRepository.getById(1)).thenReturn(post);

    //     assertEquals(userPostsService.updatePostLikes(dto), post);

    // }
}
