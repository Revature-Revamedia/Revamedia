package com.revature.Revamedia.beans.repositories;

import com.revature.Revamedia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    User findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsUserByUsername(String username);

    User findByResetPasswordToken(String token);

    boolean existsByResetPasswordToken(String token);

    User getByUsername(String username);

    @Query(value = "FROM User WHERE lower(username) LIKE :username% OR lower(first_name) LIKE :username% OR lower(last_name) LIKE :username%  ")
    List<User>searchByUsername(@Param("username") String username);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM liked_posts WHERE post_id =:postId", nativeQuery = true)
    void removePostLikes (@Param("postId") Integer postId);

}
