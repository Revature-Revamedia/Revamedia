package com.revature.Revamedia.beans.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

public class FileServiceImplTest {

    @Test
    void testDeleteFile() {

        FileServiceImpl fileServiceImpl = mock(FileServiceImpl.class);

        when(fileServiceImpl.deleteFile("test.txt")).thenReturn("File deleted");

        assertEquals("File deleted", fileServiceImpl.deleteFile("test.txt"));
    }

    @Test
    void testDownloadFile() {

        FileServiceImpl fileServiceImpl = mock(FileServiceImpl.class);

        byte[] file = new byte[10];

        when(fileServiceImpl.downloadFile("test.txt")).thenReturn(file);

        assertEquals(file, fileServiceImpl.downloadFile("test.txt"));

    }

    @Test
    void testListAllFiles() {

        FileServiceImpl fileServiceImpl = mock(FileServiceImpl.class);

        List<String> files = new ArrayList<>();

        when(fileServiceImpl.listAllFiles()).thenReturn(files);

        assertEquals(files, fileServiceImpl.listAllFiles());

    }

    @Test
    void testSaveFile() {

        FileServiceImpl fileServiceImpl = mock(FileServiceImpl.class);

        MultipartFile file = mock(MultipartFile.class);

        when(fileServiceImpl.saveFile(file, "test.txt")).thenReturn("File saved");

        assertEquals("File saved", fileServiceImpl.saveFile(file, "test.txt"));

    }
}
