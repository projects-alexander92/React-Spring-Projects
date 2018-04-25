package com.controllers;

import com.entetiies.models.bindingModels.CommentBindingModel;
import com.entetiies.models.bindingModels.LinkBindingModel;
import com.entetiies.models.viewModels.CommentViewModel;
import com.services.CommentServiceImpl;
import com.services.interfaces.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    //TODO ADD VALIDATION
    @PostMapping("/comment/add")
    public ResponseEntity submitComment(@Valid @RequestBody CommentBindingModel commentBindingModel, BindingResult bindingResult, Principal principal) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }
        CommentViewModel commentViewModel = this.commentService.addNewComment(commentBindingModel, principal.getName());
        return new ResponseEntity<>(commentViewModel, HttpStatus.OK);
    }

    @DeleteMapping("/comment/delete/{id}")
    public ResponseEntity deleteComment(@PathVariable long id) {
        this.commentService.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
