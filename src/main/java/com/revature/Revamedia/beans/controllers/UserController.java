package com.revature.Revamedia.beans.controllers;


import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AuthDto;
import com.revature.Revamedia.dtos.UpdateUserDto;
import com.revature.Revamedia.beans.services.UserFollowsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.AuthDto;
import com.revature.Revamedia.dtos.UserFollowDto;
import com.revature.Revamedia.entities.User;
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
            System.out.println("list user is following:" + uf.getFollowedId());
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
        System.out.println("made it to the delete mapping");
        User follower = userService.getUserById(ufdto.getFollowerId());
        User followed = userService.getUserById(ufdto.getFollowedId());
        for(UserFollows uf : follower.getFollowing()){
            System.out.println("list user is following:" + uf.getFollowedId());
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
        user.setPassword(encoder.encode(dto.getPassword()));
        return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
    }

    public void setEncoder(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }
}
