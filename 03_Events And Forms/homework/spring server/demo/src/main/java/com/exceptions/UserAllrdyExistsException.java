package com.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.RESET_CONTENT)
public class UserAllrdyExistsException extends RuntimeException
{
    public UserAllrdyExistsException(String message)
    {
        super(message);
    }
}
