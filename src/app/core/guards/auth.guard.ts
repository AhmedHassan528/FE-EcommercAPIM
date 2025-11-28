import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth-Service/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (typeof window === 'undefined') {
        return true;
    }

    return auth.checkAuth().pipe(
        map((isAuth: boolean) => {
            if (isAuth) return true;

            router.navigate(['/login']);
            return false;
        })
    );
};
