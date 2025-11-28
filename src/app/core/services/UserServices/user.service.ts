import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { IUser } from '../../Interfaces/iuser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _toastrService = inject(ToastrService);


  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('userToken');
    }
    return null;
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`,
    });
  }

  constructor(private _http: HttpClient) {}

  makeUserAdmin(userEmail: string): Observable<any> {
    const headers = this.getHeaders().set('userEmail', userEmail);
    return this._http.post(`${RouteUrl}/api/auth/AddRoleToUser`, null, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this._toastrService.error(error.error.message, 'Error', {
          timeOut: 3000,
        });
        return throwError(() => error);
      })
    );
  }

  getAllUsers(): Observable<any> {
    return this._http.get(`${RouteUrl}/api/Auth/GetAllUsersAsync`, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        this._toastrService.error(error.error.message, 'Error', {
          timeOut: 3000,
        });
        return throwError(() => error);
      })
    );
  }
} 