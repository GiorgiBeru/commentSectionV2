import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Commentari, CurrentUser, Data, Reply } from '../app.model';
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
  currentUser!: CurrentUser;
  comments!: Commentari[];

  constructor(private usersService: UsersService) {}
  async loadUsers() {
    const data = await this.usersService.getUsers();
    this.currentUser = data.currentUser;
    this.comments = data.comments;
  }

  HanldeMainReply(data: any) {
    const toReply = this.comments.find((item) => item.id == data.id);
    const newComment: Reply = {
      content: data.content,
      createdAt: new Date().getDate().toString(),
      id: this.generateMaxId(),
      replyingTo: toReply?.user?.username ? toReply?.user?.username : '',
      score: 0,
      user: this.currentUser,
    };
    toReply?.replies.push(newComment);
  }

  generateMaxId() {
    let id = 1;
    this.comments.forEach((item) => {
      if (item.id > id) id = item.id;
      item.replies.forEach((reply) => {
        if (reply.id > id) id = reply.id;
      });
    });

    return ++id;
  }
}
