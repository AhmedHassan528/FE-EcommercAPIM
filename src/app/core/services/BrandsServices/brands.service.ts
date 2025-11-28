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
    return this._http.get(`${RouteUrl}/api/Brand`)
  }

  getBrandById(id: any): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Brand/${id}`)
  }

  createBrand(formData: FormData): Observable<HttpResponse<IBrands>> {
    return this._http.post<IBrands>(`${RouteUrl}/api/Brand`, formData, {
      observe: 'response',
    })
  }

  updateBrand(id: number, formData: FormData): Observable<HttpResponse<IBrands>> {
    return this._http.put<IBrands>(`${RouteUrl}/api/Brand/${id}`, formData, {
      observe: 'response',
    })
  }

  deleteBrand(id: number): Observable<HttpResponse<any>> {
    return this._http.delete(`${RouteUrl}/api/Brand/${id}`, {
      observe: 'response',
      responseType: 'text'
    })
  }
}
