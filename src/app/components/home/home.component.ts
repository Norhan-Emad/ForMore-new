import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CuttextPipe } from 'src/app/core/services/pipe/cuttext.pipe';
import { ProductsService } from 'src/app/core/services/services/products.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { Product } from 'src/app/core/services/interface/product';
import { Cat } from 'src/app/core/services/interface/cat';
import { CartService } from 'src/app/core/services/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishService } from 'src/app/core/services/services/wish.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttextPipe , CarouselModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private _ProductsService:ProductsService , private _CartService:CartService , private toastr: ToastrService , private _Renderer2:Renderer2 , private _WishService:WishService){}

  productsData:Product[]=[];
  catData:Cat[]=[];
  message:string = '';
  rating:number =0;
  wishArray:any[]=[];
  ngOnInit(): void {
    //show products//
    this._ProductsService.getProducts().subscribe({
      next:(response)=>{
        this.productsData = response.data;
        console.log(this.productsData);

      },
      error:(err)=>{
        console.log(err);
      }

    })

    //show num of items on cart icon
    this._CartService.showCartProducts().subscribe({
      next:(response)=>{
        console.log('object' , response.data.products);
        this._CartService.cartNum.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })


    //show categories
    this._ProductsService.getCat().subscribe({
      next:(response)=>{
        this.catData = response.data;
        console.log(this.catData);
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

  //cat slider

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:2000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items:6
      }
    },
  }

///images slider
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  autoplayTimeout:8000,
  autoplaySpeed:2000,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },
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

        this.message = response.message;
        //toaster
        this.toastr.success(this.message);

        //cart icon
        this._CartService.cartNum.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
        //toaster
        this.toastr.error('not added');
        this._Renderer2.removeAttribute(element ,'disabled' )
      }
    })
  }


    //add to wish list

    addToWish(itemId:any , el1:HTMLElement , el2?:HTMLElement):void{
      this._WishService.add(itemId).subscribe({
        next:(response)=>{
          console.log(response);
          //wishlist NUm
          this._WishService.wishNum.next(response.data.length)
          //add to wish
          this._Renderer2.setAttribute(el1 , 'hidden','true');
          this._Renderer2.removeAttribute(el2 , 'hidden');
          this.message = response.message;
          //toaster
          this.toastr.success(this.message);

          this.wishArray=response.data
        },
        error:(err)=>{
          console.log(err);
          this.toastr.error('not added');
        //toaster
        this.toastr.success(this.message);
        }
      })
    }
    removeWish(itemId:any , el1:HTMLElement , el2?:HTMLElement):void{
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

        this.wishArray=response.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }

}
