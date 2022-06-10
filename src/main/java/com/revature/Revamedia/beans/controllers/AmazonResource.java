package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.AmazonS3ImageService;
import com.revature.Revamedia.entities.AmazonImage;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/amazon")
public class AmazonResource {

    @Autowired
    private AmazonS3ImageService amazonS3ImageService;

    @PostMapping("/images")
    public ResponseEntity<List<AmazonImage>> insertImages(@RequestPart(value = "images") List<MultipartFile> images) {
        return ResponseEntity.ok(amazonS3ImageService.insertImages(images));

    }
}
