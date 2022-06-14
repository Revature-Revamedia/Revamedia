package com.revature.Revamedia.beans.services;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserFollowsRepository;
import com.revature.Revamedia.entities.UserFollows;

/**
* @Author: Qiang Gao
*/
@ExtendWith(MockitoExtension.class)
public class UserFollowsServiceTest {
    private UserFollowsService userFollowsService;

    @Mock
    private UserFollowsRepository userFollowsRepository;

    @BeforeEach
    public void setUp() {
        userFollowsService = new UserFollowsService(userFollowsRepository);
    }

    @Test
    void testGetAllFollows() {
        List<UserFollows> follows = new ArrayList<>();
        follows.add(new UserFollows());
        follows.add(new UserFollows());

        when(userFollowsRepository.findAll()).thenReturn(follows);

        assert (userFollowsService.getAllFollows().size() == 2);

    }

    @Test
    void testGetFollowById() {
        UserFollows follow = new UserFollows();
        follow.setId(1);

        when(userFollowsRepository.getById(1)).thenReturn(follow);

        assert (userFollowsService.getFollowById(1).getId() == 1);

    }

    @Test
    void testSave() {
        UserFollows follow = new UserFollows();

        UserFollows savedFollow = new UserFollows();
        savedFollow.setId(1);

        when(userFollowsRepository.save(follow)).thenReturn(savedFollow);

        assert (userFollowsService.save(follow).getId() == 1);

    }

    @Test
    void testUpdate() {
        UserFollows follow = new UserFollows();
        follow.setId(1);

        UserFollows updatedFollow = new UserFollows();
        updatedFollow.setId(1);

        when(userFollowsRepository.save(follow)).thenReturn(updatedFollow);

        assert (userFollowsService.update(follow).getId() == 1);

    }
}
