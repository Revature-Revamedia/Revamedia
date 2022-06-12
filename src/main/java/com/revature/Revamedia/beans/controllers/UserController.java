package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.UserFollowsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.HttpResponseDto;
import com.revature.Revamedia.dtos.UpdateUserDto;
import com.revature.Revamedia.dtos.UserCommentsDto;
import com.revature.Revamedia.dtos.UserFollowDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserComments;
import com.revature.Revamedia.entities.UserFollows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/user", produces = "application/json")
public class UserController {
  
    //Initialize Services
    private final UserService userService;
    private final UserFollowsService userFollowsService;
    BCryptPasswordEncoder encoder;

    @Autowired
    public UserController(UserService userService, UserFollowsService userFollowsService) {
      this.encoder =  new BCryptPasswordEncoder(10);

        this.userService = userService;
        this.userFollowsService = userFollowsService;
    }

    //Controller Methods


    @PostMapping("/userFollows")
    public ResponseEntity<User> startedFollowing(@RequestBody UserFollowDto ufdto){
        User follower = userService.getUserById(ufdto.getFollowerId());
        User followed = userService.getUserById(ufdto.getFollowedId());
        UserFollows userFollows = new UserFollows(follower, followed);
        for(UserFollows uf : follower.getFollowing()){
            if(uf.getFollowedId().getUserId().equals(followed.getUserId())){
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
        }
        follower.follow(userFollows);
        userService.save(follower);
        return ResponseEntity.status(HttpStatus.OK).body(followed);
    }

    @PostMapping("/deleteFollowing")
    public ResponseEntity<User> stoppedFollowing(@RequestBody UserFollowDto ufdto){
        User follower = userService.getUserById(ufdto.getFollowerId());
        User followed = userService.getUserById(ufdto.getFollowedId());
        for(UserFollows uf : follower.getFollowing()){
            if(uf.getFollowedId().getUserId().equals(followed.getUserId())){
                follower.unFollow(uf);
                userService.update(follower);
                System.out.println("deleted user follows " + uf);
                userFollowsService.delete(uf);
                return ResponseEntity.status(HttpStatus.OK).body(followed);
            }
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }


    @GetMapping("/allUsers")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAll(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> user (@PathVariable Integer id){
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody UpdateUserDto dto){
        User user = userService.getUserById(id);
        user.setUsername(dto.getUsername());
        user.setProfilePicture(dto.getProfilePicture());
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
    }

//    @GetMapping("/isFollowing")
//    public ResponseEntity<UserFollows> isFollowing (@RequestBody UserFollowDto dto){
//        User follower = userService.getUserById(dto.getFollowerId());
//        User followed = userService.getUserById(dto.getFollowedId());
//        for(UserFollows uf : follower.getFollowing()){
//            if(uf.getFollowedId().getUserId().equals(followed.getUserId())){
//                return new ResponseEntity<>(uf, HttpStatus.OK);
//            }else{
//                return new ResponseEntity<>(null, HttpStatus.OK);
//            }
//        }
//        return ResponseEntity.status(HttpStatus.CONFLICT).build();
//    }
    @GetMapping("/isFollowing/{id1}/{id2}")
    public HttpResponseDto isFollowing(HttpServletResponse res, @PathVariable Integer id1, @PathVariable Integer id2) {
        User follower = userService.getUserById(id1);
        User followed = userService.getUserById(id2);
        for(UserFollows uf : follower.getFollowing()){
            if(uf.getFollowedId().getUserId().equals(followed.getUserId())) {
                res.setStatus(200);
                return new HttpResponseDto(200, "Following", true);
            }
        }
        res.setStatus(200);
        return new HttpResponseDto(200, "NotFollowing", false);
    }

    public void setEncoder(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }
}
