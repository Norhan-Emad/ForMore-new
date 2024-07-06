import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/services/auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , RouterLink],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  userData:object={};
  errMessage:string='';
  isLoading:boolean = false;
  userToken:string = '';

  logForm:FormGroup = new FormGroup({
    email:new FormControl('' ,[Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
  })


  handleForm():void{
    this.userData = this.logForm.value;
    if(this.logForm.valid === true){
      this.isLoading = true;
      this._AuthService.logInForm(this.userData).subscribe({
        next:(response)=>{
          this._Router.navigate(['/home']);
          this.isLoading = false;

          //save user token////
          this.userToken = response.token;
          ///save on local storage
          localStorage.setItem('u.token' , this.userToken);

          //split token and get user name
          this._AuthService.userJwt();
        },
        error:(err)=>{
          this._Router.navigate(['/register']);
          this.isLoading = false;
        }
      })
    }
  }

}
