import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly _toastrService = inject(ToastrService);

  constructor(private http: HttpClient) {}

  AddAddress(address: any): Observable<any> {
    return this.http.post(`${RouteUrl}/api/Address`,address
    ).pipe(
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

  GetAllAddresses(): Observable<any> {
    return this.http.get(`${RouteUrl}/api/Address`).pipe(
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

  GetSpciificAddresses(id:number): Observable<any> {
    return this.http.get(`${RouteUrl}/api/Address/GetAddressByID/${id}`).pipe(
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

  DeleteSpciificAddress(id: number): Observable<any> {
    return this.http.delete(`${RouteUrl}/api/Address/${id}`
    ).pipe(
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
