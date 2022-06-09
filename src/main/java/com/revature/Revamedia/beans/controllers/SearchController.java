package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.CookieDto;
import com.revature.Revamedia.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    private UserService userService;

    @Autowired
    public SearchController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public ResponseEntity<List<CookieDto>> search(@RequestBody String username){

        return ResponseEntity.status(HttpStatus.OK).body(userService.searchByUsername(username));

    }
}
