package com.controllers;

import com.entetiies.models.RegistrationModel;
import com.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "register")
    public ResponseEntity register(@Valid @RequestBody RegistrationModel registrationModel, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }
        this.userService.register(registrationModel);
        return new ResponseEntity<>("Successfully Registered", HttpStatus.OK);
    }

}
