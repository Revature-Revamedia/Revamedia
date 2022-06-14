package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.*;
import com.revature.Revamedia.dtos.AddCommentDto;
import com.revature.Revamedia.dtos.HttpResponseDto;
import com.revature.Revamedia.dtos.UserCommentsDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserComments;
import com.revature.Revamedia.entities.UserPosts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    // Initialize Service
    private final UserCommentsService userCommentsService;
    private final UserService userService;
    private final UserPostsService userPostsService;
    private final AuthService authService;
    private final JsonWebToken jsonWebToken;

    @Autowired
    public CommentController(UserCommentsService userCommentsService, UserService userService, UserPostsService userPostsService, AuthService authService, JsonWebToken jsonWebToken) {
        this.userCommentsService = userCommentsService;
        this.userService = userService;
        this.userPostsService = userPostsService;
        this.authService = authService;
        this.jsonWebToken = jsonWebToken;
    }


    @GetMapping("/{id}")
    public HttpResponseDto getById(HttpServletResponse res, @PathVariable("id") int id) {
       UserComments comment = userCommentsService.getCommentById(id);
       UserCommentsDto commentsDto = new UserCommentsDto(comment.getOwnerId().getUserId(), comment.getPostId().getPostId(),
               comment.getCommentId(), comment.getMessage(), comment.getDateCreated(), comment.getGiphyUrl());


        if(comment.getCommentId() != id) {
            res.setStatus(400);
            return new HttpResponseDto(400, "Failed to get comment.", commentsDto);
        } else {
            res.setStatus(200);
            return new HttpResponseDto(200, "Successfully retrieved comment.", commentsDto);
        }
    }


    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public HttpResponseDto getById(HttpServletResponse res) {
        List<UserComments> comments = userCommentsService.getAllComment();
        List<UserCommentsDto> dtoComments = new LinkedList<>();
        for (UserComments comment: comments) {
            UserCommentsDto commentsDto = new UserCommentsDto(comment.getOwnerId().getUserId(), comment.getPostId().getPostId(),
                    comment.getCommentId(), comment.getMessage(), comment.getDateCreated(), comment.getGiphyUrl());
            dtoComments.add(commentsDto);
        }
        res.setStatus(200);
        return new HttpResponseDto(200, "Successfully retrieved all comments.", dtoComments);
    }



    @PostMapping("/add")
    public ResponseEntity<Object> saveComment(@RequestBody AddCommentDto dto, HttpServletResponse res, @CookieValue(name = "user_session", required = false) String userSession){
        UserComments newComment = new UserComments();
        UserPosts post = new UserPosts();
        post = userPostsService.getPostById(dto.getPost_id());

        User user = new User();
        user = userService.getUserById(dto.getOwner_id());

        newComment.setMessage(dto.getMessage());
        newComment.setGiphyUrl(dto.getGiphyUrl());
        newComment.setDateCreated(new Timestamp(System.currentTimeMillis()));
        newComment.setOwnerId(user);
        newComment.setPostId(post);

        userCommentsService.save(newComment);
        if(newComment.getMessage() != dto.getMessage()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            res.setStatus(200);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public HttpResponseDto updateById(@RequestBody UserCommentsDto updatedComment, HttpServletResponse res,@CookieValue(name = "user_session", required = false) String userSession) {
        UserComments comment = userCommentsService.getCommentById(updatedComment.getComment_id());
        comment.setMessage(updatedComment.getMessage());
        userCommentsService.update(comment);

        User user = userService.getUserById(jsonWebToken.verify(userSession).getUserId());
        if(comment.getMessage() != comment.getMessage()) {
            res.setStatus(400);
            return new HttpResponseDto(400, "Failed to update comment", null);
        } else {
            res.setStatus(200);
            return new HttpResponseDto(200, "Successfully updated comment" + comment.getMessage(), user);
        }
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HttpResponseDto delete(@PathVariable Integer id, HttpServletResponse res, @CookieValue(name = "user_session", required = false) String userSession){
        UserComments comment = userCommentsService.getCommentById(id);
        userCommentsService.delete(comment);
        User user = userService.getUserById(jsonWebToken.verify(userSession).getUserId());
        res.setStatus(200);
        return new HttpResponseDto(200, "Comment successfully deleted.", user);
    }
}

