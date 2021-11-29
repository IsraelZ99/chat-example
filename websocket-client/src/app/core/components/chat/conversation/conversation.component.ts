import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdComponent } from 'app/core/models/AdComponent';
import { Chat } from 'app/core/models/Chat';
import { User } from 'app/core/models/User';
import { ChatService } from 'app/core/services/chat.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy, AdComponent {

  @Input() data: any;
  @Output() comeBack;
  public user: string;
  public friend?: string;
  public messages: Chat[];
  public sendMessageForm: FormGroup;
  private unsubscribeSubject: Subject<void>;

  constructor(private chatService: ChatService) {
    this.comeBack = new EventEmitter();
    this.user = environment.user.username;
    this.messages = [];
    this.unsubscribeSubject = new Subject<void>();
    this.sendMessageForm = new FormGroup({
      from: new FormControl(''),
      to: new FormControl(''),
      message: new FormControl(''),
      sentAt: new FormControl(null)
    });
  }

  public ngOnInit(): void {
    const friend: User = this.data;
    this.friend = this.data.username;

    this.chatService.findConversationBetweenTwoUsers(environment.user.username, friend.username)
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(messages => {
        this.messages = messages;
        this.chatService.markAsReadConversation(environment.user.username, friend.username);
      });

    this.chatService.retrieveNewMessageIncoming()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(messageIncoming => {
        this.messages.push(messageIncoming);
        this.chatService.markAsReadConversation(environment.user.username, friend.username);
      });

    this.chatService.retrieveMessageSent()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(messageSent => this.messages.push(messageSent));
  }

  public ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  public comeBackListUsersComponent() {
    this.comeBack.emit(true);
  }

  public sendMessage(): void {
    this.sendMessageForm.value.from = environment.user;
    this.sendMessageForm.value.to = this.data;
    this.chatService.sendMessage(this.sendMessageForm.value);
    this.sendMessageForm.reset();
  }


}
