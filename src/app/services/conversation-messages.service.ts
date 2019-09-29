import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Message } from '../models/message';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ConversationMessagesService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService,
  ) { }

  getConversationMessages(participants: string[]) {
    const params = { participants };
    return this.http.post<any>(`${this.urlService.url}/api/v1/messages/getConversationMessages`, params);
  }

  sendMessage(message: Message): Observable<Message> {
    const params = {
      message
    };
    return this.http.post<any>(`${this.urlService.url}/api/v1/messages/addMessage`, params);
  }

}
