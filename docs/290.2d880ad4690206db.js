"use strict";(self.webpackChunkForMore=self.webpackChunkForMore||[]).push([[290],{5290:(g,m,n)=>{n.r(m),n.d(m,{CartComponent:()=>x});var l=n(6814),p=n(1120),t=n(4769),h=n(8226);function u(o,b){if(1&o){const e=t.EpF();t.TgZ(0,"div",11)(1,"div",12),t._UZ(2,"img",13),t.qZA(),t.TgZ(3,"div",14)(4,"h3",15),t._uU(5),t.qZA(),t.TgZ(6,"p",16),t._uU(7),t.qZA(),t.TgZ(8,"p",17),t._uU(9,"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error a minus molestiae consequuntur voluptatum, perspiciatis ut est nisi quidem incidunt provident eveniet sequi labore explicabo aspernatur et iusto fugit nulla quos odio asperiores laudantium id doloremque vel? Dicta rerum, labore est unde tempora libero hic, veniam aut harum possimus reiciendis excepturi perspiciatis eius officia. Consectetur expedita quas temporibus quidem, repudiandae aut ratione minus eligendi soluta omnis adipisci nisi quod, cum obcaecati ipsum. Cupiditate quisquam labore pariatur laborum ab rerum corporis?"),t.qZA(),t.TgZ(10,"div",18)(11,"div",19)(12,"h5",7),t._uU(13),t.ALo(14,"currency"),t.qZA()(),t.TgZ(15,"div",20),t._UZ(16,"i",21),t.TgZ(17,"p",22),t._uU(18),t.qZA()(),t.TgZ(19,"div")(20,"button",23,24),t.NdJ("click",function(){const s=t.CHM(e).$implicit,r=t.MAs(21),_=t.oxw(2);return t.KtG(_.delete(s.product._id,r))}),t._uU(22,"Remove Item "),t._UZ(23,"i",25),t.qZA()()()(),t.TgZ(24,"div",26)(25,"button",27,28),t.NdJ("click",function(){const s=t.CHM(e).$implicit,r=t.MAs(26),_=t.MAs(31),C=t.oxw(2);return t.KtG(C.minus(s.product._id,s.count,r,_))}),t._UZ(27,"i",29),t.qZA(),t.TgZ(28,"p",30),t._uU(29),t.qZA(),t.TgZ(30,"button",27,31),t.NdJ("click",function(){const s=t.CHM(e).$implicit,r=t.MAs(26),_=t.MAs(31),C=t.oxw(2);return t.KtG(C.plus(s.product._id,s.count,r,_))}),t._UZ(32,"i",32),t.qZA()()()}if(2&o){const e=b.$implicit;t.xp6(2),t.Q6J("src",e.product.imageCover,t.LSH)("alt",e.product.title),t.xp6(3),t.Oqu(e.product.title),t.xp6(2),t.Oqu(e.product.category.name),t.xp6(6),t.hij("Price: ",t.xi3(14,7,e.price," ")," EGP"),t.xp6(5),t.Oqu(e.product.ratingsAverage),t.xp6(11),t.Oqu(e.count)}}const f=function(o){return["/payment",o]};function a(o,b){if(1&o){const e=t.EpF();t.TgZ(0,"section",2)(1,"div",3)(2,"div",4),t.YNc(3,u,33,10,"div",5),t.TgZ(4,"div",6)(5,"h3",7),t._uU(6),t.qZA(),t.TgZ(7,"h3",7),t._uU(8),t.ALo(9,"currency"),t.qZA(),t.TgZ(10,"div",8)(11,"button",9),t._uU(12,"Pay Now"),t.qZA(),t.TgZ(13,"button",10),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.clear())}),t._uU(14,"Clear Cart"),t.qZA()()()()()()}if(2&o){const e=t.oxw();t.xp6(3),t.Q6J("ngForOf",e.cartObject),t.xp6(3),t.hij(" ITEMS NUMBER : ",e.cartItemsNum,""),t.xp6(2),t.hij(" TOTAL PRICE : ",t.xi3(9,4,e.cartPrice," ")," EGP"),t.xp6(3),t.Q6J("routerLink",t.VKq(7,f,e.cartId))}}function d(o,b){1&o&&(t.TgZ(0,"div",33)(1,"h2",34),t._uU(2,"Your Cart Is Empty ....."),t.qZA(),t.TgZ(3,"button",35),t._uU(4,"GO GET SOME PRODUCT"),t.qZA()())}let x=(()=>{class o{constructor(e,c){this._CartService=e,this._Renderer2=c,this.cartObject=null,this.cartId=""}ngOnInit(){this._CartService.showCartProducts().subscribe({next:e=>{console.log("object",e.data.products),this.cartItemsNum=e.numOfCartItems,this.cartPrice=e.data.totalCartPrice,this.cartId=e.data._id,this.cartObject=e.data.products,this.countNum=e.data.products.count,this.cartId=e.data._id},error:e=>{console.log(e)}})}delete(e,c){this._Renderer2.setAttribute(c,"disabled","true"),this._CartService.deleteCartProducts(e).subscribe({next:i=>{console.log(i),this.cartItemsNum=i.numOfCartItems,this.cartPrice=i.data.totalCartPrice,this.cartObject=i.data.products,this._CartService.cartNum.next(i.numOfCartItems)},error:i=>{console.log(i)}})}clear(){this._CartService.clearCart().subscribe({next:e=>{console.log(e),this._CartService.cartNum.next(0),"success"===e.message&&(this.cartObject=null)},error:e=>{console.log(e)}})}plus(e,c,i,s){this.num=c+1,this._Renderer2.setAttribute(i,"disabled","true"),this._Renderer2.setAttribute(s,"disabled","true"),this.num>=1?this._CartService.updateCount(e,this.num).subscribe({next:r=>{console.log(r),this.cartObject=r.data.products,this._Renderer2.removeAttribute(i,"disabled"),this._Renderer2.removeAttribute(s,"disabled")},error:r=>{console.log(r)}}):this._CartService.deleteCartProducts(e).subscribe({next:r=>{console.log(r),this.cartItemsNum=r.numOfCartItems,this.cartPrice=r.data.totalCartPrice,this.cartObject=r.data.products},error:r=>{console.log(r)}})}minus(e,c,i,s){this.num=c-1,this._Renderer2.setAttribute(i,"disabled","true"),this._Renderer2.setAttribute(s,"disabled","true"),this.num>=1?this._CartService.updateCount(e,this.num).subscribe({next:r=>{console.log(r),this.cartObject=r.data.products,this._Renderer2.removeAttribute(i,"disabled"),this._Renderer2.removeAttribute(s,"disabled")},error:r=>{console.log(r)}}):this._CartService.deleteCartProducts(e).subscribe({next:r=>{console.log(r),this.cartItemsNum=r.numOfCartItems,this.cartPrice=r.data.totalCartPrice,this.cartObject=r.data.products},error:r=>{console.log(r)}})}static#t=this.\u0275fac=function(c){return new(c||o)(t.Y36(h.N),t.Y36(t.Qsj))};static#e=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-cart"]],standalone:!0,features:[t.jDz],decls:3,vars:2,consts:[["class","py-5",4,"ngIf","ngIfElse"],["cart",""],[1,"py-5"],[1,"container"],[1,"cart"],["class","row d-flex justify-content-center align-items-center py-md-4",4,"ngFor","ngForOf"],[1,"total","my-3"],[1,"colorPink"],[1,"buttons","d-flex","align-items-center","py-3"],["type","submit",1,"btn","btn-success","fs-5",3,"routerLink"],["type","submit",1,"btn","btn-outline-danger","fs-5","mx-3",3,"click"],[1,"row","d-flex","justify-content-center","align-items-center","py-md-4"],[1,"col-md-2","bg-light"],["width","100%","title","image",3,"src","alt"],[1,"col-md-8","bg-light"],[1,"special-font","colorPink"],[1,"colorPer"],[1,"text-muted"],[1,"row","d-flex","justify-content-between","align-items-center"],[1,"col-md-4"],[1,"col-md-4","d-flex","justify-content-center","align-items-center"],[1,"fa-solid","fa-star","text-warning","mx-2"],[1,"mb-0","fs-5"],["type","submit",1,"gradBg","text-white","main-btn","small",3,"click"],["deleteBtn",""],[1,"fa-solid","fa-trash","mx-2"],[1,"col-md-2","d-flex","justify-content-center","align-items-center"],["type","button","title","button",1,"main-btn",3,"click"],["minusBtn",""],[1,"fa-solid","fa-minus"],[1,"mb-0","mx-2","fs-4"],["plusBtn",""],[1,"fa-solid","fa-plus"],[1,"container","py-5","text-center"],[1,"colorPer","fw-bold","special-font"],["type","submit","routerLink","/products",1,"main-btn","my-3"]],template:function(c,i){if(1&c&&(t.YNc(0,a,15,9,"section",0),t.YNc(1,d,5,0,"ng-template",null,1,t.W1O)),2&c){const s=t.MAs(2);t.Q6J("ngIf",null!==i.cartObject)("ngIfElse",s)}},dependencies:[l.ez,l.sg,l.O5,l.H9,p.rH]})}return o})()},8226:(g,m,n)=>{n.d(m,{N:()=>h});var l=n(5619),p=n(4769),t=n(9862);let h=(()=>{class u{constructor(a){this._HttpClient=a,this.cartNum=new l.X(0),this.baseUrl="https://ecommerce.routemisr.com/api/v1/",this.headToken={token:localStorage.getItem("u.token")}}addProduct(a){return this._HttpClient.post(this.baseUrl+"cart",{productId:a},{headers:this.headToken})}showCartProducts(){return this._HttpClient.get(this.baseUrl+"cart")}deleteCartProducts(a){return this._HttpClient.delete(this.baseUrl+"cart/"+a)}clearCart(){return this._HttpClient.delete(this.baseUrl+"cart")}updateCount(a,d){return this._HttpClient.put(this.baseUrl+"cart/"+a,{count:d})}static#t=this.\u0275fac=function(d){return new(d||u)(p.LFG(t.eN))};static#e=this.\u0275prov=p.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})()}}]);