package com.revature.Revamedia.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Entity
@JsonIgnoreProperties
@Table(name = "amazon_images", schema = _SchemaName.schemaName)
public class AmazonImage implements Serializable {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amazon_user_image_id")
    private Integer amazonUserImageId;

    @Column(name = "image_url")
    private String imageUrl;

    public AmazonImage() {
    }

    public AmazonImage(Integer amazonUserImageId, String imageUrl) {
        this.amazonUserImageId = amazonUserImageId;
        this.imageUrl = imageUrl;
    }

    public Integer getAmazonUserImageId() {
        return amazonUserImageId;
    }

    public void setAmazonUserImageId(Integer amazonUserImageId) {
        this.amazonUserImageId = amazonUserImageId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}