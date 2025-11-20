import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _toastrService = inject(ToastrService);



  constructor(private _http: HttpClient) {}


  getOrders(): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Order/GetUserOrders`).pipe(
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
  getOrdersDetails(id: number): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Order/${id}`).pipe(
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
  updateOrderStatus(id: number, status: string): Observable<any> {
    return this._http.put(`${RouteUrl}/api/Order/updateOrderStatus/${id}/${status}`, null).pipe(
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

  getAllUserOrders(): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Order/AdminGetAllOrdersl`).pipe(
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

  verifySession(id: string): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Order/verify-session/${id}`).pipe(
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

