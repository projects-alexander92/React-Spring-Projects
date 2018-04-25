package app.models;

import com.google.gson.annotations.Expose;

public class Bio
{
    @Expose
    private int id;
    @Expose
    private String name;
    @Expose
    private String url;
    @Expose
    private String bio;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getUrl()
    {
        return url;
    }

    public void setUrl(String url)
    {
        this.url = url;
    }

    public String getBio()
    {
        return bio;
    }

    public void setBio(String bio)
    {
        this.bio = bio;
    }
}
