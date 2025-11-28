import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private injector: Injector) {
    // Initialize authentication state
    this.initializeAuth();
  }

  private initializeAuth(): void {
    // Check for local tokens first
    const hasToken = this.hasValidToken();
    
    if (hasToken) {
      // If we have a token, verify with server
      const authService = this.injector.get(AuthService);
      authService.checkAuth().subscribe({
        next: (isAuth) => {
          this.isAuthenticatedSubject.next(isAuth);
          this.isLoadingSubject.next(false);
        },
        error: () => {
          this.isAuthenticatedSubject.next(false);
          this.isLoadingSubject.next(false);
        }
      });
    } else {
      this.isAuthenticatedSubject.next(false);
      this.isLoadingSubject.next(false);
    }
  }

  private hasValidToken(): boolean {
    // Check for token in localStorage
    const token = localStorage.getItem('userToken');
    if (token) {
      return true;
    }

    // Check for JWT token in cookies
    const cookies = document.cookie.split(';');
    const jwtCookie = cookies.find(cookie => 
      cookie.trim().startsWith('jwtToken=') && 
      cookie.trim().split('=')[1] && 
      cookie.trim().split('=')[1] !== ''
    );
    
    return !!jwtCookie;
  }


  

  setAuthenticated(isAuth: boolean): void {
    this.isAuthenticatedSubject.next(isAuth);
    this.isLoadingSubject.next(false);
    // Also update the AuthServciesService
    const authService = this.injector.get(AuthService);
    authService.updateAuthState(isAuth);
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  logout(): void {
    this.setAuthenticated(false);
  }

  login(): void {
    this.setAuthenticated(true);
  }
}