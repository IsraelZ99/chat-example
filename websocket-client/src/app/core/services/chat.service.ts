import { Injectable } from '@angular/core';
import { first, map, Observable, Subject } from 'rxjs';
import { Chat } from '../models/Chat';
import { SocketClientService } from './socket-client.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socketClient: SocketClientService) { }

  public findConversationBetweenTwoUsers(user: string, friend: string): Observable<Chat[]> {
    return this.socketClient.onMessage(`/chat/${user}/${friend}/conversation`)
      .pipe(first());
  }

  public sendMessage(message: Chat): void {
    this.socketClient.send("/chat/send", message);
  }

  public retrieveNewMessageIncoming(): Observable<Chat> {
    return this.socketClient.onMessage("/user/chat/incoming");
  }

  public increaseMessagesNotRead(): Observable<number> {
    return this.socketClient.onPlainMessage("/user/chat/incoming/no-read").pipe(map(newMessage => parseInt(newMessage)));
  }

  public retrieveMessageSent(): Observable<Chat> {
    return this.socketClient.onMessage("/user/chat/outgoing");
  }

  public getCountMessagesNotRead(username: string): Observable<number> {
    return this.socketClient.onPlainMessage(`/chat/${username}/no-read/get`).pipe(first(), map(count => parseInt(count)));
  }

  public markAsReadConversation(user: string, friend: string) {
    return this.socketClient.send(`/chat/${user}/${friend}/read`, {});
  }

  public retrieveCountMessagesNotRead(): Observable<number> {
    return this.socketClient.onPlainMessage(`/user/chat/no-read/set`).pipe(map(count => parseInt(count)));
  }

}
