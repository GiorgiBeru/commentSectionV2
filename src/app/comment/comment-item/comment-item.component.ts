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
  @Output() replyToDelete: EventEmitter<any> = new EventEmitter<any>();
  
  userReply: Boolean = false;
  editContent = '';


  constructor() {}
  userReplies() {
    this.userReply = !this.userReply;
  }

  
  handleMainReply(content: string) {
    this.onMainReply.emit({ content, id: this.commentItem.id });
    this.userReplies();
  }
  
 

  isEditActive = false;
  toggleEdit() {
    this.isEditActive = !this.isEditActive;
  }
  deleteCommentari: boolean = false;

  deleteComment(id: number) {
    this.deleteCommentari = !this.deleteCommentari;
    this.idEmitted.emit(id);
    this.toggleModal();
  }

  n: number = 0;
  handleIdEmittedGrandChild(id: number) {
    this.commentItem.replies.map((reply: Reply, index) => {
      if (reply.id === id) {
        return (this.n = index);
      } else {
        return;
      }
    });
    this.commentItem.replies.splice(this.n, 1);
    this.replyToDelete.emit();
  }
  isModalActive = false;
  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  ngOnInit(): void {}
}
