package com.revature.Revamedia.dtos;

import java.sql.Timestamp;

public class AddGroupPostDto {

    private Integer groupId;
    private Integer userId;
    private String message;
    private String image;
    private Timestamp dateCreated;

    public AddGroupPostDto(Integer groupId, Integer userId, String message, String image, Timestamp dateCreated) {
        this.groupId = groupId;
        this.userId = userId;
        this.message = message;
        this.image = image;
        this.dateCreated = dateCreated;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }
}
