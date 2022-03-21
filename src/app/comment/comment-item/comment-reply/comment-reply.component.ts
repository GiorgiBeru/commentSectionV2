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
  @Output() bla: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}
  userReply: Boolean = false;
  userReplies() {
    this.userReply = !this.userReply;
  }
  ngOnInit(): void {}

  handleContent(content: string) {
    this.userReplies();
    this.bla.emit(content);
  }
}
