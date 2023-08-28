import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  public users:any = [ ];
constructor(private auth: AuthService, private route: Router, private user: UserService ){}

ngOnInit(){
  this.user.getUsers()
  .subscribe(res=>{
    this.users = res.users;
    console.log(res.users.name)
  },
  (error)=>{
    console.error(error);
  }
  );
}

onLogout(){
  this.auth.removeToken()
  this.route.navigate(['login'])
}


}
