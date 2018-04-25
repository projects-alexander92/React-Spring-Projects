package com.services.interfaces;

import com.entetiies.models.bindingModels.CommentBindingModel;
import com.entetiies.models.viewModels.CommentViewModel;

public interface CommentService {
    CommentViewModel addNewComment(CommentBindingModel commentBindingModel, String username);

    void deleteById(long id);
}
