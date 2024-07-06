import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/services/guard/auth.guard';

const routes: Routes = [
  {path:'' , loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
  children:[
    {path:'' , redirectTo:'logIn', pathMatch:'full'},
    {path:'register' ,loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent) , title:'register'},
    {path:'logIn' ,loadComponent:()=>import('./components/log-in/log-in.component').then((m)=>m.LogInComponent) , title:'logIn'},
    {path:'forgetPassword' ,loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent) , title:'forget password'}
  ]},
  {path:'' , loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
  canActivate:[authGuard],children:[
    {path:'' , redirectTo:'home', pathMatch:'full'},
    {path:'home' ,loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent) , title:'Home'},
    {path:'cart' ,loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent) , title:'cart'},
    {path:'category' ,loadComponent:()=>import('./components/caterory/caterory.component').then((m)=>m.CateroryComponent) , title:'category'},
    {path:'brand' ,loadComponent:()=>import('./components/brand/brand.component').then((m)=>m.BrandComponent) , title:'brand'},
    {path:'products' ,loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent) , title:'products'},
    {path:'productDetails/:_id' ,loadComponent:()=>import('./components/product-details/product-details.component').then((m)=>m.ProductDetailsComponent) , title:'productDetails'},
    {path:'payment/:_id' ,loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent) , title:'payment'},
    {path:'wishList' ,loadComponent:()=>import('./components/wish-list/wish-list.component').then((m)=>m.WishListComponent) , title:'wishList'},
    {path:'forget' ,loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent) , title:'forget password'},
    {path:'**' ,loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent) , title:'notFound'},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
