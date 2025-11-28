import { IProduct } from '../../../core/Interfaces/product';
import { ItemService } from './../../../core/services/Items-Service/item.service';
import { Component, inject,} from '@angular/core';
import { Subscription } from 'rxjs';
import { KMPSearchPipe } from '../../../core/Pipes/kmpsearch.pipe';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from '../../../core/services/WishListServices/wish-list.service';
import { faStar, faStarHalf, faSpinner, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/CartServices/cart.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-products',
  imports: [TranslateModule, FormsModule, KMPSearchPipe, RouterLink, FontAwesomeModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // Variables
  SearchWords: string = '';
  WishListIDs!: any
  // Font Awesome Icons
  faStar = faStar;
  faStarHalf = faStarHalf;
  faSpinner = faSpinner;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;

  // Servier Message
  ServMessage!: string;

  // Variables
  AddLoading: Boolean = false
  wishListLoading: Boolean = false;
  itemId!: number;



  // subscriptions
  getProductSub!: Subscription;


  // Data
  Products: IProduct[] = [];

  constructor(private _Items: ItemService, private _wishListService: WishListService, private _cartService: CartService, private _toastrService:ToastrService) { }


  // component Lifecycle Hooks
  ngOnInit(): void {
    this.getProducts();
  }


  ngOnDestroy(): void {
    this.getProductSub?.unsubscribe();
  }


  getProducts(): void {
    this.getProductSub = this._Items.getItems().subscribe({
      next: (res) => {
        this.Products = res;
      }
    });
  }

  // Add to WishList
  addToWishList(id: number): void {

    this.wishListLoading = true;

    this.getProductSub = this._wishListService.addToWishList(id).subscribe({
      next: (res) => {
        this.WishListIDs = res.wishlist.productsIDs
        this.wishListLoading = false;

        this._toastrService.success(res.message, 'Success', {
          timeOut: 3000,
        });
      }
    });
  }

  // Remove from WishList
  removeFromWishList(id: number): void {

    this.wishListLoading = true;
    this.getProductSub = this._wishListService.removeFromWishList(id).subscribe({
      next: (res) => {
        this.WishListIDs = res.wishlist.productsIDs
        this.wishListLoading = false;
        this._toastrService.success(res.message, 'Success', {
          timeOut: 3000,
        });
      }
    });
  }

  // Add to Cart
  addToCart(id: number): void {
    this.itemId = id;
    this.AddLoading = true

    this.getProductSub = this._cartService.addCartItem(id).subscribe({
      next: (res) => {
        this._cartService.cartCount.next(res.numOfCartItems);
        this._toastrService.success('Item Added to Cart', 'Success', {
          timeOut: 5000,
        });
        this.AddLoading = false
        setTimeout(() => {
          this.AddLoading = false
          this.itemId = 0
        }, 3000);
      }

    });
  }
}
