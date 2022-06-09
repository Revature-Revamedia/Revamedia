package com.revature.Revamedia.beans.controllers;


import com.revature.Revamedia.beans.services.UserFollowsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AuthDto;
import com.revature.Revamedia.dtos.UserFollowDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserFollows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/user", produces = "application/json")
public class UserController {
    //Initialize Services
    private final UserService userService;
    private final UserFollowsService userFollowsService;
    //Autowire Services
    @Autowired
    public UserController(UserService userService, UserFollowsService userFollowsService) {
        this.userService = userService;
        this.userFollowsService = userFollowsService;
    }

    //Controller Methods

    @PostMapping("/userFollows")
    public ResponseEntity<String> startedFollowing(@RequestBody UserFollowDto ufdto){
        User follower = userService.getUserById(ufdto.getFollowerId());
        User followed = userService.getUserById(ufdto.getFollowedId());
        UserFollows userFollows = new UserFollows(follower, followed);
        for(UserFollows uf : follower.getFollowing()){
            System.out.println("list user is following:" + uf.getFollowedId());
            if(uf.getFollowedId().getUserId().equals(followed.getUserId())){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("You are already following this user");
            }
        }
        follower.follow(userFollows);
        userService.save(follower);
        return ResponseEntity.status(HttpStatus.OK).body("You are now following this user");
    }

    @DeleteMapping("/deleteFollowing")
    public ResponseEntity<String> stoppedFollowing(@RequestBody UserFollowDto ufdto){
        User follower = userService.getUserById(ufdto.getFollowerId());
        User followed = userService.getUserById(ufdto.getFollowedId());
        for(UserFollows uf : follower.getFollowing()){
            System.out.println("list user is following:" + uf.getFollowedId());
            if(uf.getFollowedId().getUserId().equals(followed.getUserId())){
                follower.unFollow(uf);
                userService.update(follower);
                System.out.println("deleted user follows " + uf);
                userFollowsService.delete(uf);
                return ResponseEntity.status(HttpStatus.OK).body("You are no longer following this user");
            }
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("You are not currently following this user");
    }

    @GetMapping("/allUsers")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAll(){
        return userService.getAllUsers();
    }

}
