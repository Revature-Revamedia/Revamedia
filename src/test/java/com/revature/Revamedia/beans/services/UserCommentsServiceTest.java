package com.revature.Revamedia.beans.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserCommentsRepository;
import com.revature.Revamedia.entities.UserComments;

@ExtendWith(MockitoExtension.class)
public class UserCommentsServiceTest {

    private UserCommentsService userCommentsService;

    @Mock
    UserCommentsRepository userCommentsRepository;

    @BeforeEach
    public void setup() {
        userCommentsService = new UserCommentsService(userCommentsRepository);
    }

    @Test
    public void testGetCommentById() {
        Integer id = 1;
        UserComments comment = new UserComments();
        comment.setCommentId(id);
        when(userCommentsRepository.getById(id)).thenReturn(comment);

        assert userCommentsService.getCommentById(id).equals(comment);
    }

    @Test
    public void testSave() {
        UserComments comment = new UserComments();
        when(userCommentsRepository.save(comment)).thenReturn(comment);

        assert userCommentsService.save(comment).equals(comment);
    }

    @Test
    public void testUpdate() {
        UserComments comment = new UserComments();
        when(userCommentsRepository.save(comment)).thenReturn(comment);

        assert userCommentsService.update(comment).equals(comment);
    }

    @Test
    public void testGetAllComment() {
        List<UserComments> comments = new ArrayList<>();
        comments.add(new UserComments());
        comments.add(new UserComments());
        when(userCommentsRepository.findAll()).thenReturn(comments);

        assert userCommentsService.getAllComment().equals(comments);
    }

    @Test
    public void testDelete() {
        UserComments comment = new UserComments();

        doNothing().when(userCommentsRepository).delete(comment);

        userCommentsService.delete(comment);

    }
}
