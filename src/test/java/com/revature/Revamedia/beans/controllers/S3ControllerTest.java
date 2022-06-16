package com.revature.Revamedia.beans.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.revature.Revamedia.beans.services.S3Service;

/**
* @Author: Qiang Gao
*/
@WebMvcTest(S3Controller.class)
public class S3ControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private S3Service s3Service;

    public S3ControllerTest(@Autowired MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    void testUpload() throws Exception {
        mockMvc.perform(get("/s3/upload?fileName=test.txt&file=test"))
                .andExpect(status().isOk());

    }

    @Test
    void testDownload() throws Exception {

        when(s3Service.downloadFile("test.txt")).thenReturn(new byte[] {});

        mockMvc.perform(get("/s3/download/test.txt")).andExpect(status().isOk());
    }

    @Test
    void testDeleteFile() throws Exception {
        mockMvc.perform(delete("/s3/delete/test.txt")).andExpect(status().isOk());

    }

    @Test
    void testGetAllFiles() throws Exception {
        mockMvc.perform(get("/s3/list")).andExpect(status().isOk());
    }

}
