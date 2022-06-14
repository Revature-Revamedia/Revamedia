package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.UserCommentsService;
import com.revature.Revamedia.beans.services.UserRepliesService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AddReplyDto;
import com.revature.Revamedia.dtos.HttpResponseDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserComments;
import com.revature.Revamedia.entities.UserReplies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;

@RestController
@RequestMapping("/reply")
public class ReplyController {

    // Initialize Service
    private final UserRepliesService userRepliesService;
    private final UserCommentsService userCommentsService;
    private final UserService userService;

    @Autowired
    public ReplyController(UserRepliesService userRepliesService, UserCommentsService userCommentsService, UserService userService) {
        this.userRepliesService = userRepliesService;
        this.userCommentsService = userCommentsService;
        this.userService = userService;
    }


    @PostMapping("/add")
    @ResponseStatus(HttpStatus.OK)
    public HttpResponseDto saveReply(@RequestBody AddReplyDto dto, HttpServletResponse res){
        UserReplies newReply = new UserReplies();
        UserComments comment = new UserComments();
        comment = userCommentsService.getCommentById(dto.getComment_id());
        User user = new User();
        user = userService.getUserById(dto.getOwner_id());

        newReply.setMessage(dto.getMessage());
        newReply.setGiphyUrl(dto.getGiphyUrl());
        newReply.setDateCreated(new Timestamp(System.currentTimeMillis()));
        newReply.setOwnerId(user);
        newReply.setCommentId(comment);

        userRepliesService.save(newReply);

        if(!newReply.getMessage().equals(dto.getMessage())) {
            res.setStatus(400);
            return new HttpResponseDto(400, "Failed to save comment", newReply);
        } else {
            res.setStatus(200);
            return new HttpResponseDto(200, "Successfully saved reply", newReply);
        }
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HttpResponseDto updateById(@PathVariable Integer id, @RequestBody String message, HttpServletResponse res) {
        UserReplies reply = userRepliesService.getReplyById(id);
        reply.setMessage(message);
        userRepliesService.update(reply);

        res.setStatus(200);
        return new HttpResponseDto(200, "Successfully updated reply" + reply.getReplyId(), reply);
    }

    @DeleteMapping("/delete/{id}")
    public HttpResponseDto delete(@PathVariable Integer id, HttpServletResponse res){
        UserReplies reply = userRepliesService.getReplyById(id);
        userRepliesService.delete(reply);
        res.setStatus(200);
        return new HttpResponseDto(200, "Reply successfully deleted.", reply);
    }

}
