package com.services;

import com.entetiies.ORM.Authority;
import com.entetiies.ORM.User;
import com.entetiies.models.RegistrationModel;
import com.exceptions.UserAllrdyExistsException;
import com.exceptions.UserNotFoundException;
import com.repositories.AuthorityRepository;
import com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService
{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = this.userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UserNotFoundException("User not found");
        }

        return user;
    }

    public void register(RegistrationModel registrationModel)
    {
        if (this.userRepository.findByUsername(registrationModel.getUsername()) != null)
        {
            throw new UserAllrdyExistsException("Username all Ready exists in DB");
        }
        User user = new User();
        user.setUsername(registrationModel.getUsername());
        user.setPassword(passwordEncoder.encode(registrationModel.getPassword()));
        Authority authority = this.authorityRepository.findByAuthority("ROLE_USER");
        user.getAuthorities().add(authority);
        this.userRepository.save(user);
    }
}
