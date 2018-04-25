package com.services.interfaces;

import com.entetiies.models.bindingModels.LinkBindingModel;
import com.entetiies.models.viewModels.LinkDetailsViewModel;
import com.entetiies.models.viewModels.LinkViewModel;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LinkService {

    void saveLink(LinkBindingModel linkBindingModel, String username);

    @Transactional
    List<LinkViewModel> getAllLinks();

    LinkDetailsViewModel getLinkDetails(long id);

    @Transactional
    void deleteLink(long id);

    List<LinkViewModel> getAllLinksByUsername(String username);

    @Transactional
    void editLink(LinkBindingModel linkBindingModel, long id);
}
