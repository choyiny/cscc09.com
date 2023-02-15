import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/classes/message';
import { MicroblogService } from 'src/app/services/microblog.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  messages: Message[] = [];
  postUsername = 'bob';
  postContent = 'Hello World!';

  constructor(private microblogService: MicroblogService) {}

  ngOnInit(): void {
    this.microblogService.getMessages().subscribe((res) => {
      this.messages = res.messages;
    });
  }

  upvote(id: string) {
    this.microblogService.vote('upvote', id).subscribe((res) => {
      this.updateVotes(id, res.upvote, res.downvote);
    });
  }

  downvote(id: string) {
    this.microblogService.vote('downvote', id).subscribe((res) => {
      this.updateVotes(id, res.upvote, res.downvote);
    });
  }

  deleteMessage(id: string) {
    this.microblogService.deleteMessage(id).subscribe((res) => {
      this.messages = this.messages.filter((message) => message.id !== id);
    });
  }

  onSubmit() {
    this.microblogService
      .postMessage(this.postContent, this.postUsername)
      .subscribe((res) => {
        this.postContent = '';
        this.postUsername = '';
        this.microblogService.getMessages().subscribe((res) => {
          this.messages = res.messages;
        });
      });
  }

  private updateVotes(id: string, upvote: number, downvote: number) {
    const message = this.messages.find((message) => message.id === id);
    if (message) {
      message.upvote = upvote;
      message.downvote = downvote;
    }
  }
}
