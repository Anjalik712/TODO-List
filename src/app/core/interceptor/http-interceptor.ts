import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

const BASE_URL = 'https://localhost:7261/api';

/**
 * Custom HTTP interceptor to:
 * - Add base URL to API calls
 * - Attach Authorization token if available
 * - Handle and log HTTP errors centrally
 */
export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  // Allow translation file requests to bypass interceptor logic
  if (req.url.includes('/assets/i18n/') || req.url.includes('/i18n/')) {
    return next(req);
  }

  // Retrieve auth token from local storage (if available)
  const token = localStorage.getItem('authToken');

  // Clone and modify the request:
  // - Add base URL if not already absolute
  // - Attach Authorization header if token exists
  const updatedReq = req.clone({
    url: req.url.startsWith('https') ? req.url : `${BASE_URL}/${req.url}`,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });

  // Handle HTTP response and catch errors
  return next(updatedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.error('Network error or server unreachable:', error);
      } else if (error.status === 400) {
        console.error(
          'Bad Request (400):',
          error.error?.message || error.message
        );
      } else if (error.status === 401) {
        console.error('Unauthorized (401)');
      } else if (error.status === 403) {
        console.error('Forbidden (403): Access denied.');
      } else if (error.status === 404) {
        console.error('Not Found (404): The resource was not found.');
      } else if (error.status === 500) {
        console.error('Internal Server Error (500):', error.message);
      } else {
        console.error(`Unexpected Error (${error.status}):`, error.message);
      }

      // Re-throw the error so the component or service can handle it if needed
      return throwError(() => error);
    })
  );
};
