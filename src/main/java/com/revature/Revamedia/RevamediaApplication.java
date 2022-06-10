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
            context.start();
        }
}
