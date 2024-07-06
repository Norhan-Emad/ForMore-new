import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PayService } from 'src/app/core/services/services/pay.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  constructor(private _ActivatedRoute:ActivatedRoute , private _PayService:PayService , private _Router:Router){}

  cartId:any;
  paymentObject:any;
  url:string = '';

  ngOnInit(): void {

    //get cart Id value
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          console.log(params.get('_id'));
          this.cartId = params.get('_id');
        }
      })
  }

  paymentDetails:FormGroup = new FormGroup({
    details:new FormControl('' , [Validators.required , Validators.minLength(4) , Validators.maxLength(40)]),
    city:new FormControl('' , [Validators.required , Validators.minLength(4) , Validators.maxLength(10)]),
    phone:new FormControl('' ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  //

  pay():void{
    this._PayService.payment(this.cartId ,this.paymentDetails.value).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status=== 'success'){
          this.url = response.session.url
          window.open(this.url , '_self');
        }
      }
    })
  }

}
