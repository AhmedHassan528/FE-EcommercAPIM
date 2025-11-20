import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import RouteUrl from '../../../BaseUrl';
import { Observable, catchError, throwError } from 'rxjs';
import { IBrands } from '../../Interfaces/ibrands';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private readonly _toastrService = inject(ToastrService);


  constructor(private _http: HttpClient) { }

  getAllBrands(): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Brand`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.message);
        if(error.error.message != "fetch failed"){
          this._toastrService.error(error.error.message, 'Error', {
            timeOut: 3000,
          });
        }
        return throwError(() => error);
      })
    );
  }

  getBrandById(id: any): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Brand/${id}`).pipe(
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

  createBrand(formData: FormData): Observable<HttpResponse<IBrands>> {
    return this._http.post<IBrands>(`${RouteUrl}/api/Brand`, formData, {
      observe: 'response',
    }).pipe(
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

  updateBrand(id: number, formData: FormData): Observable<HttpResponse<IBrands>> {
    return this._http.put<IBrands>(`${RouteUrl}/api/Brand/${id}`, formData, {
      observe: 'response',
    }).pipe(
      catchError(error => {
        if(error.error.message != "fetch failed"){
          this._toastrService.error(error.error.message, 'Error', {
            timeOut: 3000,
          });
        }
        return throwError(() => error);
      })
    );
  }

  deleteBrand(id: number): Observable<HttpResponse<any>> {
    return this._http.delete(`${RouteUrl}/api/Brand/${id}`, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      catchError(error => {
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
