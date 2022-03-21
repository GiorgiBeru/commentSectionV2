import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Commentari, CurrentUser, Data, Reply } from '../app.model';
import { StorageService } from '../storage.service';
import { UsersService } from '../users.service';
const commentKey = 'comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  ngOnInit(): void {
    this.loadUsers();
    // if (!this.storageService.get(commentKey)) this.refreshStorage();
  }
  refreshStorage() {
    this.storageService.set<Data>(commentKey, {
      currentUser: this.currentUser,
      comments: this.comments,
    });
  }
  currentUser!: CurrentUser;
  comments!: Commentari[];

  constructor(
    private usersService: UsersService,
    private storageService: StorageService
  ) {}

  mainreply: string = '';
  async loadUsers() {
    const storageData = this.storageService.get<Data>(commentKey);
    if (storageData) {
      var data: Data | null = storageData;
      this.comments = data.comments;
      this.currentUser = data.currentUser;
      return;
    }
    data = await this.usersService.getUsers();
    this.currentUser = data.currentUser;
    this.comments = data.comments;
    this.refreshStorage();
  }

  HanldeMainReply(data: any) {
    const toReply = this.comments.find((item) => item.id == data.id);
    const newComment: Reply = {
      content: data.content,
      createdAt: 'just now',
      id: this.generateMaxId(),
      replyingTo: toReply?.user?.username ? toReply?.user?.username : '',
      score: 0,
      user: this.currentUser,
    };
    toReply?.replies.push(newComment);
    this.refreshStorage();
  }

  n: number = 0;
  HandleIdEmitted(id: number) {
    console.log(this.comments);
    this.comments.map((item: Commentari, index) => {
      if (item.id === id) {
        return (this.n = index);
      } else {
        return;
      }
    });
    this.comments.splice(this.n, 1);
    this.refreshStorage();
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
  reply() {
    if (this.mainreply) {
      const newComment: Commentari = {
        content: this.mainreply,
        createdAt: new Date().getDate().toString(),
        id: this.generateMaxId(),
        score: 0,
        user: this.currentUser,
        replies: [],
      };
      this.comments.push(newComment);
      this.mainreply = '';
      this.refreshStorage();
    }
  }
}
