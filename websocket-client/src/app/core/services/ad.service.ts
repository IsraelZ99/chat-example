import { Injectable } from '@angular/core';
import { ConversationComponent } from '../components/chat/conversation/conversation.component';
import { ListFriendsComponent } from '../components/chat/list-friends/list-friends.component';
import { AdItem } from '../utils/AdItem';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  public getAds() {
    return [
      new AdItem(ListFriendsComponent, {}),
      new AdItem(ConversationComponent, { friend: 'Joel' })
    ]
  }
}
