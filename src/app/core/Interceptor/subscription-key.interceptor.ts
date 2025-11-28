// src/app/core/interceptors/subscription-key.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const subscriptionKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const modified = req.clone({
    setHeaders: {
      'Ocp-Apim-Subscription-Key': 'c2bcd19706014eda83e6e1b51155097a',
      'ngrok-skip-browser-warning': 'true'
    },
    withCredentials: true 
  });
  
  return next(modified);
};

