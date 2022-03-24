import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentUser, Reply } from 'src/app/app.model';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
})
export class CommentReplyComponent implements OnInit {
  @Input() replyItem!: Reply;
  @Input() replyCurUser!: CurrentUser;
  @Output() contentEmmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() idEmittedGrandChild: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  userReply: Boolean = false;
  userReplies() {
    this.userReply = !this.userReply;
  }
  ngOnInit(): void {}

  handleContent(content: string) {
    this.userReplies();
    this.contentEmmit.emit(content);
  }
  
  deleteCommentari: boolean = false;
  deleteComment(id: number){
    this.deleteCommentari = !this.deleteCommentari;
    this.idEmittedGrandChild.emit(id);
  }
}
