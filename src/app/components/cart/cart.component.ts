import { Product } from './../../core/services/interface/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/services/cart.service';
import { RouterLink } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  constructor(private _CartService:CartService , private _Renderer2:Renderer2){}

  cartObject:any = null;
  cartItemsNum!:number;
  cartPrice!:number;
  cartId:string = '';
  num!:number;
  countNum!:number;

  ngOnInit(): void {

    //show cart
    this._CartService.showCartProducts().subscribe({
      next:(response)=>{
        console.log('object' , response.data.products);
        this.cartItemsNum = response.numOfCartItems;
        this.cartPrice = response.data.totalCartPrice;
        this.cartId = response.data._id;
        this.cartObject = response.data.products;
        this.countNum =  response.data.products.count
        this.cartId = response.data._id
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //delete item
  delete(Id:string , element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element , 'disabled' , 'true')
    this._CartService.deleteCartProducts(Id).subscribe({
      next:(response)=>{
        console.log(response);
        this.cartItemsNum = response.numOfCartItems;
        this.cartPrice = response.data.totalCartPrice;
        this.cartObject = response.data.products;
        // change cart icon number
        this._CartService.cartNum.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //clear cart
  clear():void{
    this._CartService.clearCart().subscribe({
      next:(response)=>{
        console.log(response);
        // change cart icon number
        this._CartService.cartNum.next(0)
        if(response.message === 'success'){
          this.cartObject = null;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //update count

  plus(id:string , itemCount:number , ele1:HTMLButtonElement , ele2:HTMLButtonElement):void{
    this.num = itemCount + 1;
    ///made button disabled
    this._Renderer2.setAttribute(ele1,'disabled','true');
    this._Renderer2.setAttribute(ele2,'disabled','true');
    if(this.num >=1){
      this._CartService.updateCount(id , this.num).subscribe({
        next:(response)=>{
          console.log(response);
          this.cartObject = response.data.products;
          ///made button enable
          this._Renderer2.removeAttribute(ele1,'disabled');
          this._Renderer2.removeAttribute(ele2,'disabled');
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    //// if count = 0 we will delete this item from the cart
    else{
      this._CartService.deleteCartProducts(id).subscribe({
        next:(response)=>{
          console.log(response);
          this.cartItemsNum = response.numOfCartItems;
          this.cartPrice = response.data.totalCartPrice;
          this.cartObject = response.data.products;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }


  minus(id:string , itemCount:number , ele1:HTMLButtonElement , ele2:HTMLButtonElement):void{
    this.num = itemCount - 1;
    ///made button disabled
    this._Renderer2.setAttribute(ele1,'disabled','true');
    this._Renderer2.setAttribute(ele2,'disabled','true');
    if(this.num >=1){
      this._CartService.updateCount(id , this.num).subscribe({
        next:(response)=>{
          console.log(response);
          this.cartObject = response.data.products;
          ///made button enable
          this._Renderer2.removeAttribute(ele1,'disabled');
          this._Renderer2.removeAttribute(ele2,'disabled');
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    //// if count = 0 we will delete this item from the cart
    else{
      this._CartService.deleteCartProducts(id).subscribe({
        next:(response)=>{
          console.log(response);
          this.cartItemsNum = response.numOfCartItems;
          this.cartPrice = response.data.totalCartPrice;
          this.cartObject = response.data.products;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

}
