import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Commentari, CurrentUser, Reply } from 'src/app/app.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem!: Commentari;
  @Input() curUser!: CurrentUser;
  @Output() onMainReply: EventEmitter<any> = new EventEmitter<any>();
  @Output() idEmitted: EventEmitter<any> = new EventEmitter<any>();
  userReply: Boolean = false;
  userReplies() {
    this.userReply = !this.userReply;
  }
  constructor() {}

  handleMainReply(content: string) {
    this.onMainReply.emit({ content, id: this.commentItem.id });
    this.userReplies();
  }
  deleteCommentari: boolean = false;
  deleteComment(id: number){
    this.deleteCommentari = !this.deleteCommentari;
    this.idEmitted.emit(id);
  }
  
  ngOnInit(): void {}
}
