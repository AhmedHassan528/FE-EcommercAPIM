import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import RouteUrl from '../../../BaseUrl';
import { catchError, Observable, throwError, switchMap, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Auth-Service/auth.service';


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

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getWishListIDs(): Observable<any> {
    return this._authService.checkAuth().pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) return of(null);
        return this._http.get(`${RouteUrl}/api/WishList`, { withCredentials: true })
      })
    );
  }
  getWishListProducts(): Observable<any> {
    return this._authService.checkAuth().pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) return of(null);
        return this._http.get(`${RouteUrl}/api/WishList/Product`, { withCredentials: true }
        );
      })
    );
  }

  addToWishList(productId: number): Observable<any> {
    return this._authService.checkAuth().pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) return of(null);

        return this._http.post(`${RouteUrl}/api/WishList/add/${productId}`, null, { withCredentials: true });
      })
    );
  }

  removeFromWishList(productId: number): Observable<any> {
    return this._authService.checkAuth().pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) return of(null);

        return this._http.delete(`${RouteUrl}/api/WishList/remove/${productId}`, { withCredentials: true });
      })
    );
  }


}
