package com.decsef.demowebsocket.chat;

import com.decsef.demowebsocket.user.entities.User;
import com.decsef.demowebsocket.user.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;

    public Iterable<Chat> readAllMessagesFromUser(String username){
        User user = userService.findUserByUsername(username);
        return chatRepository.findMessagesByUsername(user.getId());
    }

    public Iterable<Chat> readAllMessagesBetweenTwoUsers(String user, String friend){
        User userInformation = userService.findUserByUsername(user);
        User friendInformation = userService.findUserByUsername(friend);
        return chatRepository.findConversationBetweenTwoUsers(friendInformation.getId(), userInformation.getId());
    }

    public Chat saveMessage(Chat message){
        message.setSentAt(LocalDateTime.now());
        return chatRepository.save(message);
    }

    public Long readMessagesNotReadByUsername(String username){
        User user = userService.findUserByUsername(username);
        return chatRepository.countMessagesNotRead(user.getId());
    }

    public Long markAsReadAllConversationBetweenTwoUsers(String user, String friend){
        User userInformation = userService.findUserByUsername(user);
        User friendInformation = userService.findUserByUsername(friend);
        chatRepository.markAsReadAllMessagesBetweenTwoUsers(friendInformation.getId(), userInformation.getId());
        return chatRepository.countMessagesNotReadBetweenTwoUsers(friendInformation.getId(), userInformation.getId());
    }



}
