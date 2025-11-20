import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly _toastrService = inject(ToastrService);


  constructor(private _http: HttpClient) {}

  getCategories():Observable<any>{
    return this._http.get(`${RouteUrl}/api/Category`).pipe(
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
  
  deleteCategory(id:number):Observable<any>{
    return this._http.delete(`${RouteUrl}/api/Category/${id}`, { 
      responseType: 'text'
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

  createCategory(formData: FormData): Observable<any> {
    return this._http.post(`${RouteUrl}/api/Category`, formData).pipe(
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

  updateCategory(id: number, formData: FormData): Observable<any> {
    return this._http.put(`${RouteUrl}/api/Category/${id}`, formData).pipe(
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

