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

                UserPostsService userPostsService = context.getBean(UserPostsService.class);
                UserService userService = context.getBean(UserService.class);
                UserCommentsService userCommentsService = context.getBean(UserCommentsService.class);
                UserRepliesService userRepliesService = context.getBean(UserRepliesService.class);
                UserEventsService userEventsService = context.getBean(UserEventsService.class);
                UserGroupsService userGroupsService = context.getBean(UserGroupsService.class);
                UserConversationsService userConversationsService = context.getBean(UserConversationsService.class);
                UserMessagesService userMessagesService = context.getBean(UserMessagesService.class);
                UserFollowsService userFollowsService = context.getBean(UserFollowsService.class);

                // KYLE
                User kyle = new User();
                kyle.setFirstName("Kyle");
                kyle.setLastName("Plummer");
                kyle.setUsername("KPlummer");
                kyle.setEmail("KPlummer@gmail.com");
                kyle.setPassword("Password1!");
                kyle.setProfilePicture("https://randomuser.me/api/portraits/lego/1.jpg");
                kyle.setDateCreated(new Timestamp(System.currentTimeMillis()));
                userService.save(kyle);

                // Leo
                User leo = new User();
                leo.setFirstName("Leonel");
                leo.setLastName("Barrientos");
                leo.setUsername("leoBarrientos02");
                leo.setEmail("leoBarrientos02@gmail.com");
                leo.setPassword("Password1!");
                leo.setProfilePicture(
                        "https://avatars.githubusercontent.com/u/77355023?s=400&u=149ab70c25dbfa4dbfb3afc5c5c9eabefe0f7c7c&v=4");
                leo.setDateCreated(new Timestamp(System.currentTimeMillis()));
                userService.save(leo);

                // KYLE POST
                UserPosts post1 = new UserPosts();
                post1.setOwnerId(kyle);
                post1.setImage("https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
                post1.setMessage("I Still can't believe i was able to see this view in person.");
                post1.setDateCreated(new Timestamp(System.currentTimeMillis()));
                kyle.addPost(post1);

                userPostsService.save(post1);
                userService.update(kyle);

                // KYLE POST2
                UserPosts post2 = new UserPosts();
                post2.setOwnerId(kyle);
                post2.setImage("https://images.pexels.com/photos/3601450/pexels-photo-3601450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
                post2.setMessage("I'm an island boy.");
                post2.setDateCreated(new Timestamp(System.currentTimeMillis()));
                kyle.addPost(post2);

                userPostsService.save(post2);
                userService.update(kyle);

                // testing comments
                UserComments comment1 = new UserComments();
                comment1.setOwnerId(leo);
                comment1.setPostId(post2);
                comment1.setMessage("Awesome picture bro, i hope you enjoyed your time off.");
                comment1.setDateCreated(new Timestamp(System.currentTimeMillis()));
                comment1.setGiphyUrl(
                        "https://media1.giphy.com/media/fpWxOVANhGVkwCFJor/giphy.gif?cid=ecf05e47capt30np9brv7c6kv0f0m9wyxgm0vqf89tdtj69w&rid=giphy.gif&ct=ts");
                userCommentsService.save(comment1);
                post2.addComment(comment1);
                userPostsService.save(post2);

                // testing replies
                UserReplies reply1 = new UserReplies();
                reply1.setOwnerId(kyle);
                reply1.setCommentId(comment1);
                reply1.setMessage(
                        "Thank you, but i believe you should be getting ready for your interview. Good luck!!");
                reply1.setDateCreated(new Timestamp(System.currentTimeMillis()));
                reply1.setGiphyUrl(
                        "https://media0.giphy.com/media/12XDYvMJNcmLgQ/giphy.gif?cid=ecf05e47wqxq3jqldfwi6vb0xt0fkvpf3k9w0lpp5uq24lyj&rid=giphy.gif&ct=g");
                comment1.addReply(reply1);
                userRepliesService.save(reply1);
                comment1.addReply(reply1);
                userCommentsService.save(comment1);
                userPostsService.save(post2);

                // Leo Post
                UserPosts post3 = new UserPosts();
                post3.setOwnerId(leo);
                post3.setImage("https://images.pexels.com/photos/5750823/pexels-photo-5750823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
                post3.setMessage("This week i am going to start training in a boxing gym. I hope i can get better at self defense.");
                post3.setDateCreated(new Timestamp(System.currentTimeMillis()));
                leo.addPost(post3);
                userPostsService.save(post3);
                userService.update(leo);

                //Follows
                UserFollows follow1 = new UserFollows();
                follow1.setFollowedId(userService.getUserById(2));
                follow1.setFollowerId(userService.getUserById(1));
                follow1.setDateFollowed(new Timestamp(System.currentTimeMillis()));
                leo.addFollower(follow1);
                userFollowsService.save(follow1);
                
        }
}