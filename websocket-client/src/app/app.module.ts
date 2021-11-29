import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatDirective } from './shared/chat.directive';
import { ListFriendsComponent } from './core/components/chat/list-friends/list-friends.component';
import { ConversationComponent } from './core/components/chat/conversation/conversation.component';
import { ChatComponent } from './core/components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatDirective,
    ListFriendsComponent,
    ConversationComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
