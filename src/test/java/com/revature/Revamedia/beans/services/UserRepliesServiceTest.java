package com.revature.Revamedia.beans.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserRepliesRepository;
import com.revature.Revamedia.entities.UserReplies;

/**
* @Author: Qiang Gao
*/
@ExtendWith(MockitoExtension.class)
public class UserRepliesServiceTest {
    UserRepliesService userRepliesService;

    @Mock
    UserRepliesRepository userRepliesRepository;

    @BeforeEach
    public void beforeEach() {
        userRepliesService = new UserRepliesService(userRepliesRepository);
    }

    @Test
    public void getReplyById() {
        UserReplies reply = new UserReplies();
        when(userRepliesService.getReplyById(anyInt())).thenReturn(reply);

        assert (userRepliesService.getReplyById(1) == reply);
    }

    @Test
    public void save() {
        UserReplies reply = new UserReplies();
        when(userRepliesService.save(reply)).thenReturn(reply);

        assert (userRepliesService.save(reply) == reply);
    }

    @Test
    public void update() {
        UserReplies reply = new UserReplies();
        when(userRepliesService.update(reply)).thenReturn(reply);

        assert (userRepliesService.update(reply) == reply);
    }

    @Test
    public void getAllReplies() {
        List<UserReplies> replies = new ArrayList<>();
        when(userRepliesService.getAllReplies()).thenReturn(replies);

        assert (userRepliesService.getAllReplies() == replies);

    }

    @Test
    public void delete() {
        List<UserReplies> replies = new ArrayList<>();
        replies.add(new UserReplies());

        doAnswer(invocation -> {
            replies.remove(0);
            return null;
        }).when(userRepliesRepository).delete(any(UserReplies.class));

        userRepliesService.delete(replies.get(0));
        assert (replies.size() == 0);
    }
}
