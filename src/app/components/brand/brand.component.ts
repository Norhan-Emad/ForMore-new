import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService } from 'src/app/core/services/services/brand.service';
import { CuttextPipe } from 'src/app/core/services/pipe/cuttext.pipe';
import { Brand } from 'src/app/core/services/interface/brand';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule , CuttextPipe],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit{

  constructor(private _BrandService:BrandService){}

  BrandObject:Brand[]=[]

  ngOnInit(): void {
      this._BrandService.showBrand().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.BrandObject = response.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

}
