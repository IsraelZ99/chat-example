package com.decsef.demowebsocket.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @SubscribeMapping("/chat/{username}/get")
    public Iterable<Chat> getAllMessagesByUsername(@DestinationVariable String username, Principal principal){
        return chatService.readAllMessagesFromUser(username);
    }

    @SubscribeMapping("/chat/{user}/{friend}/conversation")
    public Iterable<Chat> getConversationBetweenTwoUsers(@DestinationVariable String user, @DestinationVariable String friend, Principal principal){
        return chatService.readAllMessagesBetweenTwoUsers(user, friend);
    }

    @MessageMapping("/chat/send")
    @SendToUser("/chat/outgoing")
    public Chat sendMessageToUser(Chat messageIncoming){
        Chat newMessage = chatService.saveMessage(messageIncoming);
        simpMessagingTemplate.convertAndSendToUser(newMessage.getTo().getUsername(), "/chat/incoming", newMessage);
        simpMessagingTemplate.convertAndSendToUser(newMessage.getTo().getUsername(), "/chat/incoming/no-read", 1);
        return newMessage;
    }

    @SubscribeMapping("/chat/{username}/no-read/get")
    public Long messagesNoReadByUsername(@DestinationVariable String username, Principal principal){
        return chatService.readMessagesNotReadByUsername(username);
    }

    @MessageMapping("/chat/{user}/{friend}/read")
    @SendToUser("/chat/no-read/set")
    public Long markConversationBetweenTwoUsersAsRead(@DestinationVariable String user, @DestinationVariable String friend){
        return chatService.markAsReadAllConversationBetweenTwoUsers(user, friend);
    }

}
