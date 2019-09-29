import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { ConversationMessagesService } from 'src/app/services/conversation-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      res => {
        console.log(res);
        this.users = res;
      },
      err => {

      },
    );
  }

  openConversation(receiver: User) {
    this.router.navigate(
      ['conversation'],
      {
        queryParams:
        {
          receiver: JSON.stringify(receiver),
        },
      },
    );
  }

}
