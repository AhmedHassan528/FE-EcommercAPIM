import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError, catchError } from 'rxjs';
import { ToasterService } from '../services/ToasterServices/toaster.service';

export const errorToasterInterceptor: HttpInterceptorFn = (req, next) => {
  const toasterService = inject(ToasterService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toasterService.showError(resolveMessage(error));
      return throwError(() => error);
    })
  );
};

function resolveMessage(error: HttpErrorResponse): string {
  if (!error) {
    return 'An unexpected error occurred.';
  }

  const payload = error.error;

  if (payload) {
    if (typeof payload === 'string') {
      return payload;
    }

    if (payload.detail) {
      return payload.detail;
    }

    if (payload.message) {
      return payload.message;
    }
  }

  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred.';
}

