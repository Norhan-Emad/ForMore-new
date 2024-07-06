import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishService } from 'src/app/core/services/services/wish.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/services/cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(private _WishService:WishService , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService){}

  prodId:any
  wishObject:any = null;

  ngOnInit(): void {
    this._WishService.getData().subscribe({
      next:(response)=>{
        console.log(response);
        this.wishObject = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this._CartService.showCartProducts().subscribe({
      next:(response)=>{
        this._CartService.cartNum.next(response.numOfCartItems)
      }
    })
  }

  delete(id:string):void{
    this._WishService.deleteItem(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.wishObject = response.data;
        this._WishService.wishNum.next(response.data.length);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  addToCart(prodctId:string):void{
    this._CartService.addProduct(prodctId).subscribe({
      next:(response)=>{
        console.log(response);
        this._CartService.cartNum.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
