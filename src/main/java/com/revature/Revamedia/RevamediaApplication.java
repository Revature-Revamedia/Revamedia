/**
 * Author(s): @Everyone
 * Contributor(s):
 * Purpose: Main Driver for Revamedia Application. Starts up spring boot application.
 */

package com.revature.Revamedia;

import com.revature.Revamedia.beans.services.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication(scanBasePackages = "com.revature.Revamedia.beans")
public class RevamediaApplication {
        public static void main(String[] args) {

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

                //AmazonClientService amazonClientService = context.getBean(AmazonClientService.class);
                //s3Service.createBucket("test bucket");
        }
}


