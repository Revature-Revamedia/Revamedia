package com.revature.Revamedia.entities;

/**
 * Author(s): @Brandon Le, @Tony Henderson
 * Contributor(s):
 * Purpose:
 */

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user_comments", schema = _SchemaName.schemaName)
public class UserComments implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;


    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "comment_owner_id", referencedColumnName = "user_id")
    private User commentOwnerId;


    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "post_id", referencedColumnName = "post_id")
    private UserPosts postId;

//    @JsonIgnore
    @OneToMany(mappedBy = "commentId", cascade = CascadeType.ALL)
    private List<UserReplies> replies;

    @Column(name = "comment_message", length = 500)
    private String commentMessage;

    @Column(name = "date_created")
    private Timestamp dateCreated;

    @Column(name = "giphyUrl")
    private String giphyUrl;

    public UserComments() {
        this.replies = new ArrayList<>();
    }

    public UserComments(Integer commentId, User commentOwnerId, UserPosts postId, List<UserReplies> replies, String commentMessage,
            Timestamp dateCreated, String giphyUrl) {

        this.commentId = commentId;
        this.commentOwnerId = commentOwnerId;
        this.postId = postId;
        this.replies = replies;
        this.commentMessage = commentMessage;
        this.dateCreated = dateCreated;
        this.giphyUrl = giphyUrl;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public User getOwnerId() {
        return commentOwnerId;
    }

    public void setOwnerId(User ownerId) {
        this.commentOwnerId = ownerId;
    }

    public UserPosts getPostId() {
        return postId;
    }

    public void setPostId(UserPosts postId) {
        this.postId = postId;
    }

    public String getMessage() {
        return commentMessage;
    }

    public void setMessage(String message) {
        this.commentMessage = message;
    }

    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }

    public List<UserReplies> getReplies() {
        return replies;
    }

    public void setReplies(List<UserReplies> replies) {
        this.replies = replies;
    }

    public void addReply(UserReplies reply) {
        this.replies.add(reply);
    }

    public void removeReply(UserReplies reply) {
        this.replies.remove(reply);
    }

    public String getGiphyUrl() {
        return giphyUrl;
    }

    public void setGiphyUrl(String giphyUrl) {
        this.giphyUrl = giphyUrl;
    }

    @Override
    public String toString() {
        return "UserComments{" +
                "commentId=" + commentId +
                ", ownerId=" + commentOwnerId +
                ", replies=" + replies +
                ", message='" + commentMessage + '\'' +
                ", giphyUrl=" + giphyUrl +
                ", dateCreated='" + dateCreated + '\'' +
                '}';
    }
}
