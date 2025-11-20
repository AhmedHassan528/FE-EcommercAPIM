import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import RouteUrl from '../../../BaseUrl';
import { catchError, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private readonly _toastrService = inject(ToastrService);

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('userToken');
    }
    return null;
  }

  constructor(private _http:HttpClient) {}

  getWishListIDs():Observable<any>{
    if(typeof localStorage !== 'undefined'){
      return this._http.get(`${RouteUrl}/api/WishList`).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.error.message != "fetch failed"){
            this._toastrService.error(error.error.message, 'Error', {
              timeOut: 3000,
            });
          }
          return throwError(() => error);
        })
      );
    }
    return new Observable();
  }
  getWishListProducts():Observable<any>{
      return this._http.get(`${RouteUrl}/api/WishList/Product`).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.error.message != "fetch failed"){
            this._toastrService.error(error.error.message, 'Error', {
              timeOut: 3000,
            });
          }
          return throwError(() => error);
        })
      );

  }

  addToWishList(productId:number):Observable<any>{
    return this._http.post(`${RouteUrl}/api/WishList/add/${productId}`,null).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.error.message != "fetch failed"){
          this._toastrService.error(error.error.message, 'Error', {
            timeOut: 3000,
          });
        }
        return throwError(() => error);
      })
    );
  }

  removeFromWishList(productId:number):Observable<any>{
    return this._http.delete(`${RouteUrl}/api/WishList/remove/${productId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.error.message != "fetch failed"){
          this._toastrService.error(error.error.message, 'Error', {
            timeOut: 3000,
          });
        }
        return throwError(() => error);
      })
    );
  }

 
}
