import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Message } from '../classes/message';

@Injectable({
  providedIn: 'root',
})
export class MicroblogService {
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<{ messages: Message[] }> {
    return this.http.get<{ messages: Message[] }>(
      `${this.backendUrl}/api/messages`
    );
  }

  postMessage(content: string, username: string): Observable<Message> {
    return this.http.post<Message>(`${this.backendUrl}/api/messages`, {
      content,
      username,
    });
  }

  vote(action: 'upvote' | 'downvote', id: number): Observable<Message> {
    return this.http.patch<Message>(`${this.backendUrl}/api/messages/${id}`, {
      action: action,
    });
  }
}
