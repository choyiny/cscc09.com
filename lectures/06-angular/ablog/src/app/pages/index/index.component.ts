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

  postUsername = 'test user';
  postContent = 'qwer';

  constructor(private microblogService: MicroblogService) {}

  onSubmit() {
    this.microblogService
      .postMessage(this.postContent, this.postUsername)
      .subscribe((res) => {
        this.microblogService.getMessages().subscribe((res) => {
          this.messages = res.messages;
        });
      });
  }

  ngOnInit(): void {
    this.microblogService.getMessages().subscribe((res) => {
      this.messages = res.messages;
    });
  }

  onUpvote(id: number) {
    this.microblogService.vote('upvote', id).subscribe((res) => {
      this.microblogService.getMessages().subscribe((res) => {
        this.messages = res.messages;
      });
    });
  }

  onDownvote(id: number) {
    this.microblogService.vote('downvote', id).subscribe((res) => {
      this.microblogService.getMessages().subscribe((res) => {
        this.messages = res.messages;
      });
    });
  }
}
