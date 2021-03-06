package com.revature.Revamedia.beans.controllers;
import com.revature.Revamedia.beans.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import static java.net.HttpURLConnection.HTTP_OK;

@RestController
@RequestMapping("/s3")
public class S3Controller {

    @Autowired
    private S3Service s3Service;

    @CrossOrigin
    @PostMapping("upload")
    public String upload(@RequestParam("file") MultipartFile file , @RequestParam("fileName") String fileName) {
        return s3Service.saveFile(file , fileName);
    }

    @GetMapping("download/{filename}")
    public ResponseEntity<byte[]> download(@PathVariable("filename") String filename) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", MediaType.ALL_VALUE);
        headers.add("Content-Disposition", "attachment; filename=" + filename);
        byte[] bytes = s3Service.downloadFile(filename);
        return ResponseEntity.status(HTTP_OK).headers(headers).body(bytes);
    }

    @DeleteMapping("{filename}")
    public String deleteFile(@PathVariable("filename") String filename) {
        return s3Service.deleteFile(filename);
    }

    @GetMapping("list")
    public List<String> getAllFiles() {
        return s3Service.listAllFiles();
    }
}