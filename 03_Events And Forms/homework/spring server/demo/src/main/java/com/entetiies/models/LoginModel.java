package com.entetiies.models;

public class LoginModel {

    private String username;

    private String password;

    private Boolean isRememberMe;

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

    public Boolean getIsRememberMe() {
        return isRememberMe;
    }

    public void setIsRememberMe(Boolean rememberMe) {
        isRememberMe = rememberMe;
    }
}
