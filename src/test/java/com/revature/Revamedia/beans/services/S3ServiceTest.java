package com.revature.Revamedia.beans.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.StringInputStream;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class S3ServiceTest {

    @Mock private AmazonS3 mockS3;
    @Mock private UserService userService;
    @Mock private FileOutputStream fileOutputStream;

    @InjectMocks private S3Service s3Service;

    @Test
    public void saveFileSavesFileToS3Bucket() throws IOException {
        s3Service = spy(new S3Service(mockS3));

        String originalFileName = "File Name";
        String fileNameToPass = "New File Name";
        MultipartFile mockMultipartFileToPass = mock(MultipartFile.class);
        PutObjectResult mockPutObjectResult = mock(PutObjectResult.class);
        when(mockPutObjectResult.getContentMd5()).thenReturn("hello");
        when(mockS3.putObject(any(), eq(fileNameToPass), any(File.class))).thenReturn(mockPutObjectResult);
        when(mockMultipartFileToPass.getOriginalFilename()).thenReturn("fileName");

        when(mockMultipartFileToPass.getBytes()).thenReturn(new byte[]{1,2,3,4});

        String resultFromAct = s3Service.saveFile(mockMultipartFileToPass, fileNameToPass);

        verify(mockS3, times(1)).putObject(eq(null), eq(fileNameToPass), any(File.class)); // s3.putObject was called
        assertEquals(String.class, resultFromAct.getClass()); // String result
    }


    @Test
    public void downloadFileReturnsImage() throws UnsupportedEncodingException {
        String fileNameToPass = "New File Name";
        S3Object mockS3Object = mock(S3Object.class);
        when(mockS3.getObject(any(), anyString())).thenReturn(mockS3Object);
        when(mockS3Object.getObjectContent()).thenReturn(new S3ObjectInputStream(new StringInputStream("string"), null));

        byte[] returnedValue = s3Service.downloadFile(fileNameToPass);

        //assert s3.getObject was called
        verify(mockS3, times(1)).getObject(any(), anyString());
        // assert return statement is of byte[]
        assertInstanceOf(byte[].class, returnedValue);
    }

    @Test
    public void deleteFileDeletesFile() {
        String fileNameToPass = "New File Name";

        s3Service.deleteFile(fileNameToPass);

        verify(mockS3, times(1)).deleteObject(any(), eq(fileNameToPass)); //assert s3.deleteObject
    }
    @Test
    public void listAllFilesReturnsListOfFiles() {
        ListObjectsV2Result mockListObjectsV2Result = mock(ListObjectsV2Result.class);
        when(mockListObjectsV2Result.getObjectSummaries()).thenReturn(new ArrayList<>());
        when(mockS3.listObjectsV2((String) null)).thenReturn(mockListObjectsV2Result);

        List<String> returnedValue = s3Service.listAllFiles();

        verify(mockS3, times(1)).listObjectsV2((String) null);
        assertInstanceOf(List.class, returnedValue);
    }
}
