package com.revature.Revamedia.dtos;

import java.sql.Timestamp;

public class shareYoutubeDto {

    private Integer userId;
    private String message;
    private String youtubeLink;
    private Timestamp dateCreated;

    public shareYoutubeDto(Integer userId, String message, String youtubeLink) {
        this.userId = userId;
        this.message = message;
        this.youtubeLink = youtubeLink;
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

    public String getYoutubeLink() {
        return youtubeLink;
    }

    public void setYoutubeLink(String youtubeLink) {
        this.youtubeLink = youtubeLink;
    }

    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }
}
