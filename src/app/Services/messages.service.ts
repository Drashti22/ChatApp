import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private baseUrl: string = "https://localhost:44377/api/"
  constructor(private http: HttpClient) { }

  getConversationHistory(loggedInUserId: string | null, selectedUserId: number): Observable<any> {
    const params = new HttpParams().set('userid', loggedInUserId?.toString() || '')
    return this.http.get<any>(
      `${this.baseUrl}messages?userId=${selectedUserId}`,
      { params: params }
    );
  }
  sendMessage(senderId: number, receiverId: number, content: string){
    const message = {
      senderId: senderId,
      receiverId: receiverId,
      content: content
    };

    return this.http.post(`${this.baseUrl}messages`, message);
  }
}
