package com.decsef.demowebsocket.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query(value = "SELECT * FROM chats WHERE to = ?", nativeQuery = true)
    Iterable<Chat> findMessagesByUsername(Long userId);

    @Query(value = "SELECT * FROM chats WHERE from_id = ?1 OR from_id = ?2 AND to_id = ?2 OR to_id = ?1 ORDER BY sent_at", nativeQuery = true)
    Iterable<Chat> findConversationBetweenTwoUsers(Long friendId, Long userId);

    @Query(value = "SELECT count(*) FROM chats WHERE to_id = ? AND read_at IS NULL", nativeQuery = true)
    Long countMessagesNotRead(Long userId);

    @Query(value = "SELECT count(*) FROM chats WHERE from_id = ?1 AND to_id = ?2 AND read_at IS NULL", nativeQuery = true)
    Long countMessagesNotReadBetweenTwoUsers(Long friendId, Long userId);

    @Modifying
    @Query(value = "UPDATE chats SET read_at = now() WHERE from_id = ?1 AND to_id = ?2 AND read_at IS NULL", nativeQuery = true)
    void markAsReadAllMessagesBetweenTwoUsers(Long friendId, Long userId);

}
