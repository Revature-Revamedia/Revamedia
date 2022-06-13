package com.revature.Revamedia.beans.controllers;

import com.revature.Revamedia.beans.services.ProfilePicS3Service;
import com.revature.Revamedia.entities.ProfilePic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/profilepic")
public class ProfilePicController {


    private ProfilePicS3Service profilePicS3Service;

    @Autowired
    public ProfilePicController(ProfilePicS3Service profilePicS3Service) {
        this.profilePicS3Service = profilePicS3Service;
    }

    @PostMapping("/upload")
    public ResponseEntity<List<ProfilePic>> insertImages(@RequestParam(value = "file") List<MultipartFile> images) {
        return ResponseEntity.ok(profilePicS3Service.insertImages(images));
    }
/*
    @PostMapping("/upload")
    public ResponseEntity<ProfilePic> insertImages(@RequestPart(value = "image") MultipartFile image) {
        return ResponseEntity.ok(profilePicS3Service.uploadImageToAmazon(image));
    }


 */
    @DeleteMapping("/delete")
    public void deleteImage(@RequestPart(value = "delete") ProfilePic profilePic) {
        profilePicS3Service.removeImageFromAmazon(profilePic);
    }
}
