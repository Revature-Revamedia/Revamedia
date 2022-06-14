package com.revature.Revamedia.beans.services;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserMessagesRepository;
import com.revature.Revamedia.entities.UserMessages;

/**
* @Author: Qiang Gao
*/
@ExtendWith(MockitoExtension.class)
public class UserMessagesServiceTest {
    private UserMessagesService userMessagesService;

    @Mock
    private UserMessagesRepository userMessagesRepository;

    @BeforeEach
    public void setUp() {
        userMessagesService = new UserMessagesService(userMessagesRepository);
    }

    @Test
    void testGetAllMessages() {
        List<UserMessages> messages = new ArrayList<>();
        messages.add(new UserMessages());
        messages.add(new UserMessages());

        when(userMessagesRepository.findAll()).thenReturn(messages);

        assert (userMessagesService.getAllMessages().size() == 2);

    }

    @Test
    void testGetMessageById() {
        UserMessages message = new UserMessages();
        message.setMessageId(1);

        when(userMessagesRepository.getById(1)).thenReturn(message);

        assert (userMessagesService.getMessageById(1).getMessageId() == 1);

    }

    @Test
    void testSave() {

        UserMessages message = new UserMessages();
        message.setMessageId(1);

        when(userMessagesRepository.save(message)).thenReturn(message);

        assert (userMessagesService.save(message).getMessageId() == 1);
    }

    @Test
    void testUpdate() {

        UserMessages message = new UserMessages();
        message.setMessageId(1);

        when(userMessagesRepository.save(message)).thenReturn(message);

        assert (userMessagesService.update(message).getMessageId() == 1);

    }
}
