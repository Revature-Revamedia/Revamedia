package com.revature.Revamedia.beans.services;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserConversationsRepository;
import com.revature.Revamedia.entities.UserConversations;

@ExtendWith(MockitoExtension.class)
public class UserConversationsServiceTest {
    private UserConversationsService userConversationsService;

    @Mock
    private UserConversationsRepository userConversationsRepository;

    @BeforeEach
    public void setUp() {
        userConversationsService = new UserConversationsService(userConversationsRepository);
    }

    @Test
    void testGetAllConversations() {
        List<UserConversations> conversations = new ArrayList<>();
        conversations.add(new UserConversations());
        conversations.add(new UserConversations());

        when(userConversationsRepository.findAll()).thenReturn(conversations);

        assert (userConversationsService.getAllConversations().size() == 2);

    }

    @Test
    void testGetConversationById() {
        UserConversations conversation = new UserConversations();
        conversation.setConversationId(1);

        when(userConversationsRepository.getById(1)).thenReturn(conversation);

        assert (userConversationsService.getConversationById(1).getConversationId() == 1);

    }

    @Test
    void testSave() {
        UserConversations conversation = new UserConversations();
        conversation.setConversationId(1);

        when(userConversationsRepository.save(conversation)).thenReturn(conversation);

        assert (userConversationsService.save(conversation).getConversationId() == 1);

    }

    @Test
    void testUpdate() {
        UserConversations conversation = new UserConversations();
        conversation.setConversationId(1);

        when(userConversationsRepository.save(conversation)).thenReturn(conversation);

        assert (userConversationsService.update(conversation).getConversationId() == 1);


    }
}
