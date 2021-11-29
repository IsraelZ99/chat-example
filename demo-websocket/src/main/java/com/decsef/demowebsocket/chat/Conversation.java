package com.decsef.demowebsocket.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Conversation {

    private String user;

    private String friend;

}
