package com.decsef.demowebsocket.chat;

import com.decsef.demowebsocket.user.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chats")
@Data
@NoArgsConstructor
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "from_id", referencedColumnName = "id")
    private User from;

    @ManyToOne(optional = false)
    @JoinColumn(name = "to_id", referencedColumnName = "id")
    private User to;

    private String message;

    private LocalDateTime sentAt;

    private LocalDateTime readAt;

}
