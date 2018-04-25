package com.entetiies.models;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class RegistrationModel {

    @Size(min = 5)
    private String username;
    @Size(min = 8)
    private String password;
    @Pattern(regexp = "^\\S+@\\S+$")
    private String email;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }
}
