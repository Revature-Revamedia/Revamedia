package com.revature.Revamedia.beans.services;

import com.revature.Revamedia.beans.repositories.UserRepository;
import com.revature.Revamedia.dtos.CookieDto;
import com.revature.Revamedia.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Integer id) {
        return userRepository.getById(id);
    }

    public User save(@Valid User user) {
        return userRepository.save(user);
    }

    public User update(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public boolean existsByUsername(String username){return userRepository.existsUserByUsername(username);}

    public User findByResetPasswordToken(String token){
        return userRepository.findByResetPasswordToken(token);
    }

    public boolean existsByResetPasswordToken(String token){
        return userRepository.existsByResetPasswordToken(token);
    }

    public User getUserByUsername(String username){
        return userRepository.getByUsername(username);
    }

    public List<CookieDto> searchByUsername(String username){

        List<User> userList = userRepository.searchByUsername(username);
        List<CookieDto> cookieDtoList = new ArrayList<>();

        for (User user : userList) {
            CookieDto cookieDto = new CookieDto();
            cookieDto.setUserId(user.getUserId());
            cookieDto.setUsername(user.getUsername());
            cookieDto.setEmail(user.getEmail());
            cookieDtoList.add(cookieDto);
        }

        return cookieDtoList;
    }

}
