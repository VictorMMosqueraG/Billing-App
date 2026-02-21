import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject }                               from '@angular/core';
import { Router }                               from '@angular/router';
import { catchError, throwError }               from 'rxjs';
import { ErrorMessages } from '../Messages/error.messages';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const reqWithHeaders = req.clone({
    setHeaders: {
      'x-api-version':    '1.0',
      'x-channel-id':     'TPL',
      'x-correlation-id': crypto.randomUUID(),
      'x-request-id':     crypto.randomUUID()
    }
  });

  return next(reqWithHeaders).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = error.error?.detail ?? error.error?.message ?? ErrorMessages.NOT_FOUND;
      if (error.status === 404) router.navigate(['/not-found']);
      return throwError(() => ({ status: error.status, message }));
    })
  );
};
