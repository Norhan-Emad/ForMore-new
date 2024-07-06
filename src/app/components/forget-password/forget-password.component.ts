import { ForgotService } from './../../core/services/services/forgot.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  constructor(private _ForgotService:ForgotService , private _Router:Router){}

  // vars

  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
  userEmail:string = '';
  userMessage:string = '';

  forgotPassword:FormGroup= new FormGroup({
    email : new FormControl('' ,[Validators.required , Validators.email])
  })
  resetCode:FormGroup= new FormGroup({
    resetCode: new FormControl('')
  })
  resetPassword:FormGroup= new FormGroup({
    newPassword: new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
  })

  ForgotPassword():void{
    const emailObject = this.forgotPassword.value;
    this._ForgotService.forgot(emailObject).subscribe({
      next:(response)=>{
        console.log(response);
        this.userEmail = emailObject.email;
        this.step1 = false;
        this.step2 = true;
        this.userMessage = response.message;
      },
      error:(err)=>{
        console.log(err);
        this.userMessage = err.error.message;
      }
    })
  }

  ResetCode():void{
    const resetObject = this.resetCode.value;
    this._ForgotService.code(resetObject).subscribe({
      next:(response)=>{
        console.log(response);
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
        this.userMessage = response.status;
      },
      error:(err)=>{
        console.log(err);
        this.userMessage = err.error.message;
      }
    })
  }
  ResetPassword():void{
    const pass = this.resetPassword.value;
    const passObject ={
      email:this.userEmail,
      newPassword:pass.newPassword
    }

    this._ForgotService.password(passObject).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.token){
          localStorage.setItem('u.token' , response.token)
          this._Router.navigate(['/home'])
        }
      },
      error:(err)=> {
        console.log(err);
        this.userMessage = err.error.message;
      },
    })
  }


}
