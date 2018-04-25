package com.entetiies.models.bindingModels;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class LinkBindingModel
{
    @Size(min = 5)
    private String title;
    @Pattern(regexp = "^http.+$")
    private String linkUrl;
    private String imageUrl;
    private String optionalComment;

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

    public String getOptionalComment()
    {
        return optionalComment;
    }

    public void setOptionalComment(String optionalComment)
    {
        this.optionalComment = optionalComment;
    }
}
