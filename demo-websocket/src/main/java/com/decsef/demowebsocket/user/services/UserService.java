package com.decsef.demowebsocket.user.services;

import com.decsef.demowebsocket.user.entities.User;
import com.decsef.demowebsocket.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User findUserByUsername(String user) {
        return userRepository.findByUsername(user)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with user: " + user));
    }

}
