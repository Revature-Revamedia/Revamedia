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

    @Query(value="select distinct * "+
    "from user_posts up "+
    "join user_follows uf "+
    "on uf.followed_id = owner_id "+
    "join users u "+
    "on u.user_id = uf.followed_id "+
    "order by up.date_created", nativeQuery = true)
    List<UserPosts> getUserFeed(@Param("followerIdParam") Integer id);

}
