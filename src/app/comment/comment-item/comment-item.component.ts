import { Component, Input, OnInit } from '@angular/core';
import { Commentari, CurrentUser } from 'src/app/app.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem!: Commentari;
  @Input() curUser!: CurrentUser;
  userReply: Boolean = false;
  userReplies(){
    this.userReply = !this.userReply;
  }
  constructor() {}

  ngOnInit(): void {}
}
