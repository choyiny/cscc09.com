import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Message } from '../classes/message';

@Injectable({
  providedIn: 'root',
})
export class MicroblogService {
  backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<{ messages: Message[] }> {
    return this.http.get<{ messages: Message[] }>(
      `${this.backendUrl}/api/messages`
    );
  }

  postMessage(message: string, username: string): Observable<Message> {
    return this.http.post<Message>(`${this.backendUrl}/api/messages`, {
      content: message,
      username: username,
    });
  }

  vote(action: 'upvote' | 'downvote', messageId: string): Observable<Message> {
    return this.http.patch<Message>(
      `${this.backendUrl}/api/messages/${messageId}`,
      {
        action: action,
      }
    );
  }

  deleteMessage(messageId: string): Observable<Message> {
    return this.http.delete<Message>(
      `${this.backendUrl}/api/messages/${messageId}`
    );
  }
}
