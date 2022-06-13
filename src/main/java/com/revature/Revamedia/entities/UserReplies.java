/**
 *  Author(s): @Brandon Le, @Tony Henderson
 *  Contributor(s):
 *  Purpose:
 */
package com.revature.Revamedia.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "user_replies", schema = _SchemaName.schemaName)
public class UserReplies implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private Integer replyId;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "owner_id", referencedColumnName = "user_id")
    private User ownerId;

    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "comment_id", referencedColumnName = "comment_id")
    private UserComments commentId;

    @Column(name = "reply_message", length = 500)
    private String replyMessage;



    @Column(name = "giphyUrl")
    private String giphyUrl;

    @Column(name = "reply_giphy_Url")
    private String replyGiphyUrl;

    @Column(name = "date_created")
    private Timestamp dateCreated;

    public UserReplies() {
    }

    public UserReplies(Integer replyId, User ownerId, UserComments commentId, String replyMessage, Timestamp dateCreated,
            String replyGiphyUrl) {
        this.replyId = replyId;
        this.ownerId = ownerId;
        this.commentId = commentId;
        this.replyMessage = replyMessage;
        this.dateCreated = dateCreated;
        this.replyGiphyUrl = replyGiphyUrl;
    }

    public Integer getReplyId() {
        return replyId;
    }

    public void setReplyId(Integer replyId) {
        this.replyId = replyId;
    }

    public User getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(User ownerId) {
        this.ownerId = ownerId;
    }

    public UserComments getCommentId() {
        return commentId;
    }

    public void setCommentId(UserComments commentId) {
        this.commentId = commentId;
    }

    public String getMessage() {
        return replyMessage;
    }

    public void setMessage(String message) {
        this.replyMessage = message;
    }

    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getGiphyUrl() {
        return giphyUrl;
    }

    public void setGiphyUrl(String giphyUrl) {
        this.giphyUrl = giphyUrl;
    }

    @Override
    public String toString() {
        return "UserReplies{" +

                "replyId=" + replyId +
                ", ownerId=" + ownerId +
                ", message='" + replyMessage + '\'' +
                ", giphyUrl=" + replyGiphyUrl +
                ", dateCreated='" + dateCreated + '\'' +
                '}';
    }

}
