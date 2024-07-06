import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient){}

  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/auth/`
  userToken:any = localStorage.getItem('u.token')
  decode:any="";

  registerForm(UserData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +'signup' ,UserData);
  }

  logInForm(UserData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +'signin' ,UserData);
  }

  ///open token to get user name
  userJwt():void{
    if(this.userToken !== null){
    this.decode = jwtDecode(this.userToken);
    console.log(this.decode.name);
    }
  }
}
