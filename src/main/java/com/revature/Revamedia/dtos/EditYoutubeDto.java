package com.revature.Revamedia.dtos;

import java.sql.Timestamp;

public class EditYoutubeDto {

    private Integer postId;
    private String message;
    private String youtubeLink;

    public EditYoutubeDto(String message, String youtubeLink) {
        this.message = message;
        this.youtubeLink = youtubeLink;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
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
}
