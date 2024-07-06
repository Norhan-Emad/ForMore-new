import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/services/cart.service';
import { WishService } from 'src/app/core/services/services/wish.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit{

  constructor(private _Router:Router , private _CartService:CartService , private _Renderer2:Renderer2 , private _WishService:WishService){}

  ItemsNumber!:number
  wishNumber!:number

  @ViewChild('nav') navBar!:ElementRef

  @HostListener('window:scroll')
  scroll():void{
    if(window.scrollY >=80){
      this._Renderer2.addClass(this.navBar.nativeElement , 'px-lg-5')
    }
    else{
      this._Renderer2.removeClass(this.navBar.nativeElement , 'px-lg-5')
    }
  }

  ngOnInit(): void {
      this._CartService.cartNum.subscribe({
        next:(data)=>{
          this.ItemsNumber = data;
        }
      })

      this._WishService.wishNum.subscribe({
        next:(data)=>{
          this.wishNumber = data;
        }
      })
      // when open the app
      this._WishService.getData().subscribe({
        next:(response)=>{
          this._WishService.wishNum.next(response.data.length);
        }
      })

  }
  logOut():void{
    localStorage.removeItem('u.token');
    this._Router.navigate(['/logIn']);
  }


}
