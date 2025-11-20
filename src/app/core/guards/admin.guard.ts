import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth-Service/auth.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);

  return _authService.checkAdmin().pipe(
    map(isAdmin => {
      if (isAdmin) {
        return true;
      } else {
        _router.navigate(['/unauthorized']);
        return false;
      }
    }),
    catchError(err => {
      _router.navigate(['/login']);
      return of(false);
    })
  );
};
