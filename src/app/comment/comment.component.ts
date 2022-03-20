import { Component, Input, OnInit } from '@angular/core';
import {CurrentUser, Data} from '../app.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  ngOnInit(): void {
    this.loadUsers();
  }
  currentUser: CurrentUser | undefined;
  comments!: Comment[];
  
  constructor(private usersService: UsersService) {}
  async loadUsers() {
    const data = await this.usersService.getUsers();
    this.currentUser = data.currentUser;
    this.comments = data.comments;
  }
}
