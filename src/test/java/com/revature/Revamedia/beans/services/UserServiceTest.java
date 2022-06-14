package com.revature.Revamedia.beans.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.Revamedia.beans.repositories.UserRepository;
import com.revature.Revamedia.entities.User;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    private UserService userService;

    @Mock
    private UserRepository mockUserRepository;

    @BeforeEach
    public void setup() {
        userService = new UserService(mockUserRepository);
    }

    @Test
    public void getUserByIdTest() {
        //arrange
        Integer id = 1;
        User user = new User();
        when(mockUserRepository.getById(id)).thenReturn(user);
        //act
        User returnedUser = userService.getUserById(id);
        //assert
        verify(mockUserRepository, times(1)).getById(id);
        assertEquals(user, returnedUser);
    }

    /**
    * @Author: Qiang Gao
    */
    @Test
    public void saveTest() {
        User user = new User();
        when(mockUserRepository.save(user)).thenReturn(user);
        assertEquals(user, userService.save(user));
    }

    /**
    * @Author: Qiang Gao
    */
    @Test
    public void updateTest() {
        User user = new User();
        when(mockUserRepository.save(user)).thenReturn(user);
        assertEquals(user, userService.update(user));
    }

    @Test
    public void getAllUsersTest() {
        //arrange
        List<User> userList = new ArrayList<>();
        when(mockUserRepository.findAll()).thenReturn(userList);
        //act
        List<User> returnedUserList = userService.getAllUsers();
        //assert
        verify(mockUserRepository, times(1)).findAll();
        assertEquals(userList, returnedUserList);
    }

    @Test
    public void existsByUsernameTest() {
        //arrange
        String username = "username";
        Boolean userExists = true;
        when(mockUserRepository.existsUserByUsername(username)).thenReturn(userExists);

        //act
        Boolean returnedUserBoolean = userService.existsByUsername(username);

        //assert
        verify(mockUserRepository, times(1)).existsUserByUsername(username);
        assertEquals(userExists, returnedUserBoolean);
    }

    @Test
    public void findByEmailTest() {
        User user = new User();
        when(mockUserRepository.findByEmail(anyString())).thenReturn(user);
        assertEquals(user, userService.findByEmail(anyString()));
    }

    @Test
    public void existsByEmailTest() {
        Boolean userExists = true;
        when(mockUserRepository.existsByEmail(anyString())).thenReturn(userExists);
        assertEquals(userExists, userService.existsByEmail(anyString()));
    }

    @Test
    public void findByUsernameAndPasswordTest() {
        User user = new User();
        when(mockUserRepository.findByResetPasswordToken(anyString())).thenReturn(user);
        assertEquals(user, userService.findByResetPasswordToken(anyString()));
    }

    @Test
    public void existsByResetPasswordTokenTest() {
        Boolean userExists = true;
        when(mockUserRepository.existsByResetPasswordToken(anyString())).thenReturn(userExists);
        assertEquals(userExists, userService.existsByResetPasswordToken(anyString()));

    }

    @Test
    public void findUserByUsernameTest() {
        //arrange
        String username = "username";
        User user = new User();
        when(mockUserRepository.findByUsername(username)).thenReturn(user);

        //act
        User returnedUser = userService.findUserByUsername(username);

        //assert
        verify(mockUserRepository, times(1)).findByUsername(username);
        assertEquals(user, returnedUser);
    }

    @Test
    public void searchByUsernameTest() {
        String username = "username";
        List<User> userList = new ArrayList<>();
        when(mockUserRepository.searchByUsername(username)).thenReturn(userList);
        assertEquals(userList, userService.searchByUsername(username));
    }

    @Test
    public void existsByTwoFactorAuthTest(){
        User user = new User();
        user.setTwoFactorAuth(true);
        when(mockUserRepository.getByUsername(anyString())).thenReturn(user);
        assertEquals(true, userService.existsByTwoFactorAuth(anyString()));
    }

    @Test
    public void deleteAllPostLikes(){
        doNothing().when(mockUserRepository).removePostLikes(anyInt());

        userService.deleteAllPostLikes(anyInt());

        verify(mockUserRepository, times(1)).removePostLikes(anyInt());
    }


}