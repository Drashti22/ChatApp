import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string ='https://localhost:44377/api/';
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(`${this.baseUrl}users`)
  }
  getConversationHistory(userId: number, count: number, sort: string): Observable<any> {
    const params = {
      userId: userId.toString(),
      count: count.toString(),
      sort: sort
    };

    return this.http.get<any>(`${this.baseUrl}messages`, { params });
  }
}
