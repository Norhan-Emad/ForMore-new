import { ProductsService } from './../../core/services/services/products.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Details } from 'src/app/core/services/interface/details';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule , CarouselModule ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService ,private _CartService:CartService, private toastr: ToastrService ,private _Renderer2:Renderer2 ){}

  //vars

  productId!:string|null;
  detailsArray!:Details;

  ngOnInit(): void {

    //get user id
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.productId = params.get('_id')
        },
        error:(err)=>[
          console.log(err)
        ]
      })

    //get product details
    this._ProductsService.getDetails(this.productId).subscribe({
      next:(response)=>{
        this.detailsArray = response.data
        console.log( this.detailsArray);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  //slider

  imageSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
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
        //toaster
        this.toastr.success(response.message);

        //cart icon
        this._CartService.cartNum.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
        //when we got a response
        this._Renderer2.removeAttribute(element ,'disabled' )
        //toaster
        this.toastr.error('not added');
      }
    })
  }

}
