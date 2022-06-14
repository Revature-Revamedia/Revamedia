package com.revature.Revamedia.beans.services;

import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserEventsRepository;
import com.revature.Revamedia.entities.UserEvents;

/**
* @Author: Qiang Gao
*/
@ExtendWith(MockitoExtension.class)
public class UserEventsServiceTest {
    private UserEventsService userEventsService;

    @Mock
    private UserEventsRepository userEventsRepository;

    @BeforeEach
    public void setUp() {
        userEventsService = new UserEventsService(userEventsRepository);
    }

    @Test
    void testGetAllEvents() {
        List<UserEvents> events = userEventsService.getAllEvents();
        events.add(new UserEvents());
        events.add(new UserEvents());

        when(userEventsRepository.findAll()).thenReturn(events);

        assert (userEventsService.getAllEvents().size() == 2);

    }

    @Test
    void testGetEventById() {
        UserEvents event = new UserEvents();
        event.setId(1);

        when(userEventsRepository.getById(1)).thenReturn(event);

        assert (userEventsService.getEventById(1).getId() == 1);

    }

    @Test
    void testSave() {
        UserEvents event = new UserEvents();
        event.setId(1);

        when(userEventsRepository.save(event)).thenReturn(event);

        assert (userEventsService.save(event).getId() == 1);

    }

    @Test
    void testUpdate() {
        UserEvents event = new UserEvents();
        event.setId(1);

        when(userEventsRepository.save(event)).thenReturn(event);

        assert (userEventsService.update(event).getId() == 1);

    }
}
