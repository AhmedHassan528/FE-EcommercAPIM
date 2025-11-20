import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishListService } from '../../../core/services/WishListServices/wish-list.service';
import { IWishList } from '../../../core/Interfaces/iwish-list';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-wish-list',
    imports: [CurrencyPipe, RouterLink, TranslateModule],
    templateUrl: './wish-list.component.html',
    styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{

  //data
  GetWishListData:IWishList[] = [];

  private readonly _toastrService = inject(ToastrService);


  //Constructor
  constructor(private _wishListService:WishListService) { }

  //component lifecycle
  ngOnInit(): void {
    this.getWishList()
  }


  getWishList(){
    this._wishListService.getWishListProducts().subscribe({
      next: (res)=>{
        this.GetWishListData = res;
      }
    })
  }

  removeFromWishList(productId:number){
    this._wishListService.removeFromWishList(productId).subscribe({
      next: ()=>{
        this.getWishList()
        this._toastrService.success("Product Removed from WishList", "Success", {
          timeOut: 3000
        })
      }
    })
  }

}
