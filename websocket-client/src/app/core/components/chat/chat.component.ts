import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AdComponent } from 'app/core/models/AdComponent';
import { User } from 'app/core/models/User';
import { AdItem } from 'app/core/utils/AdItem';
import { ChatDirective } from 'app/shared/chat.directive';
import { ConversationComponent } from './conversation/conversation.component';
import { ListFriendsComponent } from './list-friends/list-friends.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() ads: AdItem[];
  @ViewChild(ChatDirective, { static: true }) adChatHost!: ChatDirective;
  public username: string;

  constructor() {
    this.ads = [];
    this.username = environment.user.username;
  }

  ngOnInit(): void {
    this.loadListFriendComponent();
  }

  private loadComponent(chatItem: AdItem) {
    const viewContainerRef = this.adChatHost.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef.createComponent<AdComponent>(chatItem.component);
  }

  private loadListFriendComponent(): void {
    const index = this.ads.findIndex(ad => ad.component = ListFriendsComponent)
    const listFriendsComponent = this.ads[index];
    const componentRef = this.loadComponent(listFriendsComponent);
    componentRef.instance.data = listFriendsComponent.data;
    componentRef.instance.userSelected.subscribe((userSelected: User) => this.loadConversationComponent(userSelected));
  }

  private loadConversationComponent(userSelected: User) {
    const index = this.ads.findIndex(ad => ad.component = ConversationComponent)
    const conversationComponent = this.ads[index];
    const componentRef = this.loadComponent(conversationComponent);
    componentRef.instance.data = userSelected;
    componentRef.instance.comeBack.subscribe((comeBack: boolean) => this.loadListFriendComponent());
  }


}
