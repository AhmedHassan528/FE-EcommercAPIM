import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, throwError, tap, map, of } from 'rxjs';
import RouteUrl from '../../../BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  Route() {
    // return 'http://localhost:5248';
    return RouteUrl
  }


  LoginUser(user: object): Observable<any> {
    return this._httpClient.post(`${this.Route()}/api/auth/Login`, user, {
      withCredentials: true
    });
  }
  

  RegisterUser(user: object): Observable<any> {
    const registrationData = {
      ...user,
      domainUrl: window.location.origin
    };

    return this._httpClient.post(`${this.Route()}/api/auth/Register`, registrationData);
  }



  confirmEmail(token: string, userId: string): Observable<any> {

    const params = new HttpParams()
      .set('UserId', userId)
      .set('Token', token);

    return this._httpClient.post(`${this.Route()}/api/Auth/ConfirmEmail?UserId=${userId}&Token=${token}`,null);
  }

  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post(
      `${this.Route()}/api/auth/ForgotPassword`,
      JSON.stringify(email),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  resetPassword(token: string, userId: string, newPassword: string, confirmPassword: string): Observable<any> {
    const requestData = {
      token: token,
      userId: userId,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    return this._httpClient.post(`${this.Route()}/api/auth/ForgotPasswordConfermation`, requestData);
  }

  logout(): Observable<any> {
    return this._httpClient.post(`${this.Route()}/api/auth/Logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
      })
    );
  }

  getAllUsers(): Observable<any> {
    return this._httpClient.get(`${this.Route()}/api/auth/GetAllUsersAsync`, {
      withCredentials: true
    });
  }

  checkAuth(): Observable<boolean> {
    return this._httpClient.get<{ isAuthenticated: boolean }>(`${this.Route()}/api/auth/CheckAuth`, {
      withCredentials: true
    }).pipe(
      map(response => {
        this.isAuthenticatedSubject.next(response.isAuthenticated);
        return response.isAuthenticated;
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  checkAdmin(): Observable<boolean> {
    return this._httpClient.get<{ isAuthenticated: boolean }>(`${this.Route()}/api/auth/CheckAdmin`, {
      withCredentials: true
    }).pipe(
      map(response => {
        return response.isAuthenticated;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Method to update authentication state (called by AuthStateService)
  updateAuthState(isAuth: boolean): void {
    this.isAuthenticatedSubject.next(isAuth);
  }

  // Getter للـ value الحالي
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
