package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.AuthService;
import com.revature.Revamedia.beans.services.JsonWebToken;
import com.revature.Revamedia.beans.services.UserGroupsService;
import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.NewGroupDto;
import com.revature.Revamedia.dtos.UpdateGroupDto;
import com.revature.Revamedia.dtos.UserFollowDto;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserGroups;
import com.revature.Revamedia.entities.UserPosts;
import org.hibernate.mapping.Set;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupController {

    // Initialize Service
    private final UserGroupsService userGroupsService;
    private final UserService userService;
    private final AuthService authService;
    private final JsonWebToken jsonWebToken;

    @Autowired
    public GroupController(UserGroupsService userGroupsService, UserService userService, AuthService authService, JsonWebToken jsonWebToken) {
        this.userGroupsService = userGroupsService;
        this.userService = userService;
        this.authService = authService;
        this.jsonWebToken = jsonWebToken;
    }

    @GetMapping("/allGroups")
    @ResponseStatus(HttpStatus.OK)
    public List<UserGroups> getAll(){
        return userGroupsService.getAllGroups();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserGroups> userGroup (@PathVariable Integer id){
        return new ResponseEntity<>(userGroupsService.getGroupById(id), HttpStatus.ACCEPTED);
    }

    @PostMapping("/newGroup")
    public ResponseEntity<UserGroups> newGroup(@RequestBody NewGroupDto dto){
        UserGroups newGroup = new UserGroups();
        User user = userService.getUserById(dto.getOwnerId());
        newGroup.setOwnerId(user);
        newGroup.setTitle(dto.getTitle());
        newGroup.setDescription(dto.getDescription());
        newGroup.setImageUrl(dto.getImageUrl());
        newGroup.setDateCreated(new Timestamp(System.currentTimeMillis()));
        userGroupsService.save(newGroup);
        return new ResponseEntity<>(newGroup, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UserGroups> deleteGroup(@PathVariable Integer id){
        UserGroups group = userGroupsService.getGroupById(id);
        userGroupsService.delete(group);
        return new ResponseEntity<>(group, HttpStatus.ACCEPTED);
    }

    @PutMapping("/update")
    public ResponseEntity<UserGroups> updateGroup(@RequestBody UpdateGroupDto dto){
        UserGroups group = userGroupsService.getGroupById(dto.getGroupId());
        group.setTitle(dto.getTitle());
        group.setDescription(dto.getDescription());
        group.setImageUrl(dto.getImageUrl());
        userGroupsService.update(group);
        return new ResponseEntity<>(group, HttpStatus.OK);
    }
}
