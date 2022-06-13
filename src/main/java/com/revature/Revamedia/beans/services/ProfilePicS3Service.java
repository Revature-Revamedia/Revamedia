package com.revature.Revamedia.beans.services;
import com.amazonaws.services.s3.model.DeleteObjectRequest;

import com.revature.Revamedia.beans.exceptions.FileConversionException;
import com.revature.Revamedia.beans.exceptions.InvalidImageExtensionException;
import com.revature.Revamedia.beans.repositories.ProfilePicRepository;
import com.revature.Revamedia.beans.utils.FileUtils;
import com.revature.Revamedia.entities.ProfilePic;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.FilenameUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Log4j2
@Service
public class ProfilePicS3Service extends ProfilePicAmazonClientService {

    @Autowired
    private ProfilePicRepository profilePicRepository;

    // Upload a List of Images to AWS S3.
    public List<ProfilePic> insertImages(List<MultipartFile> images) {
        List<ProfilePic> profilePics = new ArrayList<>();
        images.forEach(image -> profilePics.add(uploadImageToAmazon(image)));
        return profilePics;
    }

    // Upload image to AWS S3.
    public ProfilePic uploadImageToAmazon(MultipartFile multipartFile) {

        // Valid extensions array, like jpeg/jpg and png.
        List<String> validExtensions = Arrays.asList("jpeg", "jpg", "png");

        // Get extension of MultipartFile
        String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        if (!validExtensions.contains(extension)) {
            // If file have an invalid extension, call an Exception.
            log.warn("invalid.image.extension");
            throw new InvalidImageExtensionException(validExtensions);
        } else {

            // Upload file to Amazon.
            String url = uploadMultipartFile(multipartFile);

            // Save image information on MongoDB and return them.
            ProfilePic profilePic = new ProfilePic();
            profilePic.setImageUrl(url);

            return profilePicRepository.save(profilePic);
        }

    }

    public void removeImageFromAmazon(ProfilePic profilePic) {
        String fileName = profilePic.getImageUrl().substring(profilePic.getImageUrl().lastIndexOf("/") + 1);
        getClient().deleteObject(new DeleteObjectRequest(getBucketName(), fileName));
        profilePicRepository.delete(profilePic);
    }

    // Make upload to Amazon.
    private String uploadMultipartFile(MultipartFile multipartFile) {
        String fileUrl;

        try {
            // Get the file from MultipartFile.
            File file = FileUtils.convertMultipartToFile(multipartFile);

            // Extract the file name.
            String fileName = FileUtils.generateFileName(multipartFile);

            // Upload file.
            uploadPublicFile(fileName, file);

            // Delete the file and get the File Url.
            file.delete();
            fileUrl = getUrl().concat(fileName);
        } catch (IOException e) {

            // If IOException on conversion or any file manipulation, call exception.
            log.warn("multipart.to.file.convert.except", e);
            throw new FileConversionException();
        }

        return fileUrl;
    }

    // Send image to AmazonS3, if have any problems here, the image fragments are removed from amazon.
    // Font: https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html#putObject%28com.amazonaws.services.s3.model.PutObjectRequest%29
    private void uploadPublicFile(String fileName, File file) {
        //bucket does not allow acl with following code. look into bucket permission policy
        //if want to use PutObjectRequest()
        //getClient().putObject(new PutObjectRequest(getBucketName(), fileName, file)
        //        .withCannedAcl(CannedAccessControlList.PublicRead));
        getClient().putObject(getBucketName(), fileName, file);

    }

}