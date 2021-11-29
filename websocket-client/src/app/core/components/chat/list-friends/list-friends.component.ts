import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/models/User';
import { UserService } from 'app/core/services/user.service';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.scss']
})
export class ListFriendsComponent implements OnInit, OnDestroy {

  public friends: User[];
  @Output() userSelected;
  private unsubscribeSubject: Subject<void>;

  constructor(private userService: UserService) {
    this.friends = [];
    this.userSelected = new EventEmitter();
    this.unsubscribeSubject = new Subject<void>();
  }

  public ngOnInit(): void {
    this.userService.findAllFriends()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(friends => this.friends = friends);
  }

  public ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  public goToMessages(friend: User) {
    this.userSelected.emit(friend);
  }

}
