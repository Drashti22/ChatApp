import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private baseUrl: string = "https://localhost:44377/api/"
  constructor(private http: HttpClient) { }

  selectedUser: any = null;
  receiverId: number | null = null;

  getConversationHistory(UserId: number, beforeTimestamp?: string | null): Observable<any> {
    let url = `${this.baseUrl}messages?userId=${UserId}`
    if (beforeTimestamp) {
      url += `&before=${beforeTimestamp}`;
    }
    return this.http.get<any>(url);
  }
  sendMessage(senderId: number, receiverId: number, content: string){
    const message = {
      // senderId: senderId,
      receiverId: receiverId,
      content: content
    };

    return this.http.post(`${this.baseUrl}messages`, message);
  }
  
  editMessage(messageId: number, content: string): Observable<any> {
    const editedMessages = {
      content: content
    }
    return this.http.put(`${this.baseUrl}messages/${messageId}`, editedMessages)
  }
  deleteMessage(messageid: number){
    return this.http.delete<any>(`${this.baseUrl}messages/${messageid}`)
  }

}
