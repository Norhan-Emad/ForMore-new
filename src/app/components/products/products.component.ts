import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/services/products.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/services/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/services/cart.service';
import { Product } from 'src/app/core/services/interface/product';
import { ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/services/pipe/search.pipe';
import { WishListComponent } from '../wish-list/wish-list.component';
import { WishService } from 'src/app/core/services/services/wish.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , RouterLink , CuttextPipe , NgxPaginationModule , FormsModule , SearchPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private _ProductsService:ProductsService , private _CartService:CartService , private toastr:ToastrService , private _Renderer2:Renderer2 , private _WishService:WishService){}

  productsData:Product[]=[];
  pageSize:number=0;
  mainPage:number=1;
  total:number=0;
  inputValue:any = '';
  message:string='';
  wishArray:any[]=[];

ngOnInit(): void {
    //show products//
    this._ProductsService.getProducts().subscribe({
      next:(response)=>{
        this.productsData = response.data;
        this.pageSize = response.metadata.limit  ;
        this.mainPage = response.metadata.currentPage;
        this.total = response.results
        console.log(response);
      },
      error:(err)=>{
        console.log(err);
      }
    })

    //wish list
    this._WishService.getData().subscribe({
      next:(response)=>{
        console.log(`wish`,response.data);
        const ArrayOfId = response.data.map((item:any)=>item._id);
        this.wishArray = ArrayOfId
      }
    })

}

      //add to cart
    add(productId:any , element:HTMLButtonElement):void{
      //when i click
    this._Renderer2.setAttribute(element ,'disabled','true' )
    this._CartService.addProduct(productId).subscribe({
      next:(response)=>{
        console.log(response);
        //when we got a response
        this._Renderer2.removeAttribute(element ,'disabled' )
        //toaster
        this.toastr.success(response.message);
        //cart icon
        this._CartService.cartNum.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
        //when we got a response
        this._Renderer2.removeAttribute(element ,'disabled' )
        this.toastr.error('not added');
      }
    })
  }
  //pagination
  pageChanged(event:any){
    //show products//
    this._ProductsService.getProducts(event).subscribe({
      next:(response)=>{
        this.productsData = response.data;
        this.pageSize = response.metadata.limit  ;
        this.mainPage = response.metadata.currentPage;
        this.total = response.results
        console.log(response);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //add to wish list

  addToWish(itemId:any , el1:HTMLElement , el2:HTMLElement):void{
    this._WishService.add(itemId).subscribe({
      next:(response)=>{
        console.log(response);
        //wishlist NUm
        this._WishService.wishNum.next(response.data.length)
        //add to wish
        this._Renderer2.setAttribute(el1 , 'hidden','true');
        this._Renderer2.removeAttribute(el2 , 'hidden')
        this.message = response.message;
          //toaster
          this.toastr.success(this.message);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  removeWish(itemId:any , el1:HTMLElement , el2:HTMLElement):void{
    this._WishService.deleteItem(itemId).subscribe({
      next:(response)=>{
        console.log(response);
        //wishlist NUm
        this._WishService.wishNum.next(response.data.length)
        //add to wish
        this._Renderer2.setAttribute(el2 , 'hidden','true');
        this._Renderer2.removeAttribute(el1 , 'hidden')
        this.message = response.message;
          //toaster
          this.toastr.success(this.message);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}

