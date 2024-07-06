import { CuttextPipe } from './../../core/services/pipe/cuttext.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/core/services/services/category.service';
import { Cat } from 'src/app/core/services/interface/cat';

@Component({
  selector: 'app-caterory',
  standalone: true,
  imports: [CommonModule , CuttextPipe],
  templateUrl: './caterory.component.html',
  styleUrls: ['./caterory.component.scss']
})
export class CateroryComponent implements OnInit{

  constructor(private _CategoryService:CategoryService){}
  categoryObject:Cat[]=[];

  ngOnInit(): void {
      this._CategoryService.showCat().subscribe({
        next:(response)=>{
          console.log(response);
          this.categoryObject = response.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }


}
