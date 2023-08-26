import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from   '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "Password"
  isText: boolean = false;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router : Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8)]
    })
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      //send the obj to db
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.auth.loggedInUserName = this.loginForm.get('userName')?.value;
          this.auth.login_valid();
          this.router.navigate(['/signup'])
        //  console.log(res.message);
         this.loginForm.reset();
         
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      console.log("form is not valid")
      this.validateAllFormFields(this.loginForm);
      alert("Your form is invalid !!")
      //throw the error using toaster
    }
  }
  private validateAllFormFields(formGroup: FormGroup, ){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

}
