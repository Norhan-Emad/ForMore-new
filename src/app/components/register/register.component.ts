import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  ////variables////
  userData:object={};
  errMessage:string='';
  isLoading:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name:new FormControl('' , [Validators.required , Validators.minLength(4) , Validators.maxLength(20)]),
    email:new FormControl('' ,[Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    rePassword:new FormControl(''),
    phone:new FormControl('' ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators:[this.confirmPassword]} as FormControlOptions)


  confirmPassword(group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword')

    if(rePassword?.value === ''){
      rePassword?.setErrors({required:true})
    }
    else if(password?.value !== rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }

  handleForm():void{
    this.userData = this.registerForm.value;
    if(this.registerForm.valid === true){
      this.isLoading = true;
      this._AuthService.registerForm(this.userData).subscribe({
        next:(response)=>{
          this._Router.navigate(['/logIn']);
          this.isLoading = false;
        },
        error:(err)=>{
          this.errMessage = err.error.message;
          this.isLoading = false;
        }
      })
    }
  }

}
