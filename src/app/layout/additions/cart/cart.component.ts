import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { faTrash, faPlus, faMinus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartService } from '../../../core/services/CartServices/cart.service';
import { ICart } from '../../../core/Interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, TranslateModule, FontAwesomeModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartComponent implements OnInit, OnDestroy {
  typeof: any;
  constructor(private _cartService: CartService) { }

  // varibles ( loading handelers )
  qtyLoading: boolean = false
  DeleteLoading: boolean = false;
  cartId: number = 0;



  // font aswsoms 
  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;
  faSpinner = faSpinner;


  //get Subscriptions 
  getCartItembSub!: any;


  // Data
  cartItems: ICart = {} as ICart;


  // component life cycle
  ngOnInit() {
    this.getCartItems();

  }
  ngOnDestroy(): void {
    this.getCartItembSub?.unsubscribe();
  }


  // get Cart Items
  getCartItems() {
    this.getCartItembSub = this._cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems = response;
      }
    });
  }

  // Remove specific  Item
  DeletespecificItem(id: number): void {
    this.DeleteLoading = true;
    this.cartId = id;

    this.getCartItembSub = this._cartService.deleteCartItem(id).subscribe({
      next: () => {
        this.DeleteLoading = false;
        this.cartId = 0;
        this.getCartItems();
      }
    })
  }

  // Clear all Cart
  ClearItems(): void {
    this.getCartItembSub = this._cartService.ClearCar().subscribe({
      next: () => {
        this.getCartItems();
      }
    })
  }

  // Edit Cart QTY

  EditQuantity(id: number, plus: boolean): void {
    this.cartId = id;
    this.qtyLoading = true;
    if (plus == true) {
      this.getCartItembSub = this._cartService.IncreaseItemCount(id).subscribe({
        next: () => {
          this.getCartItems()
          this.qtyLoading = false
          this.cartId = 0;
        }
      })
    } else {
      this.getCartItembSub = this._cartService.DecreaseItemCount(id).subscribe({
        next: () => {
          this.getCartItems()
          this.qtyLoading = false
          this.cartId = 0;
        }
      })
    }

  }

  // handel count of cart
  countOfCart(CountCart: number): void {
    this._cartService.cartCount.next(CountCart);
  }

}
