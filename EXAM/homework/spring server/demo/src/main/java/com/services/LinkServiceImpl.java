package com.services;

import com.entetiies.ORM.Comment;
import com.entetiies.ORM.Link;
import com.entetiies.ORM.User;
import com.entetiies.models.bindingModels.LinkBindingModel;
import com.entetiies.models.viewModels.CommentViewModel;
import com.entetiies.models.viewModels.LinkDetailsViewModel;
import com.entetiies.models.viewModels.LinkViewModel;
import com.repositories.CommentRepository;
import com.repositories.LinkRepository;
import com.repositories.UserRepository;
import com.services.interfaces.LinkService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LinkServiceImpl implements LinkService {
    private final ModelMapper modelMapper;
    private final LinkRepository linkRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Autowired
    public LinkServiceImpl(ModelMapper modelMapper, LinkRepository linkRepository, CommentRepository commentRepository, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.linkRepository = linkRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void saveLink(LinkBindingModel linkBindingModel, String username) {
        Link link = this.modelMapper.map(linkBindingModel, Link.class);
        link.setSubmissionDate(new Date());
        User user = this.userRepository.findByUsername(username);
        link.setUser(user);
        link = this.linkRepository.save(link);
        String optionalComment = linkBindingModel.getOptionalComment();
        if (optionalComment != null && !optionalComment.equals("")) {
            Comment comment = new Comment();
            comment.setValue(optionalComment);
            comment.setSubmissionDate(new Date());
            comment.setLink(link);
            comment.setUser(user);
            this.commentRepository.save(comment);
        }

    }

    @Override
    @Transactional
    public List<LinkViewModel> getAllLinks() {
        return this.linkRepository.getAllBy().stream().map(e -> {
            LinkViewModel linkViewModel = this.modelMapper.map(e, LinkViewModel.class);
            linkViewModel.setUsername(e.getUser().getUsername());
            return linkViewModel;
        }).collect(Collectors.toList());
    }

    @Override
    public LinkDetailsViewModel getLinkDetails(long id) {
        Link link = this.linkRepository.findOne(id);
        LinkDetailsViewModel linkViewModel = this.modelMapper.map(link, LinkDetailsViewModel.class);
        linkViewModel.setUsername(link.getUser().getUsername());
        List<CommentViewModel> comments = this.commentRepository.getAllByLinksWithId(id).stream().map(e ->
        {
            CommentViewModel commentViewModel = this.modelMapper.map(e, CommentViewModel.class);
            commentViewModel.setUsername(e.getUser().getUsername());
            return commentViewModel;
        }).collect(Collectors.toList());
        linkViewModel.setComments(comments);
        return linkViewModel;
    }

    @Override
    @Transactional
    public void deleteLink(long id) {
        this.commentRepository.deleteByLink_Id(id);
        this.linkRepository.delete(id);
    }

    @Override
    public List<LinkViewModel> getAllLinksByUsername(String username) {
        return this.linkRepository.getAllByUsername(username).stream().map(e -> {
            LinkViewModel linkViewModel = this.modelMapper.map(e, LinkViewModel.class);
            linkViewModel.setUsername(e.getUser().getUsername());
            return linkViewModel;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void editLink(LinkBindingModel linkBindingModel, long id) {
        Link one = this.linkRepository.findOne(id);
        one.setTitle(linkBindingModel.getTitle());
        one.setLinkUrl(linkBindingModel.getLinkUrl());
        one.setImageUrl(linkBindingModel.getImageUrl());
        if (linkBindingModel.getOptionalComment() != null && !linkBindingModel.getOptionalComment().equals("")) {
            Comment comment = new Comment();
            comment.setValue(linkBindingModel.getOptionalComment());
            comment.setSubmissionDate(new Date());
            comment.setLink(one);
            comment.setUser(one.getUser());
            this.commentRepository.save(comment);
        } else {
            this.linkRepository.save(one);
        }

    }
}
