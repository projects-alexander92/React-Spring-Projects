package com.entetiies.models.bindingModels;

import javax.validation.constraints.Size;

public class CommentBindingModel
{
    @Size(min = 5)
    private String commentValue;
    private long linkId;

    public String getCommentValue()
    {
        return commentValue;
    }

    public void setCommentValue(String commentValue)
    {
        this.commentValue = commentValue;
    }

    public long getLinkId()
    {
        return linkId;
    }

    public void setLinkId(long linkId)
    {
        this.linkId = linkId;
    }
}
