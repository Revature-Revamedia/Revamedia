package com.revature.Revamedia.beans.services;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserGroupsRepository;
import com.revature.Revamedia.entities.UserGroups;


@ExtendWith(MockitoExtension.class)
public class UserGroupsServiceTest {

    private UserGroupsService userGroupsService;

    @Mock
    private UserGroupsRepository userGroupsRepository;

    @BeforeEach
    public void setUp() {
        userGroupsService = new UserGroupsService(userGroupsRepository);
    }

    @Test
    void testGetAllGroups() {
        List<UserGroups> groups = new ArrayList<>();
        groups.add(new UserGroups());
        groups.add(new UserGroups());

        when(userGroupsRepository.findAll()).thenReturn(groups);

        assert (userGroupsService.getAllGroups().size() == 2);


    }

    @Test
    void testGetGroupById() {
        UserGroups group = new UserGroups();
        group.setGroupId(1);

        when(userGroupsRepository.getById(1)).thenReturn(group);

        assert (userGroupsService.getGroupById(1).getGroupId() == 1);

    }

    @Test
    void testSave() {
        UserGroups group = new UserGroups();
        group.setGroupId(1);

        when(userGroupsRepository.save(group)).thenReturn(group);

        assert (userGroupsService.save(group).getGroupId() == 1);


    }

    @Test
    void testUpdate() {
        UserGroups group = new UserGroups();
        group.setGroupId(1);

        when(userGroupsRepository.save(group)).thenReturn(group);

        assert (userGroupsService.update(group).getGroupId() == 1);

    }
}
