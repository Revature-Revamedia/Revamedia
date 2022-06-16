package com.revature.Revamedia.dtos;

public class UpdateGroupDto {

    private Integer groupId;

    private String title;

    private String description;

    private String imageUrl;

    public UpdateGroupDto() {}

    public UpdateGroupDto(Integer groupId, String title, String description, String imageUrl) {
        this.groupId = groupId;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
}
