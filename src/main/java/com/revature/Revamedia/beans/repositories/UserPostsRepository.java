package com.revature.Revamedia.beans.repositories;

import com.revature.Revamedia.entities.UserPosts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPostsRepository extends JpaRepository<UserPosts, Integer> {

    @Query("FROM UserPosts WHERE ownerId= :ownerId")
    List<UserPosts> getUserPostsByUser(@Param("ownerId") Integer id);

    @Query(value="SELECT DISTINCT up.post_id, up.date_created, up.image, up.message, up.youtube_link, up.owner_id, " +
            "uf.followed_id, " +
            "u.user_id, concat(u.first_name, u.last_name) as user_name, " +
            "uc.comment_id, uc.giphy_url, uc.comment_message, uc.comment_owner_id, ur.reply_message, ur.reply_giphy_url, ur.reply_owner_id " +
            "from user_posts up " +
            "join user_follows uf " +
            "on uf.followed_id = owner_id " +
            "join users u " +
            "on u.user_id = uf.followed_id " +
            "full join user_comments uc " +
            "on uc.post_id = up.post_id " +
            "full join user_replies ur " +
            "on ur.comment_id = uc.comment_id " +
            "where uf.follower_id = :followerIdParam " +
            "order by date_created", nativeQuery = true)
    List<Object> getUserFeed(@Param("followerIdParam") Integer id);

}
