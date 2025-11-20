import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { IProduct } from '../../Interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor( private _http:HttpClient) { }
  private readonly _toastrService = inject(ToastrService);



  // Get all items
  getItems(): Observable<any>{

    return this._http.get(`${RouteUrl}/api/products`).pipe(
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

  getAdminItems(): Observable<any>{
    return this._http.get(`${RouteUrl}/api/products/AdminGetAllAsync`).pipe(
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
  
  createProduct(formData: FormData): Observable<any> {
    
    return this._http.post(`${RouteUrl}/api/products`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        this._toastrService.error(error.error.message, 'Error', {
          timeOut: 3000,
        });
        return throwError(() => error);
      })
    );
  }
  
  getItemDetails(id:string | null): Observable<any>{

    return this._http.get(`${RouteUrl}/api/products/${id}`).pipe(
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

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`${RouteUrl}/api/products/${id}`, { 
      observe: 'response',
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

  // Update a product using FormData with custom tenant header
  updateProduct(id: number, formData: FormData): Observable<any> {
    return this._http.put(`${RouteUrl}/api/products/${id}`, formData).pipe(
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
