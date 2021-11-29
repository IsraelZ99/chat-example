package com.decsef.demowebsocket.user.controllers;

import com.decsef.demowebsocket.user.entities.User;
import com.decsef.demowebsocket.user.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @SubscribeMapping("/users/get")
    public Iterable<User> findAllUsers(){
        return userService.getAllUsers();
    }

}
