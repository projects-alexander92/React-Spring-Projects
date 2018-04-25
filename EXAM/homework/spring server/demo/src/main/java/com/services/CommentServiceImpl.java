package com.services;

import com.entetiies.ORM.Comment;
import com.entetiies.models.bindingModels.CommentBindingModel;
import com.entetiies.models.viewModels.CommentViewModel;
import com.repositories.CommentRepository;
import com.repositories.LinkRepository;
import com.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CommentServiceImpl implements com.services.interfaces.CommentService {
    private final ModelMapper modelMapper;
    private final LinkRepository linkRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommentServiceImpl(ModelMapper modelMapper, LinkRepository linkRepository, CommentRepository commentRepository, UserRepository userRepository)
    {
        this.modelMapper = modelMapper;
        this.linkRepository = linkRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CommentViewModel addNewComment(CommentBindingModel commentBindingModel, String username)
    {
        Comment comment = new Comment();
        comment.setUser(this.userRepository.findByUsername(username));
        comment.setLink(this.linkRepository.findOne(commentBindingModel.getLinkId()));
        comment.setValue(commentBindingModel.getCommentValue());
        comment.setSubmissionDate(new Date());
        comment = this.commentRepository.save(comment);
        CommentViewModel commentViewModel = this.modelMapper.map(comment, CommentViewModel.class);
        commentViewModel.setUsername(comment.getUser().getUsername());
        return commentViewModel;
    }

    @Override
    public void deleteById(long id)
    {
        this.commentRepository.delete(id);
    }
}
