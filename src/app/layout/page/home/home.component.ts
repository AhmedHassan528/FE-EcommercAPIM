import { IProduct } from '../../../core/Interfaces/iproduct-details';
import { ItemService } from './../../../core/services/Items-Service/item.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../core/services/Categories/category.service';
import { ICategories } from '../../../core/Interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { KMPSearchPipe } from '../../../core/Pipes/kmpsearch.pipe';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from '../../../core/services/WishListServices/wish-list.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../core/services/Auth-Service/auth.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalf, faSpinner, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/CartServices/cart.service';




@Component({
  selector: 'app-home',
  imports: [TranslateModule, FormsModule, CarouselModule, KMPSearchPipe, RouterLink, TranslateModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../app.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  // Variables
  SearchWords: string = '';
  AddLoading: Boolean = false
  WishListIDs!: any


  // Servier Message
  succeed!: Boolean | null;

  // Data
  Products: IProduct[] = [];
  Categories: ICategories[] = [];

  // Subscriptions
  getHomeSub!: Subscription;


  // Font Awesome Icons
  faStar = faStar;
  faStarHalf = faStarHalf;
  faSpinner = faSpinner;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;

  // Variables
  wishListLoading: Boolean = false;
  itemId!: number;


  private readonly _toastrService = inject(ToastrService);

  constructor(
    private spinner: NgxSpinnerService,
    private _Items: ItemService,
    private _Categories: CategoryService,
    private _wishListService: WishListService,
    private _authService: AuthService,
    private _cartService: CartService
  ) { }


  // component Lifecycle Hooks
  ngOnInit(): void {
    this.spinner.show();
    this.getProducts();
    this.getCategories();

  }
  ngAfterViewInit() {
    if (this._authService.isAuthenticated) {
      this.getWishList();
    }
    this.spinner.hide();
  }
  ngOnDestroy(): void {
    this.getHomeSub?.unsubscribe();
  }


  // Get Products
  getProducts(): void {
    this.getHomeSub = this._Items.getItems().subscribe({
      next: (res) => {
        this.Products = res;
        this.succeed = null;
      }
    });
  }

  // Get Categories
  getCategories(): void {
    this.getHomeSub = this._Categories.getCategories().subscribe({
      next: (res) => {
        this.Categories = res;
        this.succeed = null;
      }
    });
  }

  // get WishLists
  getWishList(): void {
    this.getHomeSub = this._wishListService.getWishListIDs().subscribe({
      next: (res) => {
        this.WishListIDs = res.productsIDs;
        this.succeed = null;
      }
    });
  }


  // Add to WishList
  addToWishList(id: number): void {

    this.wishListLoading = true;

    this.getHomeSub = this._wishListService.addToWishList(id).subscribe({
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

    this.getHomeSub = this._wishListService.removeFromWishList(id).subscribe({
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

    this.getHomeSub = this._cartService.addCartItem(id).subscribe({
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



  // Owl Carousel Options
  MaincustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 4500,
    autoplayHoverPause: true,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true
      },
      400: {
        items: 1
      },
      768: {
        items: 1
      },
      1024: {
        items: 1
      }
    },
    nav: true
  };


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    rtl: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,

    navText: ['', ''],

    responsive: {
      0: {
        items: 1,
        stagePadding: 10
      },
      360: {
        items: 2,
        stagePadding: 10
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      1024: {
        items: 4
      }
    },

    nav: true
  };

}
