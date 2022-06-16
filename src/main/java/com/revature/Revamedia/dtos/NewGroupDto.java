package com.revature.Revamedia.dtos;

import com.revature.Revamedia.entities.User;

import java.sql.Timestamp;

public class NewGroupDto {

    private Integer ownerId;

    private String title;

    private String description;

    private String imageUrl;

    public NewGroupDto() {}

    public NewGroupDto(Integer ownerId, String title, String description, String imageUrl) {
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
