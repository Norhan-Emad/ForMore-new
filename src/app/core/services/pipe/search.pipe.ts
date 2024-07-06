import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productsData:Product[] , value:any):Product[] {
    return productsData.filter((item)=>item.title.toLowerCase().includes(value.toLowerCase()));
  }

}
