import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {loggedInUserName: string | undefined;

  private baseUrl: string = "https://localhost:44377/api/"
  private tokenkey = 'auth_token'
  constructor(private http: HttpClient) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}login`, loginObj)
  }
  
  
  isLoggedIn(): boolean{
    const token = this.getToken();
    console.log(token)
    return !!token;
  }
  getToken(){
    return localStorage.getItem(this.tokenkey)
  }
  storeToken(token: string){
    localStorage.setItem(this.tokenkey, token)
    console.log(token)
  }
  removeToken(): void {
    localStorage.removeItem(this.tokenkey);
  }
}
