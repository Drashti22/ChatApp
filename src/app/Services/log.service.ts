import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private baseUrl: string = "https://localhost:44377/api/"
  constructor(private http: HttpClient) { }
  getLogs(startTime: string, endTime: string){
    return this.http.get<any[]>(`${this.baseUrl}log`)
  }
}