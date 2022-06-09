package com.revature.Revamedia.beans.repositories;

import com.revature.Revamedia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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

    @Query(value = "FROM User WHERE username LIKE :username% ")
    List<User> searchByUsername(@Param("username") String username);

}
