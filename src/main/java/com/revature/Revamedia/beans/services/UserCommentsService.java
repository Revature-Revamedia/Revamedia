package com.revature.Revamedia.beans.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.Revamedia.beans.repositories.UserCommentsRepository;
import com.revature.Revamedia.entities.UserComments;

@Service
public class UserCommentsService {
    private final UserCommentsRepository userCommentsRepository;

    @Autowired
    public UserCommentsService(UserCommentsRepository userCommentsRepository) {
        this.userCommentsRepository = userCommentsRepository;
    }

    public UserComments getCommentById(Integer id) {
        return userCommentsRepository.getById(id);
    }

    public UserComments save(UserComments comment) {
        return userCommentsRepository.save(comment);
    }

    public UserComments update(UserComments comment) {
        return userCommentsRepository.save(comment);
    }

    public List<UserComments> getAllComment() {
        return userCommentsRepository.findAll();
    }
}
