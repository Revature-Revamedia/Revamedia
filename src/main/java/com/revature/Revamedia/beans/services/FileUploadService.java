package com.revature.Revamedia.beans.services;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Service
public class FileUploadService{

    private String s3AccessKey;
    private String s3SecretKey;
    private String BUCKET;
    private BasicAWSCredentials awsCreds;
    private AmazonS3 s3Client;

    @Autowired
    public FileUploadService(){

        try (InputStream input = new FileInputStream("src/main/resources/application.properties")) {
            Properties prop = new Properties();
            prop.load(input);
            s3AccessKey = prop.getProperty("s3AccessKey");
            s3SecretKey = prop.getProperty("s3SecretKey");
            BUCKET = prop.getProperty("s3Bucket");
            awsCreds = new BasicAWSCredentials(s3AccessKey,s3SecretKey);
            s3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                    .withRegion(Regions.US_EAST_1)
                    .build();

        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public void uploadFile(String fileName, InputStream inputStream)
    throws AmazonS3Exception, AmazonServiceException, SdkClientException, IOException {

        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.addUserMetadata("Content-Type", "image/png");
            objectMetadata.addUserMetadata("ContentDisposition", "attachement; filename=image.png");
            objectMetadata.addUserMetadata("ACL","public-read");
            s3Client.putObject(BUCKET, fileName, inputStream , objectMetadata);
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
        }
    }

    public String getFileUrl(String bucketName, String fileName)
    throws AmazonS3Exception, AmazonServiceException, SdkClientException, IOException {

        try {
            //return s3Client.getObject(BUCKET,fileName);
            return s3Client.getUrl(BUCKET, fileName).toString();
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
        }
        return "No such bucket or file";
    }

    public String deleteFile(String bucketName, String fileName)
    throws AmazonS3Exception, AmazonServiceException, SdkClientException, IOException {

        try {
            s3Client.deleteObject(bucketName,fileName);
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
        }
        return "No such bucket or file";
    }



}
