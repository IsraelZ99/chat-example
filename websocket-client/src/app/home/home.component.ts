import { Component, OnInit } from '@angular/core';
import { AdService } from 'app/core/services/ad.service';
import { ChatService } from 'app/core/services/chat.service';
import { AdItem } from 'app/core/utils/AdItem';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ads: AdItem[];
  public messagesNotRead: number;
  public username: string;

  constructor(private adService: AdService, private chatService: ChatService) {
    this.ads = [];
    this.messagesNotRead = 0;
    this.username = environment.user.username;
  }

  ngOnInit(): void {
    this.ads = this.adService.getAds();
    this.chatService.getCountMessagesNotRead(this.username).subscribe(count => this.messagesNotRead = count);
    this.chatService.retrieveCountMessagesNotRead().subscribe(count => this.messagesNotRead = count);
    this.chatService.increaseMessagesNotRead().subscribe(oneMessage => this.messagesNotRead += oneMessage);
  }

}
