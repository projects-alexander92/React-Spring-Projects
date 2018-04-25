package com.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class PokemonAllrdyExistsException extends RuntimeException
{
    public PokemonAllrdyExistsException(String message)
    {
        super(message);
    }
}
