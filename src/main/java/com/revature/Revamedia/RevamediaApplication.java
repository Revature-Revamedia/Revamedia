/**
 * Author(s): @Everyone
 * Contributor(s):
 * Purpose: Main Driver for Revamedia Application. Starts up spring boot application.
 */

package com.revature.Revamedia;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.google.zxing.WriterException;
import com.revature.Revamedia.beans.services.*;
import com.revature.Revamedia.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@SpringBootApplication(scanBasePackages = "com.revature.Revamedia.beans")
public class RevamediaApplication {

        public static void main(String[] args) throws IOException, WriterException {

                ConfigurableApplicationContext context = SpringApplication.run(RevamediaApplication.class, args);
                UserPostsService userPostsService = context.getBean(UserPostsService.class);
                UserService userService = context.getBean(UserService.class);
                UserCommentsService userCommentsService = context.getBean(UserCommentsService.class);
                UserRepliesService userRepliesService = context.getBean(UserRepliesService.class);
                UserEventsService userEventsService = context.getBean(UserEventsService.class);
                UserGroupsService userGroupsService = context.getBean(UserGroupsService.class);
                UserConversationsService userConversationsService = context.getBean(UserConversationsService.class);
                UserMessagesService userMessagesService = context.getBean(UserMessagesService.class);
                SendEmailService sendEmailService = context.getBean(SendEmailService.class);
                FileUploadService fileUploadService = context.getBean(FileUploadService.class);
                TwoFactorAuthentication twoFactorAuthentication = context.getBean(TwoFactorAuthentication.class);

//                String email = "revamedia@gmail.com";
//                String companyName = "Revamedia";
//                TwoFactorAuthentication twoFactorAuthentication = new TwoFactorAuthentication();
//                String barCodeUrl = twoFactorAuthentication.getGoogleAuthenticatorBarCode(secretKey, email, companyName);
//                ByteArrayOutputStream out = twoFactorAuthentication.createQRCode(barCodeUrl,400,400);
//                ByteArrayInputStream inStream = new ByteArrayInputStream(out.toByteArray());
//                fileUploadService.uploadFile("image.png",inStream);
//
//
//                User user = userService.getUserById(1);
//                String secretKey = user.getSecretTwoFactorKey();
//                String lastCode = null;
//                while (true) {
//                        String code = twoFactorAuthentication.getTOTPCode(secretKey);
//                        if (!code.equals(lastCode)) {
//                                System.out.println(code);
//                        }
//                        lastCode = code;
//                        try {
//                                Thread.sleep(1000);
//                        } catch (InterruptedException e) {
//
//                        }
//                }
        }
}
