package com.entetiies.models;

import javax.validation.constraints.Pattern;

public class RegistrationModel {

    @Pattern(regexp = "^[a-zA-Z]{3,}$")
    private String username;
    @Pattern(regexp = "^[\\w]{6,}$")
    private String password;

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

}
