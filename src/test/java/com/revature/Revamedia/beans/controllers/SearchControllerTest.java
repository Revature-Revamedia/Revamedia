package com.revature.Revamedia.beans.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.revature.Revamedia.beans.services.UserService;
import com.revature.Revamedia.dtos.SearchDto;
import com.revature.Revamedia.entities.User;

/**
* @Author: Qiang Gao
*/
@WebMvcTest(SearchController.class)
public class SearchControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    public SearchControllerTest(@Autowired MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    void testSearch() throws Exception {

        User user = new User();
        user.setUsername("test");

        List<SearchDto> searchDtoList = new ArrayList<>();

        when(userService.searchByUsername("test")).thenReturn(searchDtoList);

        mockMvc.perform(post("/search/user")
                .contentType("application/json")
                .content("{\"username\":\"test\"}")
                .accept("application/json"))
                .andExpect(status().isOk());

    }
}
