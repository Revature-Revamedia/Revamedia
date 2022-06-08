/**
 * Author(s): @Everyone
 * Contributor(s):
 * Purpose: Main Driver for Revamedia Application. Starts up spring boot application.
 */
package com.revature.Revamedia;

import com.revature.Revamedia.beans.services.*;
import com.revature.Revamedia.entities.*;
import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserComments;
import com.revature.Revamedia.entities.UserPosts;
import com.revature.Revamedia.entities.UserReplies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

import java.sql.Date;
import java.sql.Timestamp;

@SpringBootApplication(scanBasePackages = "com.revature.Revamedia.beans")
public class RevamediaApplication {
        public static void main(String[] args) {

            ConfigurableApplicationContext context = SpringApplication.run(RevamediaApplication.class, args);

            UserPostsService userPostsService = context.getBean(UserPostsService.class);
            UserService userService = context.getBean(UserService.class);

            User user1 = new User();
            user1.setFirstName("Brandon");
            user1.setUsername("b1");
            user1.setPassword("password");
            userService.save(user1);

            User user2 = new User();
            user2.setFirstName("gio");
            user2.setUsername("g1");
            user2.setPassword("password");
            userService.save(user2);


            UserPosts post1 = new UserPosts();
            post1.setOwnerId(user1);
            post1.setImage("helloWorld.jpeg");
            userPostsService.save(post1);

            UserPosts post2 = new UserPosts();
            post2.setOwnerId(user1);
            post2.setImage("helloWorld2.jpeg");
            userPostsService.save(post2);

            UserPosts post3 = new UserPosts();           
            post3.setOwnerId(user2);
            userPostsService.save(post3);

        }
}




