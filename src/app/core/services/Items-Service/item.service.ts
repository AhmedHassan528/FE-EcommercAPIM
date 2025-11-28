import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http: HttpClient) { }
  private readonly _toastrService = inject(ToastrService);



  // Get all items
  getItems(): Observable<any> {

    return this._http.get(`${RouteUrl}/api/products`)
  }

  getAdminItems(): Observable<any> {
    return this._http.get(`${RouteUrl}/api/products/AdminGetAllAsync`)
  }

  createProduct(formData: FormData): Observable<any> {

    return this._http.post(`${RouteUrl}/api/products`, formData)
  }

  getItemDetails(id: string | null): Observable<any> {

    return this._http.get(`${RouteUrl}/api/products/${id}`)
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`${RouteUrl}/api/products/${id}`, {
      observe: 'response',
      responseType: 'text'
    })
  }

  // Update a product using FormData with custom tenant header
  updateProduct(id: number, formData: FormData): Observable<any> {
    return this._http.put(`${RouteUrl}/api/products/${id}`, formData)
  }
}
