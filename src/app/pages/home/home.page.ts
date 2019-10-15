import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
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
    const user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUsers().subscribe(
      res => {
        this.users = res.filter(object => object._id !== user.id);
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
