import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {loggedInUserName: string | undefined;
  


  private baseUrl: string = "https://localhost:44377/api/"
  constructor(private http: HttpClient) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}login`, loginObj)
  }
  logout(){
    this.loggedIn =false;
  }


  //Authentication 
  loggedIn: boolean = false;
  login_valid(){
    this.loggedIn = true;
  }
  isAuthenticated(){
    return this.loggedIn
  }


}
