package com.revature.Revamedia.dtos;

public class UserFollowDto {

    private Integer followerId;
    private Integer followedId;

    public UserFollowDto() {
    }

    public UserFollowDto(Integer followerId, Integer followedId) {
        this.followerId = followerId;
        this.followedId = followedId;
    }

    public Integer getFollowerId() {
        return followerId;
    }

    public void setFollowerId(Integer followerId) {
        this.followerId = followerId;
    }

    public Integer getFollowedId() {
        return followedId;
    }

    public void setFollowedId(Integer followedId) {
        this.followedId = followedId;
    }
}