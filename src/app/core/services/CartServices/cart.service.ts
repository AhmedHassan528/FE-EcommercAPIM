import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly _toastrService = inject(ToastrService);



  constructor(private _http: HttpClient) { }

  getCartItems(): Observable<any> {
    if (typeof localStorage !== 'undefined') {
      return this._http.get(`${RouteUrl}/api/cart`)
    }
    return new Observable();
  }

  addCartItem(id: number): Observable<any> {
    console.log(id)
    return this._http.post(`${RouteUrl}/api/Cart/add/${id}`, null)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.message != "fetch failed") {
            this._toastrService.error(error.error.message, 'Error', {
              timeOut: 3000,
            });
          }
          return throwError(() => error);
        }),
        tap(() => {
          this.getCartItems().subscribe({
            next: (response) => {
              this.cartCount.next(response.Products.length);
            }
          });
        })
      );
  }

  deleteCartItem(id: number): Observable<any> {
    return this._http.delete(`${RouteUrl}/api/Cart/Remove/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.message != "fetch failed") {
            this._toastrService.error(error.error.message, 'Error', {
              timeOut: 3000,
            });
          }
          return throwError(() => error);
        }),
        tap(() => {
          this.getCartItems().subscribe({
            next: (response) => {
              this.cartCount.next(response.Products.length);
            }
          });
        })
      );
  }

  ClearCar(): Observable<any> {
    return this._http.delete(`${RouteUrl}/api/Cart/clear`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.message != "fetch failed") {
            this._toastrService.error(error.error.message, 'Error', {
              timeOut: 3000,
            });
          }
          return throwError(() => error);
        }),
        tap(() => {
          this.cartCount.next(0);
        })
      );
  }

  IncreaseItemCount(id: number): Observable<any> {
    return this._http.put(`${RouteUrl}/api/Cart/increase/${id}`, null)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.message != "fetch failed") {
            this._toastrService.error(error.error.message, 'Error', {
              timeOut: 3000,
            });
          }
          return throwError(() => error);
        }),
        tap(() => {
          this.getCartItems().subscribe({
            next: (response) => {
              this.cartCount.next(response.Products.length);
            }
          });
        })
      );
  }

  DecreaseItemCount(id: number): Observable<any> {
    return this._http.put(`${RouteUrl}/api/Cart/decrease/${id}`, null)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.message != "fetch failed") {
            this._toastrService.error(error.error.message, 'Error', {
              timeOut: 3000,
            });
          }
          return throwError(() => error);
        }),
        tap(() => {
          this.getCartItems().subscribe({
            next: (response) => {
              this.cartCount.next(response.Products.length);
            }
          });
        })
      );
  }

}
