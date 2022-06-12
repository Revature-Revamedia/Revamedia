package com.revature.Revamedia.beans.repositories;

import com.revature.Revamedia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    User findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsUserByUsername(String username);

    User findByResetPasswordToken(String token);

    boolean existsByResetPasswordToken(String token);

    User getByUsername(String username);


}
