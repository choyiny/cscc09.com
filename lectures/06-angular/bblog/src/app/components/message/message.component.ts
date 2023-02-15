import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/classes/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message?: Message;
  @Output() onUpvote = new EventEmitter();
  @Output() onDownvote = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  upvote() {
    this.onUpvote.emit(this.message?.id);
  }

  downvote() {
    this.onDownvote.emit(this.message?.id);
  }

  deleteMessage() {
    this.onDelete.emit(this.message?.id);
  }
}
