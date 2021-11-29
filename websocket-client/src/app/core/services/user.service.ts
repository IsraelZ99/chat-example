import { Injectable } from '@angular/core';
import { first, map, Observable, Subject } from 'rxjs';
import { User } from '../models/User';
import { SocketClientService } from './socket-client.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private socketClient: SocketClientService) { }

  public findAllFriends(): Observable<User[]> {
    return this.socketClient.onMessage("/users/get")
      .pipe(map(users => users.filter((user: User) => user.username !== environment.user.username)));;
  }

}
