package com.revature.Revamedia.beans.repositories;

import com.revature.Revamedia.entities.ProfilePic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilePicRepository extends JpaRepository<ProfilePic, String> {


}
