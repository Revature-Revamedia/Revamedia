package com.revature.Revamedia.beans.repositories;

import com.revature.Revamedia.entities.User;
import com.revature.Revamedia.entities.UserFollows;
import com.revature.Revamedia.entities.UserPosts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface UserFollowsRepository extends JpaRepository<UserFollows, Integer> {

}
