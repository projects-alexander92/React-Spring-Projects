package com.controllers;

import com.entetiies.models.bindingModels.LinkBindingModel;
import com.entetiies.models.viewModels.LinkDetailsViewModel;
import com.entetiies.models.viewModels.LinkViewModel;
import com.services.interfaces.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LinkController {
    private final LinkService linkService;

    @Autowired
    public LinkController(LinkService linkService) {
        this.linkService = linkService;
    }

    @PostMapping(value = "/links/add")
    public ResponseEntity addLink(@Valid @RequestBody LinkBindingModel linkBindingModel, BindingResult bindingResult, Principal principal) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }
        this.linkService.saveLink(linkBindingModel, principal.getName());
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/links/all")
    public ResponseEntity getAllLinks() {
        List<LinkViewModel> allLinks = this.linkService.getAllLinks();
        return new ResponseEntity<>(allLinks, HttpStatus.OK);
    }

    @GetMapping("/links/details/{id}")
    public ResponseEntity getDetailedLink(@PathVariable long id) {
        LinkDetailsViewModel link = this.linkService.getLinkDetails(id);
        return new ResponseEntity<>(link, HttpStatus.OK);
    }

    @DeleteMapping("/links/delete/{id}")
    public ResponseEntity deleteLink(@PathVariable long id) {
        this.linkService.deleteLink(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/links/by-username")
    public ResponseEntity getAllLinksByUsername(Principal principal) {
        List<LinkViewModel> allLinksByUsername = this.linkService.getAllLinksByUsername(principal.getName());
        return new ResponseEntity<>(allLinksByUsername, HttpStatus.OK);
    }

    @PutMapping("/links/edit/{id}")
    public ResponseEntity editLink(@Valid @RequestBody LinkBindingModel linkBindingModel, BindingResult bindingResult, @PathVariable long id) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }
        this.linkService.editLink(linkBindingModel, id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
