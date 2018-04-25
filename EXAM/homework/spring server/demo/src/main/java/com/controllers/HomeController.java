package com.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/*Контролер за тестване на връзка между Spring и Angular/React/Postman и т.н.*/
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController
{

    //трябва да върне "getHome"
    @GetMapping("/home")
    private String getHome()
    {
        return "getHome";
    }

    //трябва да върне 403, ако няма token-
    @GetMapping("/resource")
    private String gertResurce()
    {
        return "getHome";
    }
}
