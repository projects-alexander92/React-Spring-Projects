package com.entetiies.models.viewModels;

import com.entetiies.ORM.Comment;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LinkDetailsViewModel
{
    private Long id;
    private String title;
    private String linkUrl;
    private String imageUrl;
    private Date submissionDate;
    private String username;
    private List<CommentViewModel> comments;

    public LinkDetailsViewModel()
    {
        this.comments = new ArrayList<>();
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getLinkUrl()
    {
        return linkUrl;
    }

    public void setLinkUrl(String linkUrl)
    {
        this.linkUrl = linkUrl;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl)
    {
        this.imageUrl = imageUrl;
    }

    public Date getSubmissionDate()
    {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate)
    {
        this.submissionDate = submissionDate;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public List<CommentViewModel> getComments()
    {
        return comments;
    }

    public void setComments(List<CommentViewModel> comments)
    {
        this.comments = comments;
    }
}
