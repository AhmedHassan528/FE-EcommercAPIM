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



  constructor(private _http: HttpClient) { }


  getOrders(): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Order/GetUserOrders`)
  }
  getOrdersDetails(id: number): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Order/${id}`)
  }
  updateOrderStatus(id: number, status: string): Observable<any> {
    return this._http.put(`${RouteUrl}/api/Order/updateOrderStatus/${id}/${status}`, null)
  }

  getAllUserOrders(): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Order/AdminGetAllOrdersl`)
  }

  verifySession(id: string): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Order/verify-session/${id}`)
  }


}

