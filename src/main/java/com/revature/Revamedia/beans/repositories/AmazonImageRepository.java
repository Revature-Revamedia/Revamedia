package com.revature.Revamedia.beans.repositories;

import com.revature.Revamedia.entities.AmazonImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmazonImageRepository extends JpaRepository<AmazonImage, String> {


}
